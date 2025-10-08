import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { PDF_CHEQUE_FREQUENCY, PDF_CHEQUE_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';

import UserFeeTypeByAccountModel from './userFeeTypeByAccountModel';
import InstituteEntityModel from './instituteEntityModel';
import { IPdcChequeModelAttributes, TPdcChequeModelCreationAttributes } from '@kipipackages/interfaces';

class PdcChequeModel extends Model<IPdcChequeModelAttributes, TPdcChequeModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare userId: string;
    declare depositDate: Date;
    declare chequeNo: string;
    declare amount: number;
    declare grNo: string;
    declare userFeeTypeByAccountId: string;
    declare status: PDF_CHEQUE_STATUS;
    declare bankName: string;
    declare frequency: PDF_CHEQUE_FREQUENCY;
    declare standardId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

PdcChequeModel.init(
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
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: true,
        },
        userFeeTypeByAccountId: {
            type: DataTypes.UUID,
            field: 'user_fee_type_by_account_id',
            allowNull: true,
        },
        depositDate: {
            type: DataTypes.DATE,
            field: 'deposit_date',
            allowNull: true,
        },
        chequeNo: {
            type: DataTypes.STRING,
            field: 'cheque_no',
            allowNull: true,
        },
        standardId: {
            type: DataTypes.UUID,
            field: 'standard_id',
            allowNull: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        grNo: {
            type: DataTypes.STRING,
            field: 'gr_no',
            allowNull: true,
        },
        bankName: {
            type: DataTypes.STRING,
            field: 'bank_name',
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: PDF_CHEQUE_STATUS.ADDED,
        },
        frequency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        modelName: 'PdcChequeModel',
        tableName: 'pdcCheques',
        timestamps: true,
        sequelize,
    },
);

// Associations
PdcChequeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

PdcChequeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

PdcChequeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

PdcChequeModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'pdcChequeInstitute',
});

InstituteModel.hasMany(PdcChequeModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasPdcCheques',
});

PdcChequeModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'pdcChequeUser',
});
UserModel.hasMany(PdcChequeModel, {
    foreignKey: 'userId',
    as: 'userHasPdcCheques',
});

PdcChequeModel.belongsTo(UserFeeTypeByAccountModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'pdcChequeUserFeeType',
});
UserFeeTypeByAccountModel.hasMany(PdcChequeModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'userFeeTypePdcCheques',
});

PdcChequeModel.belongsTo(InstituteEntityModel, {
    foreignKey: 'standardId',
    as: 'pdcChequeStandard',
});
InstituteEntityModel.hasMany(PdcChequeModel, {
    foreignKey: 'standardId',
    as: 'StandardPdcCheques',
});

export default PdcChequeModel;
