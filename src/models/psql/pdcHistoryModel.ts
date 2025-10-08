import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { PDF_CHEQUE_FREQUENCY, PDF_CHEQUE_STATUS } from '../../constants/app';
import UserFeeTypeByAccountModel from './userFeeTypeByAccountModel';
import InstituteEntityModel from './instituteEntityModel';
import PdcChequeModel from './pdcChequeModel';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IPdcHistoryModelAttributes, TPdcHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class PdcHistoryModel extends Model<IPdcHistoryModelAttributes, TPdcHistoryModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare pdcChequeId: string;
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

PdcHistoryModel.init(
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
        pdcChequeId: {
            type: DataTypes.UUID,
            field: 'pdc_cheque_id',
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
        modelName: 'PdcHistoryModel',
        tableName: 'pdc_history',
        timestamps: true,
        sequelize,
    },
);

// Associations
PdcHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

PdcHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

PdcHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

PdcHistoryModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'pdcHistoryInstitute',
});

InstituteModel.hasMany(PdcHistoryModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasPdcHistory',
});

PdcHistoryModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'pdcHistoryUser',
});
UserModel.hasMany(PdcHistoryModel, {
    foreignKey: 'userId',
    as: 'userHasPdcHistory',
});

PdcHistoryModel.belongsTo(UserFeeTypeByAccountModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'pdcHistoryUserFeeType',
});
UserFeeTypeByAccountModel.hasMany(PdcHistoryModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'userFeeTypePdcHistory',
});

PdcHistoryModel.belongsTo(InstituteEntityModel, {
    foreignKey: 'standardId',
    as: 'pdcHistoryStandard',
});
InstituteEntityModel.hasMany(PdcHistoryModel, {
    foreignKey: 'standardId',
    as: 'StandardPdcHistory',
});

PdcHistoryModel.belongsTo(PdcChequeModel, {
    foreignKey: 'pdcChequeId',
    as: 'pdcChequeDetails',
});
PdcChequeModel.hasMany(PdcHistoryModel, {
    foreignKey: 'pdcChequeId',
    as: 'detailsOfPdcCheck',
});

export default PdcHistoryModel;
