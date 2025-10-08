import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { BOOLEAN_STATUS, COMMAN_STATUS, FEE_TYPE, FEE_TYPE_FREQUENCY } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import BankAccountDetailsModel from './bankAccountDetailsModel';
import TypeManagementModel from './typeManagementModel';
import { IFeeTypeModelAttributes, TFeeTypeModelCreationAttributes } from '@kipipackages/interfaces';

class FeeTypeModel extends Model<IFeeTypeModelAttributes, TFeeTypeModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare typeManagementId: string;
    declare frequency: FEE_TYPE_FREQUENCY;
    declare feeType: FEE_TYPE;
    declare module: COMMAN_STATUS;
    declare status: COMMAN_STATUS;
    declare account: string;
    declare isDefault: BOOLEAN_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

FeeTypeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        typeManagementId: {
            type: DataTypes.UUID,
            field: 'type_management_id',
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        account: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
            allowNull: false,
        },
        module: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.INACTIVE,
            allowNull: false,
        },
        isDefault: {
            type: DataTypes.ENUM,
            values: Object.values(BOOLEAN_STATUS),
            allowNull: false,
            defaultValue: BOOLEAN_STATUS.NO,
        },
        feeType: {
            type: DataTypes.ENUM,
            values: Object.values(FEE_TYPE),
            allowNull: false,
        },
        frequency: {
            type: DataTypes.ENUM,
            values: Object.values(FEE_TYPE_FREQUENCY),
            allowNull: false,
        },
    },
    {
        modelName: 'FeeTypeModel',
        tableName: 'fee_type',
        timestamps: true,
        sequelize,
    },
);

FeeTypeModel.belongsTo(BankAccountDetailsModel, {
    foreignKey: {
        name: 'account',
    },
    as: 'accountFeeType',
});

BankAccountDetailsModel.hasMany(FeeTypeModel, {
    foreignKey: 'account',
    as: 'feeTypeHasAccount',
});
TypeManagementModel.hasMany(FeeTypeModel, {
    foreignKey: 'typeManagementId',
    as: 'feeTypeTypeManagement',
});
FeeTypeModel.belongsTo(TypeManagementModel, {
    foreignKey: {
        name: 'typeManagementId',
    },
    as: 'typeManagementType',
});

FeeTypeModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteFeeType',
});

InstituteModel.hasMany(FeeTypeModel, {
    foreignKey: 'instituteId',
    as: 'feeTypeInstitute',
});

FeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default FeeTypeModel;
