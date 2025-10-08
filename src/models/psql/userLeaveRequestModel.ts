import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { LEAVE, LEAVE_STATUS, LEAVE_TYPE } from '../../constants/app';
import MasterLeaveModel from './masterLeaveModel';
import UserHasLeaveModel from './userHasLeaveModel';
import { IUserLeaveRequestModelAttributes, TUserLeaveRequestModelCreationAttributes } from '@kipipackages/interfaces';

class UserLeaveRequestModel extends Model<IUserLeaveRequestModelAttributes, TUserLeaveRequestModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare leaveId: string;
    declare leaveType: LEAVE_TYPE;
    declare reason?: string;
    declare status: LEAVE_STATUS;
    declare leave: LEAVE;
    declare startTime: Date;
    declare endTime: Date;
    declare userHasLeaveId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserLeaveRequestModel.init(
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
        userHasLeaveId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        leave: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE),
            defaultValue: LEAVE.PAID,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        leaveId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leaveType: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE_TYPE),
            allowNull: false,
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
        modelName: 'UserLeaveRequest',
        tableName: 'user_leave_request',
        timestamps: true,
        sequelize,
    },
);
UserLeaveRequestModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserLeaveRequestModel.belongsTo(InstituteModel, { foreignKey: 'instituteId', as: 'institute' });
UserLeaveRequestModel.belongsTo(MasterLeaveModel, { foreignKey: 'leaveId', as: 'leaveDetails' });
UserLeaveRequestModel.belongsTo(UserHasLeaveModel, { foreignKey: 'userHasLeaveId' });

UserModel.hasMany(UserLeaveRequestModel, { foreignKey: 'userId', as: 'leaveRequest' });
InstituteModel.hasMany(UserLeaveRequestModel, { foreignKey: 'instituteId', as: 'leaveRequest' });
MasterLeaveModel.hasMany(UserLeaveRequestModel, { foreignKey: 'leaveId', as: 'leaveDate' });
UserHasLeaveModel.belongsTo(UserLeaveRequestModel, { foreignKey: 'userHasLeaveId' });

UserLeaveRequestModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserLeaveRequestModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserLeaveRequestModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserLeaveRequestModel;
