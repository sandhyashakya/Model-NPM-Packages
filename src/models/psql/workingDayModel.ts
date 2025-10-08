import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { WORKIN_DAY_STATUS } from '../../constants/app';
import UserModel from './userModel';
import { IWorkingDayAttributes, TWorkingDayCreationAttributes } from '@kipipackages/interfaces';

class WorkingDayModel extends Model<IWorkingDayAttributes, TWorkingDayCreationAttributes> {
    declare id: string;
    declare dayName: string;
    declare status: WORKIN_DAY_STATUS;
    declare startTime: Date;
    declare endTime: Date;
    declare instituteId: string;
    declare dayOfWeek: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

WorkingDayModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        dayName: {
            type: DataTypes.STRING(20),
            field: 'day_name',
            allowNull: false,
        },
        dayOfWeek: {
            type: DataTypes.INTEGER,
            field: 'day_of_week',
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: WORKIN_DAY_STATUS.INACTIVE,
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
        modelName: 'WorkingDayModel',
        tableName: 'working_days',
        timestamps: true,
        sequelize,
    },
);

WorkingDayModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

WorkingDayModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

WorkingDayModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default WorkingDayModel;
