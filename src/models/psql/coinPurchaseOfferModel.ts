import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { COIN_PURCHASE_GST_PERCENTAGE, COMMAN_STATUS, DISCOUNT_TYPE } from '../../constants/app';
import UserModel from './userModel';
import { ICoinPurchaseOfferModelAttributes, TCoinPurchaseOfferModelCreationAttributes } from '@kipipackages/interfaces';

class CoinPurchaseOfferModel extends Model<ICoinPurchaseOfferModelAttributes, TCoinPurchaseOfferModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare discountType: DISCOUNT_TYPE;
    declare discount: number;
    declare totalAmount: number;
    declare isDefault: boolean;
    declare status: COMMAN_STATUS;
    declare coin: number;
    declare totalCoin: number;
    declare gstCharge: number;
    declare payableAmount: number;
    declare gstPercentage: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

CoinPurchaseOfferModel.init(
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
        discountType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DISCOUNT_TYPE.NONE,
            field: 'discount_type',
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        coin: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalCoin: {
            type: DataTypes.FLOAT,
            allowNull: false,
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
        gstCharge: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'gst_charge',
            defaultValue: 0,
        },
        gstPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'gst_percentage',
            defaultValue: COIN_PURCHASE_GST_PERCENTAGE,
        },
        payableAmount: {
            type: DataTypes.FLOAT,
            field: 'payable_amount',
            allowNull: false,
        },
    },
    {
        modelName: 'CoinPurchaseOfferModel',
        tableName: 'coin_purchase_Offers',
        timestamps: true,
        sequelize,
    },
);

CoinPurchaseOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

CoinPurchaseOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

CoinPurchaseOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default CoinPurchaseOfferModel;
