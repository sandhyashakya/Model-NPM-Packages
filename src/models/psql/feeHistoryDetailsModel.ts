import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { PAYMENT_TYPE } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import SchoolFeeCollectionModel from './schoolFeeCollectionModel';
import UserFeeTypeByAccountModel from './userFeeTypeByAccountModel';
import FeeHistoryModel from './feeHistoryModel';
import FeeTypeModel from './feeTypeModel';
import { IFeeHistoryDetailsModelAttributes, TFeeHistoryDetailsModelCreationAttributes } from '@kipipackages/interfaces';

class FeeHistoryDetailsModel extends Model<IFeeHistoryDetailsModelAttributes, TFeeHistoryDetailsModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare userFeeTypeByAccountId: string;
    declare academicCalendarId: string;
    declare schoolFeeCollectionId: string;
    declare feeHistoryId: string;
    declare userId: string;
    declare feeTypeId: string;
    declare paidFee: number;
    declare upiId: string;
    declare paymentType: PAYMENT_TYPE;
    declare chequeNo: string;
    declare bankName: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

FeeHistoryDetailsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
        userFeeTypeByAccountId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'user_fee_type_by_account_id',
        },
        schoolFeeCollectionId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'school_fee_collection_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'user_id',
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'academic_calendar_id',
        },
        feeHistoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'fee_history_id',
        },
        feeTypeId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'fee_type_id',
        },
        paidFee: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'paid_fee',
        },
        upiId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'upi_id',
        },
        paymentType: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'payment_type',
        },
        chequeNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'cheque_no',
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'bank_name',
        },
    },
    {
        modelName: 'FeeHistoryDetailsModel',
        tableName: 'fee_history_details',
        timestamps: true,
        sequelize,
    },
);

// Associations
FeeHistoryDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeeHistoryDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeeHistoryDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

FeeHistoryDetailsModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'feeHistoryDetailsInstitute',
});

InstituteModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasFeeHistoryDetails',
});

FeeHistoryDetailsModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'feeHistoryDetailsUser',
});

UserModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: 'userId',
    as: 'userHasFeeHistoryDetails',
});

FeeHistoryDetailsModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'schoolFeeCollectionId',
        field: 'school_fee_collection_id',
        allowNull: true,
    },
    as: 'feeHistoryDetailsSchool',
});
SchoolFeeCollectionModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: {
        name: 'schoolFeeCollectionId',
        field: 'school_fee_collection_id',
        allowNull: true,
    },
    as: 'feeHistoryDetailsHasSchool',
});
FeeHistoryDetailsModel.belongsTo(UserFeeTypeByAccountModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'feeHistoryDetailsFeeType',
});
UserFeeTypeByAccountModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: 'userFeeTypeByAccountId',
    as: 'userFeeTypeFeeHistoryDetails',
});
FeeHistoryDetailsModel.belongsTo(FeeHistoryModel, {
    foreignKey: {
        name: 'feeHistoryId',
        field: 'fee_history_id',
        allowNull: true,
    },
    as: 'detailsFeeHistory',
});
FeeHistoryModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: {
        name: 'feeHistoryId',
        field: 'fee_history_id',
        allowNull: true,
    },
    as: 'feeHistoryHasDetails',
});
FeeHistoryDetailsModel.belongsTo(FeeTypeModel, {
    foreignKey: {
        name: 'feeTypeId',
        field: 'fee_type_id',
        allowNull: true,
    },
    as: 'feeHistoryDetailsType',
});
FeeTypeModel.hasMany(FeeHistoryDetailsModel, {
    foreignKey: {
        name: 'feeTypeId',
        field: 'fee_type_id',
        allowNull: true,
    },
    as: 'feeHistoryDetailsHasType',
});

export default FeeHistoryDetailsModel;
