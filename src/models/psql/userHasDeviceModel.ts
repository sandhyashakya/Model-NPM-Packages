import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import { NOTIFICATION_ACTION } from '../../constants/app';
import { IUserHasDeviceModelAttributes, TUserHasDeviceModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasDeviceModel extends Model<IUserHasDeviceModelAttributes, TUserHasDeviceModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare deviceId: string;
    declare deviceToken?: string;
    declare type: NOTIFICATION_ACTION;
    declare socketId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasDeviceModel.init(
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
            field: 'user_id',
        },
        deviceId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'device_id',
        },
        deviceToken: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'device_token',
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: NOTIFICATION_ACTION.PUSH,
        },
        socketId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'socket_id',
        },
    },
    {
        modelName: 'UserHasDevivceModel',
        tableName: 'user_has_device',
        sequelize,
        timestamps: true,
        indexes: [
            {
                name: 'user_device_unique_key',
                unique: true,
                fields: ['user_id', 'device_id'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null, type: NOTIFICATION_ACTION.PUSH },
            },
        ],
    },
);

// Associations
UserModel.hasMany(UserHasDeviceModel, {
    foreignKey: 'userId',
    as: 'userHasDevices',
});

UserHasDeviceModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'userToken',
});

UserHasDeviceModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasDeviceModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasDeviceModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasDeviceModel;
