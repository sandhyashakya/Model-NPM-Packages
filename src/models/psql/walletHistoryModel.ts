import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { WALLET_HISTORY_ACTION, WALLET_HISTORY_ITEM_TYPE, WALLET_HISTORY_STATUS, WALLET_HISTORY_TYPE } from '../../constants/app';
import UserModel from './userModel';
import WalletModel from './walletModel';
import { IWalletHistoryModelAttributes, TWalletHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class WalletHistoryModel extends Model<IWalletHistoryModelAttributes, TWalletHistoryModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare walletId: string;
    declare type: WALLET_HISTORY_TYPE;
    declare action: WALLET_HISTORY_ACTION;
    declare totalCoin: number;
    declare coin: number;
    declare storage: number;
    declare totalStorage: number;
    declare itemType: WALLET_HISTORY_ITEM_TYPE;
    declare status: WALLET_HISTORY_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

WalletHistoryModel.init(
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalCoin: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'total_coin',
        },
        coin: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'coin',
        },
        storage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'storage',
        },
        totalStorage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'total_storage',
        },
        itemType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: WALLET_HISTORY_STATUS.PENDING,
        },
    },
    {
        modelName: 'WalletHistoryModel',
        tableName: 'wallet_history',
        timestamps: true,
        paranoid: true, // enables soft delete (deletedAt)
        sequelize,
    },
);

WalletHistoryModel.belongsTo(UserModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'walletHistoryUser',
});

UserModel.hasMany(WalletHistoryModel, {
    foreignKey: { name: 'userId', allowNull: false, field: 'user_id' },
    as: 'userWalletHistoryList',
});

WalletHistoryModel.belongsTo(WalletModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'wallet',
});

WalletModel.hasMany(WalletHistoryModel, {
    foreignKey: { name: 'walletId', allowNull: false, field: 'wallet_id' },
    as: 'walletHistoryList',
});

WalletHistoryModel.belongsTo(UserModel, {
    foreignKey: { name: 'createdBy', allowNull: true, field: 'created_by' },
    as: 'createdByUser',
});

WalletHistoryModel.belongsTo(UserModel, {
    foreignKey: { name: 'updatedBy', allowNull: true, field: 'updated_by' },
    as: 'updatedByUser',
});

WalletHistoryModel.belongsTo(UserModel, {
    foreignKey: { name: 'deletedBy', allowNull: true, field: 'deleted_by' },
    as: 'deletedByUser',
});

export default WalletHistoryModel;
