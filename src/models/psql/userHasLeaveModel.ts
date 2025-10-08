import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import MasterLeaveModel from './masterLeaveModel';
import { LEAVE } from '../../constants/app';
import { IUserHasLeaveModelAttributes, TUserHasLeaveModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasLeaveModel extends Model<IUserHasLeaveModelAttributes, TUserHasLeaveModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare totalLeave: number;
    declare usedLeave: number;
    declare leaveId: string;
    declare leave: LEAVE;
    declare userHasLeaveId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasLeaveModel.init(
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
        leaveId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userHasLeaveId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        totalLeave: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        leave: {
            type: DataTypes.ENUM,
            values: Object.values(LEAVE),
            defaultValue: LEAVE.PAID,
            allowNull: false,
        },
        usedLeave: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasLeaveModel',
        tableName: 'user_has_leave',
        timestamps: true,
        sequelize,
    },
);

UserHasLeaveModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'leaveUser',
});
UserHasLeaveModel.belongsTo(UserHasLeaveModel, { foreignKey: 'userHasLeaveId', as: 'parentLeave' });
UserHasLeaveModel.hasMany(UserHasLeaveModel, { foreignKey: 'userHasLeaveId', as: 'childLeaves' });
UserHasLeaveModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'leaveInstitute',
});

UserHasLeaveModel.belongsTo(MasterLeaveModel, {
    foreignKey: {
        name: 'leaveId',
        field: 'leave_id',
    },
    as: 'leaveDetails',
});

MasterLeaveModel.hasMany(UserHasLeaveModel, {
    foreignKey: {
        name: 'leaveId',
        field: 'leave_id',
    },
    as: 'associatedUserLeaves',
});

UserModel.hasMany(UserHasLeaveModel, {
    foreignKey: 'userId',
    as: 'userHasLeaves',
});

InstituteModel.hasMany(UserHasLeaveModel, {
    foreignKey: 'instituteId',
    as: 'instituteLeaveRecords',
});

UserHasLeaveModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasLeaveModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasLeaveModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasLeaveModel;
