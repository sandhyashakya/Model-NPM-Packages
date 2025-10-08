import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { PAYMENT_TERMS_TYPE } from '../../constants/app';
import FeeTypeModel from './feeTypeModel';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IFeeTypeHasTermsModelAttributes, TFeeTypeHasTermsModelCreationAttributes } from '@kipipackages/interfaces';

class FeeTypeHasTermsModel extends Model<IFeeTypeHasTermsModelAttributes, TFeeTypeHasTermsModelCreationAttributes> {
    declare id: string;
    declare stdId: string;
    declare feeTypeId: string;
    declare frequency: PAYMENT_TERMS_TYPE;
    declare amount: number;
    declare date: Date;
    declare instituteId: string;
    declare academicCalendarId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

FeeTypeHasTermsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        stdId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        feeTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.ENUM,
            values: Object.values(PAYMENT_TERMS_TYPE),
            allowNull: false,
        },
    },
    {
        modelName: 'FeeTypeHasTermsModel',
        tableName: 'fee_type_has_terms',
        timestamps: true,
        sequelize,
    },
);

FeeTypeHasTermsModel.belongsTo(FeeTypeModel, {
    foreignKey: {
        name: 'feeTypeId',
    },
    as: 'termsFeeType',
});

FeeTypeModel.hasMany(FeeTypeHasTermsModel, {
    foreignKey: 'feeTypeId',
    as: 'feeTypeHasTerms',
});

FeeTypeHasTermsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteFeeTypeTerms',
});

InstituteModel.hasMany(FeeTypeHasTermsModel, {
    foreignKey: 'instituteId',
    as: 'feeTypeHasTermsInstitute',
});

FeeTypeHasTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeeTypeHasTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeeTypeHasTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default FeeTypeHasTermsModel;
