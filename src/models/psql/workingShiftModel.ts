import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { SCHOOL_SHIFT, WORKIN_DAY_STATUS } from '../../constants/app';
import UserModel from './userModel';
import WorkingDayModel from './workingDayModel';
import InstituteModel from './instituteModel';
import SlotModel from './slotModel';
import { IWorkingShiftAttributes, TWorkingShiftCreationAttributes } from '@kipipackages/interfaces';

class WorkingShiftModel extends Model<IWorkingShiftAttributes, TWorkingShiftCreationAttributes> {
    declare id: string;
    declare status: WORKIN_DAY_STATUS;
    declare shiftType: SCHOOL_SHIFT;
    declare startTime: Date;
    declare endTime: Date;
    declare workingId: string;
    declare instituteId: string;
    declare slotId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

WorkingShiftModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        workingId: {
            type: DataTypes.UUID,
            field: 'working_id',
            allowNull: false,
        },
        slotId: {
            type: DataTypes.UUID,
            field: 'slot_id',
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: WORKIN_DAY_STATUS.ACTIVE,
        },
        shiftType: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_time',
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_time',
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
    },
    {
        modelName: 'WorkingShiftModel',
        tableName: 'working_shift_days',
        timestamps: true,
        sequelize,
    },
);
WorkingShiftModel.belongsTo(WorkingDayModel, { foreignKey: 'workingId', as: 'shiftHasWorkingDay' });
WorkingDayModel.hasMany(WorkingShiftModel, { foreignKey: 'workingId', as: 'workingDayShift' });

WorkingShiftModel.belongsTo(InstituteModel, { foreignKey: 'instituteId', as: 'shiftHasInstituted' });
WorkingDayModel.hasMany(WorkingShiftModel, { foreignKey: 'instituteId', as: 'institutedShift' });

WorkingShiftModel.belongsTo(SlotModel, { foreignKey: 'slotId', as: 'shiftSlot' });
SlotModel.hasMany(WorkingShiftModel, { foreignKey: 'slotId', as: 'slotHasShift' });

WorkingShiftModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

WorkingShiftModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

WorkingShiftModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default WorkingShiftModel;
