import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { WALLET_HISTORY_ACTION } from '../../constants/app';
import UserModel from './userModel';
import WalletModel from './walletModel';
import { IUserHasStorageModelAttributes, TUserHasStorageModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasStorageModel extends Model<IUserHasStorageModelAttributes, TUserHasStorageModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare walletId: string;
    declare walletTransactionId: string;
    declare storageInGb: number;
    declare storageInBytes: number;
    declare action: WALLET_HISTORY_ACTION;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

UserHasStorageModel.init(
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
        walletId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'wallet_id',
        },
        walletTransactionId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'wallet_transaction_id',
        },
        storageInGb: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            field: 'storage_in_gb',
        },
        storageInBytes: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            field: 'storage_in_bytes',
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasStorageModel',
        tableName: 'user_has_storage',
        timestamps: true,
        sequelize,
    },
);

// Associations
UserHasStorageModel.belongsTo(UserModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'user',
});

UserModel.hasMany(UserHasStorageModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'userStorageList',
});

UserHasStorageModel.belongsTo(WalletModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'wallet',
});

WalletModel.hasMany(UserHasStorageModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'walletStorageList',
});

// Created/Updated/Deleted By associations
UserHasStorageModel.belongsTo(UserModel, {
    foreignKey: { name: 'createdBy', allowNull: true, field: 'created_by' },
    as: 'createdByUser',
});

UserHasStorageModel.belongsTo(UserModel, {
    foreignKey: { name: 'updatedBy', allowNull: true, field: 'updated_by' },
    as: 'updatedByUser',
});

UserHasStorageModel.belongsTo(UserModel, {
    foreignKey: { name: 'deletedBy', allowNull: true, field: 'deleted_by' },
    as: 'deletedByUser',
});

export default UserHasStorageModel;
