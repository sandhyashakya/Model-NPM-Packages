import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import { IWalletModelAttributes, TWalletModelCreationAttributes } from '@kipipackages/interfaces';

class WalletModel extends Model<IWalletModelAttributes, TWalletModelCreationAttributes> {
    declare id: string;
    declare uuid: string;
    declare status: COMMAN_STATUS;
    declare coin: number;
    declare storageInGb: number;
    declare storageInBytes: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

WalletModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        coin: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
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
    },
    {
        modelName: 'WalletModel',
        tableName: 'wallets',
        timestamps: true,
        sequelize,
    },
);

WalletModel.hasMany(UserModel, {
    foreignKey: {
        name: 'uuid',
        allowNull: false,
        field: 'uuid',
    },
    sourceKey: 'uuid',
    as: 'walletUserList',
});

UserModel.belongsTo(WalletModel, {
    foreignKey: {
        name: 'uuid',
        allowNull: false,
        field: 'uuid',
    },
    as: 'userWallet',
});

WalletModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

WalletModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

WalletModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default WalletModel;
