import { DataTypes, Model, Op, Transaction } from "sequelize";
import { sequelize } from "./index";
// import { IBatchModelAttributes } from '../../interfaces/batchInterface';
// import { TBatchModelCreationAttributes } from '../../types/batchType';
import { COMMAN_STATUS, PLANNER_SYNC_STATUS } from "../../constants/app";
import UserModel from "./userModel";
import InstituteModel from "./instituteModel";
import TypeManagementModel from "./typeManagementModel";
import WorkingShiftModel from "./workingShiftModel";
// import BatchService from '../../services/Concrete/batchService';
// import { IBatchService } from '../../services/Contracts/IBatchService';
// import { container, delay } from 'tsyringe';
import AcademicCalendarModel from "./academicCalendarModel";
import SlotModel from "./slotModel";
import {
  IBatchModelAttributes,
  TBatchModelCreationAttributes,
} from "@kipipackages/interfaces";


class BatchModel extends Model<
  IBatchModelAttributes,
  TBatchModelCreationAttributes
> {
  declare id: string;
  declare title: string;
  declare type: string;
  declare subjects: string[];
  declare startTime: Date;
  declare endTime: Date;
  declare capacity: number;
  declare instituteId: string;
  declare shiftId: string;
  declare slotId: string;
  declare status: COMMAN_STATUS;
  declare teacherId: string;
  declare plannerSyncStatus: PLANNER_SYNC_STATUS;
  declare academicCalendarId: string;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  declare readonly createdAt: Date;
  declare readonly deletedAt: string;
  declare readonly updatedAt: Date;
}

BatchModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    subjects: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      field: "start_time",
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      field: "end_time",
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instituteId: {
      type: DataTypes.UUID,
      field: "institute_id",
      allowNull: false,
    },
    shiftId: {
      type: DataTypes.UUID,
      field: "shift_id",
      allowNull: true,
    },
    slotId: {
      type: DataTypes.UUID,
      field: "slot_id",
      allowNull: true,
    },
    teacherId: {
      type: DataTypes.UUID,
      field: "teacher_id",
      defaultValue: null,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: COMMAN_STATUS.ACTIVE,
    },
    plannerSyncStatus: {
      type: DataTypes.STRING,
      field: "planner_sync_status",
      allowNull: true,
      defaultValue: PLANNER_SYNC_STATUS.PENDING,
    },
    academicCalendarId: {
      type: DataTypes.UUID,
      field: "academic_calendar_id",
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    modelName: "BatchModel",
    tableName: "batches",
    timestamps: true,
    sequelize,
  }
);

BatchModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

BatchModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});

BatchModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});

BatchModel.belongsTo(TypeManagementModel, {
  foreignKey: {
    name: "type",
    allowNull: false,
  },
  as: "batchType",
});

BatchModel.belongsTo(InstituteModel, {
  foreignKey: {
    name: "instituteId",
    field: "institute_id",
    allowNull: false,
  },
  as: "institute",
});

UserModel.hasMany(BatchModel, {
  foreignKey: {
    name: "teacherId",
    field: "teacher_id",
    allowNull: true,
  },
  as: "batchesHasTeacher",
});
BatchModel.belongsTo(UserModel, {
  foreignKey: {
    name: "teacherId",
    field: "teacher_id",
    allowNull: true,
  },
  as: "batchTeacher",
});

InstituteModel.hasMany(BatchModel, {
  foreignKey: {
    name: "instituteId",
    field: "institute_id",
    allowNull: false,
  },
  as: "batches",
});
BatchModel.belongsTo(WorkingShiftModel, {
  foreignKey: {
    name: "shiftId",
    field: "shift_id",
    allowNull: false,
  },
  as: "shiftBatch",
});

SlotModel.hasMany(BatchModel, {
  foreignKey: {
    name: "slotId",
    field: "slot_id",
    allowNull: false,
  },
  as: "batchesSlot",
});
BatchModel.belongsTo(SlotModel, {
  foreignKey: {
    name: "slotId",
    field: "slot_id",
    allowNull: false,
  },
  as: "slotBatch",
});

WorkingShiftModel.hasMany(BatchModel, {
  foreignKey: {
    name: "shiftId",
    field: "shift_id",
    allowNull: false,
  },
  as: "batchesShift",
});

AcademicCalendarModel.hasMany(BatchModel, {
  foreignKey: {
    name: "academicCalendarId",
    field: "academic_calendar_id",
    allowNull: true,
  },
  as: "academicCalendarBatchList",
});

BatchModel.belongsTo(AcademicCalendarModel, {
  foreignKey: {
    name: "academicCalendarId",
    field: "academic_calendar_id",
    allowNull: true,
  },
  as: "batchAcademicCalendar",
});

// BatchModel.afterBulkCreate(async instances => {
//     for (const instance of instances) {
//         await batchService.updatePlannerSyncStatus([instance.id]);
//     }
// });

BatchModel.afterBulkCreate(async (instances, options) => {
  try {
    const batchIds = instances.map((instance) => instance.id);

    if (!batchIds.length) return;

    await BatchModel.update(
      { plannerSyncStatus: PLANNER_SYNC_STATUS.PENDING },
      {
        where: { id: { [Op.in]: batchIds } },
        ...(options.transaction && {
          transaction: options.transaction as Transaction,
        }),
      }
    );
  } catch (err) {}
});

// BatchModel.afterCreate(async (batch) => {
//   await batchService.updatePlannerSyncStatus([batch.id]);
// });

BatchModel.afterCreate(async (batch, options) => {
  try {
    await BatchModel.update(
      { plannerSyncStatus: PLANNER_SYNC_STATUS.PENDING },
      {
        where: { id: { [Op.in]: [batch.id] } },
        ...(options?.transaction && {
          transaction: options.transaction as Transaction,
        }),
      }
    );
  } catch (err) {
  }
});

export default BatchModel;
