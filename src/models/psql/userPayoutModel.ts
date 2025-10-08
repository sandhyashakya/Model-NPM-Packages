import {
  DataTypes,
  FindOptions,
  Model,
  Op,
  Sequelize,
  Transaction,
} from "sequelize";
import { sequelize } from "./index";
import {
  ATTENDANCE_STATUS,
  SIXTY,
  USER_PAYOUT_TYPE,
  USER_TYPES,
} from "../../constants/app";
import UserModel from "./userModel";
import InstituteModel from "./instituteModel";
import {
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
  subMonths,
} from "date-fns";

import {
  IUserAttributes,
  IUserPayoutModelAttributes,
  TLectureWithAssociation,
  TUserPayoutModelCreationAttributes,
  TUserPayoutWithDetails,
} from "@kipipackages/interfaces";
import { getUniqueArrayByFields } from "../../helpers/utils";
import SubjectHasPayFeeHistory from "./subjectHasPayFeeHistoryModel";
import LectureModel from "./lectureModel";
import AttendanceModel from "../mongodb/attendanceModel";
import UserPayoutDetailsModel from "./userPayoutDetailsModel";

class UserPayoutModel extends Model<
  IUserPayoutModelAttributes,
  TUserPayoutModelCreationAttributes
> {
  declare id: string;
  declare userId: string;
  declare userType: USER_TYPES;
  declare instituteId: string;
  declare totalPayableAmount: number;
  declare totalPaidAmount: number;
  declare type: USER_PAYOUT_TYPE;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  declare readonly createdAt: Date;
  declare readonly deletedAt: Date;
  declare readonly updatedAt: Date;
}

UserPayoutModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    userType: {
      type: DataTypes.ENUM,
      values: Object.values(USER_TYPES),
      allowNull: false,
      field: "user_type",
    },
    instituteId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "institute_id",
    },
    totalPayableAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      field: "total_payable_amount",
    },
    totalPaidAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      field: "total_paid_amount",
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(USER_PAYOUT_TYPE),
      allowNull: false,
    },
    lastCalculatedAt: {
      type: DataTypes.DATE,
      defaultValue: startOfToday(),
      field: "last_calculated_at",
    },
  },
  {
    modelName: "UserPayoutModel",
    tableName: "user_payouts",
    timestamps: true,
    sequelize,
  }
);

UserPayoutModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

UserPayoutModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});

UserPayoutModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});

UserPayoutModel.belongsTo(InstituteModel, {
  foreignKey: {
    name: "instituteId",
  },
  as: "institute",
});

InstituteModel.hasMany(UserPayoutModel, {
  foreignKey: {
    name: "instituteId",
  },
  as: "instituteHasPayoutList",
});

UserPayoutModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
  },
  as: "user",
});

UserModel.hasMany(UserPayoutModel, {
  foreignKey: {
    name: "userId",
  },
  as: "userHasPayoutList",
});

//
async function afterCreateOrUpdateHook(
  userPayout: TUserPayoutWithDetails,
  user: IUserAttributes | null = null,
  transaction: Transaction,
  filterOptions: FindOptions = {}
): Promise<TUserPayoutWithDetails> {
  try {
    if (
      !userPayout.userPayoutDetailsList ||
      !userPayout.userPayoutDetailsList.length
    ) {
      return userPayout;
    }

    userPayout.userPayoutDetailsList = getUniqueArrayByFields(
      userPayout.userPayoutDetailsList,
      ["subjectId"]
    );

    const options: any = { transaction };
    if (user) options.userId = user.id;

    const now = new Date();
    const previousMonthDate = subMonths(now, 1);
    let startOfPreviousMonth = startOfMonth(previousMonthDate).toISOString();
    let endOfPreviousMonth = endOfMonth(previousMonthDate).toISOString();

    if (filterOptions.include) {
      const includes = Array.isArray(filterOptions.include)
        ? filterOptions.include
        : [filterOptions.include];
      const historyInclude: any = includes.find(
        (include: any) => include.as === "userPayoutHistoryList"
      );
      if (historyInclude?.where?.[Op.and]) {
        const where = historyInclude.where[Op.and].pop();
        if (where?.payout_start_time && where?.payout_end_time) {
          startOfPreviousMonth = where.payout_start_time[Op.gte];
          endOfPreviousMonth = where.payout_end_time[Op.lte];
        }
      }
    }
    const attendanceWhereAnd = [
      { date: { $gte: startOfPreviousMonth } },
      { date: { $lte: endOfPreviousMonth } },
    ];

    const exsitUserPayout = (await UserPayoutModel.findOne({
      where: { id: userPayout.id },
      include: [{ association: "userPayoutDetailsList" }],
      transaction,
    })) as TUserPayoutWithDetails | null;

    if (!exsitUserPayout) return userPayout;

    if (userPayout.type === USER_PAYOUT_TYPE.PERCENTAGE) {
      let feeTotalBySubjectList = await SubjectHasPayFeeHistory.findAll({
        where: {
          instituteId: exsitUserPayout.instituteId,
          subjectId: {
            [Op.in]: userPayout.userPayoutDetailsList.map((d) => d.subjectId),
          },
        },
        attributes: [
          ["subject_id", "subjectId"],
          [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
        ],
        group: ["subject_id"],
        raw: true,
      });

      feeTotalBySubjectList = JSON.parse(JSON.stringify(feeTotalBySubjectList));

      userPayout.userPayoutDetailsList = userPayout.userPayoutDetailsList.map(
        (detail) => {
          const subjectFees = feeTotalBySubjectList.filter(
            (fee) => fee.subjectId === detail.subjectId
          );
          detail.payableAmount = subjectFees.reduce((sum, record) => {
            if (detail.percentage) {
              const amount = ((record.amount || 0) * detail.percentage) / 100;
              return sum + parseFloat(amount.toFixed(2));
            }
            return sum;
          }, 0);
          return detail;
        }
      );
    }

    let lectureList = (await LectureModel.findAll({
      where: {
        instituteId: exsitUserPayout.instituteId,
        subject: {
          [Op.in]: userPayout.userPayoutDetailsList.map((d) => d.subjectId),
        },
        [Op.or]: [
          { primaryUserId: exsitUserPayout.userId },
          { secondaryUserId: exsitUserPayout.userId },
        ],
      },
      include: [{ association: "workingDay" }],
      raw: false,
      transaction,
    })) as unknown as TLectureWithAssociation[];

    lectureList = JSON.parse(JSON.stringify(lectureList));
    const currentMonthAttendenceList = await AttendanceModel.find({
      $and: attendanceWhereAnd,
      userType: userPayout.userType,
      "users.userId": userPayout.userId,
      "users.status": { $ne: ATTENDANCE_STATUS.ABSENT },
    }).exec();

    userPayout.userPayoutDetailsList = userPayout.userPayoutDetailsList.map(
      (detail) => {
        let totalMinutes = 0;
        currentMonthAttendenceList.forEach((attendance) => {
          const dayName = format(attendance.date, "EEEE");
          const dayLectures = lectureList.filter(
            (lecture) =>
              lecture.workingDay.dayName === dayName &&
              lecture.subject === detail.subjectId
          );
          if (dayLectures.length) {
            totalMinutes += dayLectures.reduce(
              (sum, lec) => sum + lec.slotDuration,
              0
            );
          }
        });
        detail.payableAmount =
          ((detail.amountPerHour || 0) / SIXTY) * totalMinutes;
        return detail;
      }
    );

    const userPayoutDetailsList: any[] = [];
    for (let detail of userPayout.userPayoutDetailsList) {
      detail.userPayoutId = exsitUserPayout.id;
      detail.userId = exsitUserPayout.userId;
      detail.instituteId = exsitUserPayout.instituteId;
      detail.type = exsitUserPayout.type;

      const found = exsitUserPayout.userPayoutDetailsList.find(
        (existing) =>
          detail.userPayoutId === exsitUserPayout.id &&
          detail.instituteId === existing.instituteId &&
          detail.userId === existing.userId &&
          detail.type === existing.type &&
          detail.subjectId === existing.subjectId &&
          detail.batchId === existing.batchId
      );

      if (found) {
        await UserPayoutDetailsModel.update(detail, {
          where: { id: found.id },
          ...options,
        });
      } else {
        const createdDetail = await UserPayoutDetailsModel.create(
          detail,
          options
        );
        detail = createdDetail ? createdDetail.get({ plain: true }) : detail;
      }
      userPayoutDetailsList.push(detail);
    }
    if (userPayoutDetailsList.length) {
      await UserPayoutDetailsModel.destroy({
        where: {
          id: {
            [Op.notIn]: userPayoutDetailsList.map((d) => d.id as string),
          },
          userPayoutId: exsitUserPayout.id,
        },
        ...options,
      });
    }

    const totalPayableAmount = userPayoutDetailsList.reduce(
      (sum, record) => sum + (record.payableAmount || 0),
      0
    );

    userPayout.userPayoutDetailsList = userPayoutDetailsList;
    userPayout.totalPayableAmount = totalPayableAmount;

    return userPayout;
  } catch (err) {
    throw err;
  }
}

async function afterFindHook(
  userPayoutList: TUserPayoutWithDetails[],
  options: FindOptions = {}
) {
  const afterFindHookTransaction = await sequelize.transaction();
  try {
    // const syncUserPayoutList = JSON.parse(JSON.stringify(userPayoutList)).filter(
    //     (userPayout: IUserPayoutModelAttributes) => new Date(userPayout.lastCalculatedAt).getTime() !== startOfToday().getTime(),
    // );

    const syncUserPayoutList = JSON.parse(JSON.stringify(userPayoutList));

    if (!syncUserPayoutList.length) {
      await afterFindHookTransaction.commit();
      return userPayoutList;
    }
    const updatedData: TUserPayoutWithDetails[] = [];
    for (let syncUserPayout of syncUserPayoutList) {
      syncUserPayout = await afterCreateOrUpdateHook(
        JSON.parse(JSON.stringify(syncUserPayout)) as TUserPayoutWithDetails,
        undefined,
        afterFindHookTransaction,
        options
      );
      updatedData.push(syncUserPayout);
    }
    userPayoutList = userPayoutList.map(
      (userPayout: TUserPayoutWithDetails) => {
        const found = updatedData.find((one) => one.id === userPayout.id);
        if (found) {
          userPayout.totalPayableAmount = found.totalPayableAmount;
          userPayout.userPayoutDetailsList = found.userPayoutDetailsList;
        }
        return userPayout;
      }
    );
    await afterFindHookTransaction.commit();
    return userPayoutList;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await afterFindHookTransaction.rollback();
    return userPayoutList;
  }
}

UserPayoutModel.addHook("afterFind", async (result, options) => {
  if (options.syncUserPayoutLastCalculatedAt && Array.isArray(result)) {
    result = (await afterFindHook(result, options)) as unknown as Model<
      IUserPayoutModelAttributes,
      TUserPayoutModelCreationAttributes
    >[];
  } else if (options.syncUserPayoutLastCalculatedAt && result) {
    result = (
      await afterFindHook(
        [result as unknown as TUserPayoutWithDetails],
        options
      )
    ).pop() as unknown as Model<
      IUserPayoutModelAttributes,
      TUserPayoutModelCreationAttributes
    >;
  }
});
export default UserPayoutModel;
