import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import AcademicCalendarModel from './academicCalendarModel';
import SchoolFeeCollectionModel from './schoolFeeCollectionModel';
import BankAccountDetailsModel from './bankAccountDetailsModel';
import { IUserFeeTypeByAccountModelAttributes, TUserFeeTypeByAccountModelCreationAttributes } from '@kipipackages/interfaces';

class UserFeeTypeByAccountModel extends Model<IUserFeeTypeByAccountModelAttributes, TUserFeeTypeByAccountModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare bankAccountId: string;
    declare feeCollectionId: string;
    declare amount: number;
    declare discount: number;
    declare perviousFeeCollectionId: string;
    declare academicCalendarId: string;
    declare paidAmount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserFeeTypeByAccountModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        bankAccountId: {
            type: DataTypes.UUID,
            field: 'bank_account_id',
            allowNull: false,
        },
        feeCollectionId: {
            type: DataTypes.UUID,
            field: 'fee_collection_id',
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        perviousFeeCollectionId: {
            type: DataTypes.UUID,
            field: 'pervious_fee_collection_id',
            allowNull: true,
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            field: 'academic_calendar_id',
            allowNull: false,
        },
        paidAmount: {
            type: DataTypes.INTEGER,
            field: 'paid_amount',
            allowNull: false,
        },
    },
    {
        modelName: 'UserFeeTypeByAccountModel',
        tableName: 'user_fee_type_by_account',
        timestamps: true,
        sequelize,
    },
);

UserFeeTypeByAccountModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});
UserFeeTypeByAccountModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});
UserFeeTypeByAccountModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
UserFeeTypeByAccountModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'userAccountInstituted',
});
InstituteModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'institutedHasUserAccount',
});
UserFeeTypeByAccountModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'accountUser',
});
UserModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userHasAccount',
});
UserFeeTypeByAccountModel.belongsTo(BankAccountDetailsModel, {
    foreignKey: {
        name: 'bankAccountId',
        field: 'bank_account_id',
    },
    as: 'accountBank',
});
BankAccountDetailsModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'bankAccountId',
        field: 'bank_account_id',
    },
    as: 'bankHasAccount',
});
UserFeeTypeByAccountModel.belongsTo(AcademicCalendarModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'accountAcademicCalendar',
});
AcademicCalendarModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'accountHasAcademicCalendar',
});
UserFeeTypeByAccountModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'perviousFeeCollectionId',
        field: 'previous_fee_collection_id',
        allowNull: true,
    },
    as: 'accountPreviousCollection',
});
SchoolFeeCollectionModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'perviousFeeCollectionId',
        field: 'previous_fee_collection_id',
        allowNull: true,
    },
    as: 'previousCollectionHasAccount',
});
UserFeeTypeByAccountModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
        allowNull: true,
    },
    as: 'accountFeeCollection',
});
SchoolFeeCollectionModel.hasMany(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
        allowNull: true,
    },
    as: 'accountHasFeeCollection',
});

export default UserFeeTypeByAccountModel;
