import { DataTypes, Model, Op } from "sequelize";
import { sequelize } from "./index";
// import { IFeeHistoryModelAttributes } from '../../interfaces/feeHistoryInterface';
// import { TFeeHistoryModelCreationAttributes } from '../../types/feeHistoryType';
import UserModel from "./userModel";
import InstituteModel from "./instituteModel";
import {
  FEE_HISTORY_STATUS,
  PAYMENT_TYPE,
  USER_INSTITUTE_META_STATUS,
} from "../../constants/app";
import {
  FEESCOLLECTION_ERROR_MESSAGES,
  FILE_STORAGE_ERROR_MESSAGES,
  USER_INSTITUTE_META_ERROR_MESSAGES,
} from "../../constants/errorMessages";
import ApiError from "../../helpers/apiError";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";
// import { IFeeHistoryService } from '../../services/Contracts/IFeeHistoryService';
// import FeeHistoryService from '../../services/Concrete/feeHistoryService';
import FeesCollectionModel from "./feesCollectionModel";
import FileStorageModel from "./fileStorageModel";
import BankAccountDetailsModel from "./bankAccountDetailsModel";
import SchoolFeeCollectionModel from "./schoolFeeCollectionModel";
import {
  IFeeHistoryModelAttributes,
  INSTITUTE_ENTITY_TYPE_SEQUENCE,
  TFeeHistoryModelCreationAttributes,
} from "@kipipackages/interfaces";
import UserHasSubjectFeeModel from "./userHasSubjectFeeModel";
import InstituteEntityModel from "./instituteEntityModel";
import SubjectHasPayFeeHistory from "./subjectHasPayFeeHistoryModel";
import UserInstituteMeta from "../mongodb/userInstituteMetaModel";

class FeeHistoryModel extends Model<
  IFeeHistoryModelAttributes,
  TFeeHistoryModelCreationAttributes
> {
  declare id: string;
  declare instituteId: string;
  declare userId: string;
  declare feeCollectionId?: string;
  declare paidFee: number;
  declare paidDate: Date;
  declare pdfId: string | null;
  declare invoiceId: number | null;
  declare status: FEE_HISTORY_STATUS;
  declare upiId?: string | null;
  declare paymentType?: PAYMENT_TYPE;
  declare bankName?: string | null;
  declare chequeNo?: string | null;
  declare feeTypeId?: string[] | null;
  declare bankAccountId?: string | null;
  declare parentHistoryId?: string | null;
  declare schoolFeeCollectionId?: string | null;
  // declare academicCalendarId: string;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  declare readonly createdAt: Date;
  declare readonly deletedAt: string;
  declare readonly updatedAt: Date;
}
FeeHistoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    instituteId: {
      type: DataTypes.UUID,
      field: "institute_id",
      allowNull: false,
    },
    pdfId: {
      type: DataTypes.UUID,
      field: "pdf_id",
      allowNull: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      field: "invoice_id",
      defaultValue: null,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      field: "user_id",
      allowNull: false,
    },
    feeCollectionId: {
      type: DataTypes.UUID,
      field: "fee_collection_id",
      allowNull: true,
    },
    parentHistoryId: {
      type: DataTypes.UUID,
      field: "parent_history_id",
      allowNull: true,
    },
    bankAccountId: {
      type: DataTypes.UUID,
      field: "bank_account_id",
      allowNull: true,
    },
    feeTypeId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      field: "fee_type_id",
      allowNull: true,
    },
    schoolFeeCollectionId: {
      type: DataTypes.UUID,
      field: "school_fee_collection_id",
      allowNull: true,
    },
    // academicCalendarId: {
    //     type: DataTypes.UUID,
    //     field: 'academic_calendar_id',
    //     allowNull: false,
    // },
    paidDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    paidFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.ENUM,
      values: Object.values(PAYMENT_TYPE),
      allowNull: true,
      // defaultValue: PAYMENT_TYPE.CASH,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(FEE_HISTORY_STATUS),
      allowNull: true,
      defaultValue: FEE_HISTORY_STATUS.PENDING,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chequeNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    upiId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "FeeHistoryModel",
    tableName: "fee_history",
    timestamps: true,
    sequelize,
    // indexes: [
    //     {
    //         unique: true,
    //         fields: ['institute_id', 'invoice_id'],
    //     },
    // ],
  }
);

// subjectWiserFeePay function
async function subjectWiseFeePay(
  instituteId: string,
  feeCollectionId: string,
  paidFee: number,
  userId: string
) {
  const userInstituteMeta = await UserInstituteMeta.findOne({
    where: { userId, instituteId, status: USER_INSTITUTE_META_STATUS.ACCEPTED },
  });
  if (!userInstituteMeta) {
    throw new ApiError(
      HTTP_STATUS_CODE.NOTFOUND,
      USER_INSTITUTE_META_ERROR_MESSAGES.NOT_FOUND
    );
  }

  const subjects = await InstituteEntityModel.findAll({
    where: { id: { [Op.in]: userInstituteMeta.entities } },
    include: [
      {
        association: "entityType",
        where: { sequence: INSTITUTE_ENTITY_TYPE_SEQUENCE.LAST },
      },
    ],
  });

  const subjectIds = subjects.map((s) => s.id);

  const fees = await UserHasSubjectFeeModel.findAll({
    where: { subjectId: { [Op.in]: subjectIds }, instituteId },
  });

  const feeCollection = await FeesCollectionModel.findByPk(feeCollectionId);
  if (!feeCollection) {
    throw new ApiError(
      HTTP_STATUS_CODE.NOTFOUND,
      USER_INSTITUTE_META_ERROR_MESSAGES.NOT_FOUND
    );
  }

  const feeDistribution = fees.map((fee) => ({
    subjectId: fee.subjectId,
    amount: parseFloat(
      ((fee.fee / (feeCollection.feeAmount || 0)) * paidFee).toFixed(2)
    ),
  }));

  const feeHistoryEntries = await Promise.all(
    feeDistribution.map((distribution) =>
      SubjectHasPayFeeHistory.create({
        instituteId,
        userId,
        subjectId: distribution.subjectId,
        feeCollectionId,
        amount: distribution.amount,
      })
    )
  );

  return feeHistoryEntries;
}

const beforeCreateOrUpdateHook = async (
  feeCollection: FeeHistoryModel
): Promise<void> => {
  if (feeCollection.paidFee) {
    if (feeCollection.paymentType === PAYMENT_TYPE.CHEQUE) {
      feeCollection.upiId = null;
      if (!feeCollection.chequeNo || !feeCollection.bankName) {
        throw new ApiError(
          HTTP_STATUS_CODE.BAD_REQUEST,
          FEESCOLLECTION_ERROR_MESSAGES.FEE_PAID_BY_CHQUE
        );
      }
    } else if (feeCollection.paymentType === PAYMENT_TYPE.UPI) {
      feeCollection.chequeNo = null;
      feeCollection.bankName = null;
      if (!feeCollection.upiId) {
        throw new ApiError(
          HTTP_STATUS_CODE.BAD_REQUEST,
          FEESCOLLECTION_ERROR_MESSAGES.FEE_PAID_BY_UPI
        );
      }
    } else if (feeCollection.paymentType === PAYMENT_TYPE.CASH) {
      feeCollection.bankName = null;
      feeCollection.chequeNo = null;
      feeCollection.upiId = null;
    } else
      throw new ApiError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        FEESCOLLECTION_ERROR_MESSAGES.PAYMENT_TYPE_REQUIRED
      );
    if (feeCollection.pdfId) {
      const pdfUrl = await FileStorageModel.findByPk(feeCollection.pdfId);
      if (!pdfUrl)
        throw new ApiError(
          HTTP_STATUS_CODE.BAD_REQUEST,
          FILE_STORAGE_ERROR_MESSAGES.NOT_FOUND
        );
    }
  }
  if (
    (!feeCollection.feeTypeId || feeCollection.feeTypeId.length === 0) &&
    !feeCollection.bankAccountId
  )
    await subjectWiseFeePay(
      feeCollection.instituteId as string,
      feeCollection.feeCollectionId as string,
      feeCollection.paidFee,
      feeCollection.userId as string
    );
};


FeeHistoryModel.beforeCreate(beforeCreateOrUpdateHook);

FeeHistoryModel.belongsTo(FeesCollectionModel, {
  foreignKey: {
    name: "feeCollectionId",
    field: "fee_collection_id",
    allowNull: true,
  },
  as: "feeHistoryFeeCollection",
});
FeesCollectionModel.hasMany(FeeHistoryModel, {
  foreignKey: {
    name: "feeCollectionId",
    field: "fee_collection_id",
    allowNull: true,
  },
  as: "feeCollectionHasFeeHistory",
});

FeeHistoryModel.belongsTo(FileStorageModel, {
  foreignKey: {
    name: "pdfId",
    field: "pdf_id",
    allowNull: true,
  },
  as: "feeHistoryFile",
});

FileStorageModel.hasMany(FeeHistoryModel, {
  foreignKey: {
    name: "pdfId",
    field: "pdf_id",
    allowNull: true,
  },
  as: "filesHasFeeHistory",
});

FeeHistoryModel.belongsTo(BankAccountDetailsModel, {
  foreignKey: {
    name: "bankAccountId",
    field: "bank_account_id",
    allowNull: true,
  },
  as: "feeHistoryAccount",
});
BankAccountDetailsModel.hasMany(FeeHistoryModel, {
  foreignKey: {
    name: "bankAccountId",
    field: "bank_account_id",
    allowNull: true,
  },
  as: "feeHistoryHasAccount",
});

FeeHistoryModel.belongsTo(FeeHistoryModel, {
  foreignKey: {
    name: "parentHistoryId",
    field: "parent_history_id",
    allowNull: true,
  },
  as: "feeHistory",
});
FeeHistoryModel.hasMany(FeeHistoryModel, {
  foreignKey: {
    name: "parentHistoryId",
    field: "parent_history_id",
    allowNull: true,
  },
  as: "feeHistoryHas",
});

FeeHistoryModel.belongsTo(SchoolFeeCollectionModel, {
  foreignKey: {
    name: "schoolFeeCollectionId",
    field: "school_fee_collection_id",
    allowNull: true,
  },
  as: "feeHistorySchool",
});
SchoolFeeCollectionModel.hasMany(FeeHistoryModel, {
  foreignKey: {
    name: "schoolFeeCollectionId",
    field: "school_fee_collection_id",
    allowNull: true,
  },
  as: "feeHistoryHasSchool",
});

FeeHistoryModel.belongsTo(InstituteModel, {
  foreignKey: {
    name: "instituteId",
    field: "institute_id",
  },
  as: "feeHistoryInstitute",
});
InstituteModel.hasMany(FeeHistoryModel, {
  foreignKey: "instituteId",
  as: "instituteHasFeeHistory",
});
FeeHistoryModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    field: "user_id",
  },
  as: "feeHistoryUser",
});
UserModel.hasMany(FeeHistoryModel, {
  foreignKey: "userId",
  as: "userHasFeeHistory",
});

FeeHistoryModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

FeeHistoryModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});

FeeHistoryModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});

export default FeeHistoryModel;
