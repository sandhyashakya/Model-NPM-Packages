import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { COMMAN_STATUS, DISCOUNT_TYPE, VALID_CURRENCY } from '../../constants/app';
import UserModel from './userModel';
import { ICloudStorageModelAttributes, TCloudStorageModelCreationAttributes } from '@kipipackages/interfaces';

class CloudStorageModel extends Model<ICloudStorageModelAttributes, TCloudStorageModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare storageInGb: number;
    declare chargePerGb: number;
    declare discountType: DISCOUNT_TYPE;
    declare discount: number;
    declare validCurrency: VALID_CURRENCY;
    declare totalAmount: number;
    declare totalPayableAmount: number;
    declare isDefault: boolean;
    declare status: COMMAN_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

CloudStorageModel.init(
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
        storageInGb: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'storage_in_gb',
        },
        chargePerGb: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discountType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DISCOUNT_TYPE.NONE,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        validCurrency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: VALID_CURRENCY.COIN,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        totalPayableAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'CloudStorageModel',
        tableName: 'cloud_storage', // optional: change this if your table has a different name
        timestamps: true,
        sequelize,
    },
);

CloudStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

CloudStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

CloudStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default CloudStorageModel;
