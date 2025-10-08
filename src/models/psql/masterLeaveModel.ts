import { DataTypes, Model, UpdateOptions } from "sequelize";
import { sequelize } from "./index";
import { COMMAN_STATUS, LEAVE, TERM_DURATION } from "../../constants/app";
import InstituteModel from "./instituteModel";
import UserModel from "./userModel";
import TypeManagementModel from "./typeManagementModel";

import {
  IMasterLeaveModelAttributes,
  TMasterLeaveModelCreationAttributes,
  TYPE_MANAGEMENT_TYPE,
} from "@kipipackages/interfaces";
import { HTTP_STATUS_CODE } from "../../constants/httpStatusCode";
import { MASTER_LEAVE_ERROR_MESSAGES } from "../../constants/errorMessages";
import ApiError from "../../helpers/apiError";

class MasterLeaveModel extends Model<
  IMasterLeaveModelAttributes,
  TMasterLeaveModelCreationAttributes
> {
  declare id: string;
  declare totalLeave: number;
  declare instituteId: string;
  declare typeManagementId: string;
  declare termDuration: TERM_DURATION;
  declare startTermDuration: Date;
  declare endTermDuration: Date;
  declare leave: LEAVE;
  declare status: COMMAN_STATUS;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  declare readonly createdAt: Date;
  declare readonly deletedAt: string;
  declare readonly updatedAt: Date;
}

MasterLeaveModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    totalLeave: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instituteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    typeManagementId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    termDuration: {
      type: DataTypes.ENUM,
      values: Object.values(TERM_DURATION),
      defaultValue: TERM_DURATION.YEARLY,
      allowNull: false,
    },
    leave: {
      type: DataTypes.ENUM,
      values: Object.values(LEAVE),
      defaultValue: LEAVE.PAID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(COMMAN_STATUS),
      defaultValue: COMMAN_STATUS.ACTIVE,
      allowNull: false,
    },
    startTermDuration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTermDuration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    modelName: "MasterLeaveModel",
    tableName: "master_leaves",
    timestamps: true,
    sequelize,
  }
);

async function validateAndCalculate(instance: MasterLeaveModel) {
  try {
    if (instance.typeManagementId) {
      const typeManagement = await TypeManagementModel.findByPk(
        instance.typeManagementId
      );
      if (
        !typeManagement ||
        typeManagement.type !== TYPE_MANAGEMENT_TYPE.LEAVE
      ) {
        throw new ApiError(
          HTTP_STATUS_CODE.BAD_REQUEST,
          MASTER_LEAVE_ERROR_MESSAGES.INVALID_TYPE_MANAGEMENT_ID
        );
      }
    }
  } catch (err) {
    throw err;
  }
}

MasterLeaveModel.beforeCreate(async (instance: MasterLeaveModel) => {
  await validateAndCalculate(instance);
});

MasterLeaveModel.beforeBulkUpdate(async (instance: UpdateOptions) => {
  await validateAndCalculate(instance.attributes);
});

MasterLeaveModel.belongsTo(InstituteModel, {
  foreignKey: {
    name: "instituteId",
    field: "institute_id",
  },
  as: "leaveInstitute",
});

InstituteModel.hasMany(MasterLeaveModel, {
  foreignKey: "instituteId",
  as: "instituteHasLeaves",
});

MasterLeaveModel.belongsTo(TypeManagementModel, {
  foreignKey: {
    name: "typeManagementId",
    field: "type_management_id",
  },
  as: "leaveTypeManagement",
});

TypeManagementModel.hasMany(MasterLeaveModel, {
  foreignKey: "typeManagementId",
  as: "typeManagementHasLeaves",
});

MasterLeaveModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

MasterLeaveModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});

MasterLeaveModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});

export default MasterLeaveModel;
