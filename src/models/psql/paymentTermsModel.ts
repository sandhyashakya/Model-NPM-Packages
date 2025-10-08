import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { PAYMENT_TERMS_STATUS, PAYMENT_TERMS_TYPE } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IPaymentTermsModelAttributes } from '@kipipackages/interfaces';

class PaymentTermsModel extends Model<IPaymentTermsModelAttributes> {
    declare id: string;
    declare date?: Date;
    declare type: PAYMENT_TERMS_TYPE;
    declare amount: number;
    declare paidAmount: number;
    declare status: PAYMENT_TERMS_STATUS;
    declare instituteId: string;
    declare userId: string;
    declare feeCollectionId: string;
    declare startDate: Date;
    declare endDate: Date;
}

PaymentTermsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(PAYMENT_TERMS_TYPE),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
        paidAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(PAYMENT_TERMS_STATUS),
            defaultValue: PAYMENT_TERMS_STATUS.DUE,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: false,
        },
        feeCollectionId: {
            type: DataTypes.UUID,
            field: 'fee_collection_id',
            allowNull: false,
        },
    },
    {
        modelName: 'PaymentTermsModel',
        tableName: 'payment_terms',
        timestamps: true,
        sequelize,
    },
);

PaymentTermsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'institute',
});

PaymentTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'user',
});

UserModel.hasMany(PaymentTermsModel, { foreignKey: 'userId', as: 'userHasPaymentTerms' });
InstituteModel.hasMany(PaymentTermsModel, { foreignKey: 'instituteId', as: 'instituteHasPaymentTerms' });

PaymentTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

PaymentTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

PaymentTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default PaymentTermsModel;
