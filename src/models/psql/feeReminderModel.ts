import { DataTypes, Model, Op, Sequelize, UpdateOptions } from "sequelize";
import { sequelize } from "./index";
import InstituteModel from "./instituteModel";
import UserModel from "./userModel";
import FeesCollectionModel from "./feesCollectionModel";
import FeeReminderSettingModel from "./feeReminderSettingModel";
import {
  BATCH_ERROR_MESSAGES,
  FEEREMINDER_ERROR_MESSAGES,
} from "../../constants/errorMessages";

import { FEE_PAYMENT_STATUS } from "../../constants/app";
import {
  IFeeReminderModelAttributes,
  TFeeReminderModelCreationAttributes,
} from "@kipipackages/interfaces";
import BatchModel from "./batchModel";
import UserHasBatchModel from "./userHasBatchModel";

class FeeReminderModel extends Model<
  IFeeReminderModelAttributes,
  TFeeReminderModelCreationAttributes
> {
  declare id: string;
  declare userId: string;
  declare instituteId: string;
  declare sendDate: Date;
  declare dueDate: Date;
  declare dueAmount: number;
  declare templateId: string;
  declare batchId?: string;
  declare subjectId?: string;
  declare feeCollectionId: string;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  declare readonly createdAt: Date;
  declare readonly deletedAt: string;
  declare readonly updatedAt: Date;
}

FeeReminderModel.init(
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
    },
    instituteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sendDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    batchId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    feeCollectionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    modelName: "FeeReminderModel",
    tableName: "fee_reminders",
    timestamps: true,
    sequelize,
  }
);

FeeReminderModel.belongsTo(UserModel, {
  foreignKey: {
    name: "userId",
    field: "user_id",
  },
  as: "reminderUser",
});

UserModel.hasMany(FeeReminderModel, {
  foreignKey: "userId",
  as: "userReminders",
});

FeeReminderModel.belongsTo(FeeReminderSettingModel, {
  foreignKey: {
    name: "templateId",
    field: "template_id",
  },
  as: "reminderTemplate",
});

FeeReminderSettingModel.hasMany(FeeReminderModel, {
  foreignKey: "templateId",
  as: "TemplateReminders",
});

FeeReminderModel.belongsTo(InstituteModel, {
  foreignKey: {
    name: "instituteId",
    field: "institute_id",
  },
  as: "reminderInstitute",
});

InstituteModel.hasMany(FeeReminderModel, {
  foreignKey: "instituteId",
  as: "instituteReminders",
});

FeeReminderModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

FeeReminderModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});

FeeReminderModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});

FeeReminderModel.belongsTo(FeesCollectionModel, {
  foreignKey: {
    name: "feeCollectionId",
    field: "fee_collection_id",
  },
  as: "feeCollection",
});

FeesCollectionModel.hasMany(FeeReminderModel, {
  foreignKey: "feeCollectionId",
  as: "feeReminders",
});

const beforeCreateHook = async (
  feeReminder: FeeReminderModel
): Promise<void> => {
  if (feeReminder.userId && feeReminder.batchId && feeReminder.instituteId) {
    const { batchId, instituteId, userId } = feeReminder;

    const batchExists = await BatchModel.findOne({
      where: { id: batchId, instituteId },
    });
    if (!batchExists) {
      throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);
    }

    const userInBatch = await UserHasBatchModel.findOne({
      where: { userId, batchId },
    });
    if (!userInBatch) {
      throw new Error(FEEREMINDER_ERROR_MESSAGES.USER_NOT_IN_BATCH);
    }
    if (feeReminder.subjectId) {
      const validSubject = await UserHasBatchModel.findOne({
        where: {
          userId,
          batchId,
          subjects: { [Op.contains]: [feeReminder.subjectId] },
        },
      });
      if (!validSubject) {
        throw new Error(FEEREMINDER_ERROR_MESSAGES.SUBJECT_INVALID);
      }
    }

    if (feeReminder.feeCollectionId) {
      const validFeeCollection = await FeesCollectionModel.findOne({
        where: {
          userId,
          instituteId,
          status: { [Op.ne]: FEE_PAYMENT_STATUS.COMPLETED },
        },
      });
      if (!validFeeCollection) {
        throw new Error(FEEREMINDER_ERROR_MESSAGES.FEE_COLLECTION_NOT_FOUND);
      }
    }
  }
};

const beforeUpdateHook = async (
  feeReminder: FeeReminderModel
): Promise<void> => {
  if (feeReminder.id) {
    const existingReminder = await FeeReminderModel.findByPk(feeReminder.id);
    if (!existingReminder) {
      throw new Error(FEEREMINDER_ERROR_MESSAGES.NOT_FOUND);
    }
    const batchId = feeReminder.batchId || existingReminder.batchId;
    const instituteId = feeReminder.instituteId || existingReminder.instituteId;
    const userId = feeReminder.userId || existingReminder.userId;

    const batchExists = await BatchModel.findOne({
      where: { id: batchId, instituteId },
    });
    if (!batchExists) {
      throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);
    }

    const userInBatch = await UserHasBatchModel.findOne({
      where: { userId, batchId },
    });
    if (!userInBatch) {
      throw new Error(FEEREMINDER_ERROR_MESSAGES.USER_NOT_IN_BATCH);
    }
    if (feeReminder.subjectId) {
      const validSubject = await UserHasBatchModel.findOne({
        where: {
          userId,
          batchId,
          subjects: { [Op.contains]: [feeReminder.subjectId] },
        },
      });
      if (!validSubject) {
        throw new Error(FEEREMINDER_ERROR_MESSAGES.SUBJECT_INVALID);
      }
    }
    if (feeReminder.feeCollectionId) {
      const validFeeCollection = await FeesCollectionModel.findOne({
        where: {
          userId,
          instituteId,
          status: { [Op.ne]: FEE_PAYMENT_STATUS.COMPLETED },
        },
      });
      if (!validFeeCollection) {
        throw new Error(FEEREMINDER_ERROR_MESSAGES.FEE_COLLECTION_NOT_FOUND);
      }
    }
  } else {
    throw new Error(FEEREMINDER_ERROR_MESSAGES.INVALID_INPUT);
  }
};

FeeReminderModel.beforeBulkCreate(async (feeReminders) => {
  for (const instance of feeReminders) {
    await beforeCreateHook(instance);
  }
});

FeeReminderModel.beforeBulkUpdate(async (options: UpdateOptions) => {
  await beforeUpdateHook(options.attributes);
});

export default FeeReminderModel;
