import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { LEAVE, LEAVE_STATUS, LEAVE_TYPE } from '../../constants/app';
import UserHasLeaveModel from './userHasLeaveModel';
import { IUserHasLeaveHistoryModelAttributes, TUserHasLeaveHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasLeaveHistoryModel extends Model<IUserHasLeaveHistoryModelAttributes, TUserHasLeaveHistoryModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare usedLeave: number;
    declare leaveType: LEAVE_TYPE;
    declare reason?: string;
    declare status: LEAVE_STATUS;
    declare startTime: Date;
    declare endTime: Date;
    declare leave: LEAVE;
    declare userLeaveRequestId: string;
    declare userHasLeaveId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasLeaveHistoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userLeaveRequestId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userHasLeaveId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        usedLeave: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
        leaveType: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE_TYPE),
            allowNull: false,
        },
        leave: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE),
            defaultValue: LEAVE.PAID,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE_STATUS),
            defaultValue: LEAVE_STATUS.PENDING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasLeaveHistory',
        tableName: 'user_has_leave_history',
        timestamps: true,
        sequelize,
    },
);
UserHasLeaveHistoryModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserHasLeaveHistoryModel.belongsTo(InstituteModel, { foreignKey: 'instituteId', as: 'institute' });
UserHasLeaveHistoryModel.belongsTo(UserHasLeaveModel, { foreignKey: 'userHasLeaveId', as: 'userHasLeave' });

UserModel.hasMany(UserHasLeaveHistoryModel, { foreignKey: 'userId', as: 'leaveHistory' });
InstituteModel.hasMany(UserHasLeaveHistoryModel, { foreignKey: 'instituteId', as: 'leaveHistory' });
UserHasLeaveModel.belongsTo(UserHasLeaveHistoryModel, { foreignKey: 'userHasLeaveId', as: 'leaveHasUser' });

UserHasLeaveHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasLeaveHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasLeaveHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasLeaveHistoryModel;
