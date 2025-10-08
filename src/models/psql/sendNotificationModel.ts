import { DataTypes, Model } from 'sequelize';
import { NOTIFICATION_MODULE_TYPE, NOTIFICATION_STATUS } from '../../constants/app';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INotificationModelAttributes, TNotificationModelCreationAttributes } from '@kipipackages/interfaces';

class SendNotificationModel extends Model<INotificationModelAttributes, TNotificationModelCreationAttributes> {
    declare id: string;
    // declare type: NOTIFICATION_TYPE;
    declare senderId: string;
    declare receiverId: string;
    // declare deviceToken?: string;
    declare viewDate: Date;
    declare status: NOTIFICATION_STATUS;
    declare title: string;
    declare message: string;
    declare instituteId: string;
    declare moduleType: NOTIFICATION_MODULE_TYPE;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

SendNotificationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // type: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        senderId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'sender_id',
        },
        receiverId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'receiver_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_Id',
        },
        // deviceToken: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     field: 'device_token',
        // },
        viewDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'view_date',
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: NOTIFICATION_STATUS.PENDING,
        },
        moduleType: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'module_type',
        },
    },
    {
        modelName: 'SendnNotificationModel',
        tableName: 'notifications',
        sequelize,
        timestamps: true,
    },
);

// Associations
SendNotificationModel.belongsTo(UserModel, {
    foreignKey: 'senderId',
    as: 'notificationSender',
});

SendNotificationModel.belongsTo(UserModel, {
    foreignKey: 'receiverId',
    as: 'notificationReceiver',
});

UserModel.hasMany(SendNotificationModel, {
    foreignKey: 'senderId',
    as: 'sentHasNotifications',
});

UserModel.hasMany(SendNotificationModel, {
    foreignKey: 'receiverId',
    as: 'receivedHasNotifications',
});

SendNotificationModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'institute',
});

SendNotificationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SendNotificationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SendNotificationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default SendNotificationModel;
