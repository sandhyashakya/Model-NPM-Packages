import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { INSTITUTE_SUBSCRIPTION_PLAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import WalletModel from './walletModel';
import InstituteModel from './instituteModel';
import { IInstituteSubscriptionPlanModelAttributes, TInstituteSubscriptionPlanModelCreationAttributes } from '@kipipackages/interfaces';

class InstituteSubscriptionPlanModel extends Model<IInstituteSubscriptionPlanModelAttributes, TInstituteSubscriptionPlanModelCreationAttributes> {
    declare id: string;
    declare walletTransactionId: string;
    declare userId: string;
    declare uuid: string;
    declare instituteId: string;
    declare walletId: string;
    declare planId: string; // mongoose.Types.ObjectId will map as string in Sequelize
    declare planUuid: string;
    declare maxStorageInGb: number;
    declare maxStorageInBytes: number;
    declare usedStorageInGb: number;
    declare maxUsers: number;
    declare usedStorageInBytes: number;
    declare usedUsers: number;
    declare usedStudents: number;
    declare isPrimary: boolean;
    declare status: INSTITUTE_SUBSCRIPTION_PLAN_STATUS;
    declare startDate: Date;
    declare endDate: Date;
    declare lastSubscriptionPlan?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

InstituteSubscriptionPlanModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        walletTransactionId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'wallet_transaction_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        userUuid: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_uuid',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
        walletId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'wallet_id',
        },
        planId: {
            type: DataTypes.STRING, // mapping mongoose ObjectId
            allowNull: false,
            field: 'plan_id',
        },
        planUuid: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'plan_uuid',
        },
        // maxStorageInGb: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     field: 'max_storage_in_gb',
        // },
        // maxStorageInBytes: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     field: 'max_storage_in_bytes',
        // },
        // maxUsers: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0,
        //     field: 'max_users',
        // },
        usedStudents: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'used_students',
        },
        usedStorageInBytes: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            field: 'used_storage_in_bytes',
        },
        usedStorageInGb: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            field: 'used_storage_in_gb',
        },
        usedUsers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'used_users',
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_primary',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: INSTITUTE_SUBSCRIPTION_PLAN_STATUS.ACTIVE,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_date',
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_date',
        },
        lastSubscriptionPlan: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'last_user_subscription_plan',
        },
    },
    {
        modelName: 'InstituteSubscriptionPlanModel',
        tableName: 'institute_subscription_plans',
        timestamps: true,
        sequelize,
    },
);

// Associations
InstituteSubscriptionPlanModel.belongsTo(UserModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'user',
});

UserModel.hasMany(InstituteSubscriptionPlanModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'userSubscriptionPlanList',
});

InstituteSubscriptionPlanModel.belongsTo(WalletModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'wallet',
});

WalletModel.hasMany(InstituteSubscriptionPlanModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'walletSubscriptionPlanList',
});

InstituteSubscriptionPlanModel.belongsTo(InstituteModel, {
    foreignKey: { name: 'instituteId', allowNull: false, field: 'institute_id' },
    as: 'institute',
});

InstituteModel.hasMany(InstituteSubscriptionPlanModel, {
    foreignKey: { name: 'instituteId', allowNull: false, field: 'institute_id' },
    as: 'instituteSubscriptionPlanList',
});

// InstituteSubscriptionPlanModel.hasMany(UserModel, {
//     foreignKey: {
//         name: 'userUuid',
//         allowNull: false,
//         field: 'user_uuid',
//     },
//     sourceKey: 'uuid',
//     as: 'subscriptionPlanUserList',
// });

// UserModel.hasMany(InstituteSubscriptionPlanModel, {
//     foreignKey: {
//         name: 'userUuid',
//         allowNull: false,
//         field: 'user_uuid',
//     },
//     sourceKey: 'uuid',
//     as: 'userSubscriptionPlan',
// });

// Created/Updated/Deleted By associations
InstituteSubscriptionPlanModel.belongsTo(UserModel, {
    foreignKey: { name: 'createdBy', allowNull: true, field: 'created_by' },
    as: 'createdByUser',
});

InstituteSubscriptionPlanModel.belongsTo(UserModel, {
    foreignKey: { name: 'updatedBy', allowNull: true, field: 'updated_by' },
    as: 'updatedByUser',
});

InstituteSubscriptionPlanModel.belongsTo(UserModel, {
    foreignKey: { name: 'deletedBy', allowNull: true, field: 'deleted_by' },
    as: 'deletedByUser',
});

export default InstituteSubscriptionPlanModel;
