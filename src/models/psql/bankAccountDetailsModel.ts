import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { COMMAN_STATUS, BOOLEAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IBankAccountDetailsInterfaceModelAttributes, TBankAccountDetailsModelCreationAttributes } from '@kipipackages/interfaces';

class BankAccountDetailsModel extends Model<IBankAccountDetailsInterfaceModelAttributes, TBankAccountDetailsModelCreationAttributes> {
    declare id: string;
    declare accountHolderName: string;
    declare bankName: string;
    declare branchName: string;
    declare accountNumber: string;
    declare ifscCode: string;
    declare instituteId: string;
    declare status: COMMAN_STATUS;
    declare isDefault: BOOLEAN_STATUS;
    declare isSelfAccount: BOOLEAN_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

BankAccountDetailsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        accountHolderName: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        bankName: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        branchName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ifscCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        isDefault: {
            type: DataTypes.ENUM,
            values: Object.values(BOOLEAN_STATUS),
            allowNull: false,
            defaultValue: BOOLEAN_STATUS.NO,
        },
        isSelfAccount: {
            type: DataTypes.ENUM,
            values: Object.values(BOOLEAN_STATUS),
            allowNull: false,
            defaultValue: BOOLEAN_STATUS.NO,
        },
    },
    {
        modelName: 'BankAccountDetailsModel',
        tableName: 'bank_account_details',
        timestamps: true,
        sequelize,
    },
);
BankAccountDetailsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'bankAccountDetailsInstitute',
});

InstituteModel.hasMany(BankAccountDetailsModel, { foreignKey: 'instituteId', as: 'instituteHasBankAccountDetails' });

BankAccountDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

BankAccountDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

BankAccountDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default BankAccountDetailsModel;
