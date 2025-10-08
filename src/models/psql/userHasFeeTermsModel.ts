import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import AcademicCalendarModel from './academicCalendarModel';
import SchoolFeeCollectionModel from './schoolFeeCollectionModel';
import FeeTypeModel from './feeTypeModel';
import { PAYMENT_TERMS_STATUS } from '../../constants/app';
import BankAccountDetailsModel from './bankAccountDetailsModel';
import { IUserHasFeeTermsModelAttributes, TUserHasFeeTermsModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasFeeTermsModel extends Model<IUserHasFeeTermsModelAttributes, TUserHasFeeTermsModelCreationAttributes> {
    declare id: string;
    declare date?: Date;
    declare startDate: Date;
    declare endDate: Date;
    declare paidAmount: number;
    declare amount: number;
    declare status: PAYMENT_TERMS_STATUS;
    declare instituteId: string;
    declare userId: string;
    declare feeCollectionId: string;
    declare bankAccountId: string;
    declare feeTypeId: string;
    declare stdId: string;
    declare academicCalendarId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

UserHasFeeTermsModel.init(
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_date',
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'end_date',
        },
        paidAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            field: 'paid_amount',
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PAYMENT_TERMS_STATUS)),
            defaultValue: PAYMENT_TERMS_STATUS.DUE,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
        bankAccountId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'bank_account_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        feeCollectionId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'fee_collection_id',
        },
        feeTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'fee_type_id',
        },
        stdId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'std_id',
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'academic_calendar_id',
        },
    },
    {
        modelName: 'UserHasFeeTermsModel',
        tableName: 'user_has_fee_terms',
        sequelize,
    },
);

UserHasFeeTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'feeTermUser',
});
UserModel.hasMany(UserHasFeeTermsModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userHasFeeTerm',
});

UserHasFeeTermsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'feeTermInstitute',
});
InstituteModel.hasMany(UserHasFeeTermsModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteHasFeeTerm',
});
UserHasFeeTermsModel.belongsTo(BankAccountDetailsModel, {
    foreignKey: {
        name: 'bankAccountId',
        field: 'bank_account_id',
    },
    as: 'feeTermAccount',
});
BankAccountDetailsModel.hasMany(UserHasFeeTermsModel, {
    foreignKey: {
        name: 'bankAccountId',
        field: 'bank_account_id',
    },
    as: 'accountHasFeeTerm',
});

UserHasFeeTermsModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'feeTermCollection',
});
// SchoolFeeCollectionModel.belongsTo(UserHasFeeTermsModel, {
//     foreignKey: {
//         name: 'feeCollectionId',
//         field: 'fee_collection_id',
//     },
//     as: 'collectionHasFeeTerm',
// });

UserHasFeeTermsModel.belongsTo(FeeTypeModel, {
    foreignKey: {
        name: 'feeTypeId',
        field: 'fee_type_id',
    },
    as: 'feeTermType',
});
// FeeTypeModel.belongsTo(UserHasFeeTermsModel, {
//     foreignKey: {
//         name: 'feeTypeId',
//         field: 'fee_type_id',
//     },
//     as: 'typeHasFeeTerm',
// });

UserHasFeeTermsModel.belongsTo(AcademicCalendarModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
    },
    as: 'feeTermAcademicCalendar',
});
// AcademicCalendarModel.belongsTo(UserHasFeeTermsModel, {
//     foreignKey: {
//         name: 'academicCalendarId',
//         field: 'academic_calendar_id',
//     },
//     as: 'academicCalendarHasFeeTerm',
// });

UserHasFeeTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        field: 'created_by',
        allowNull: true,
    },
    as: 'createdByUser',
});
UserHasFeeTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        field: 'updated_by',
        allowNull: true,
    },
    as: 'updatedByUser',
});
UserHasFeeTermsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        field: 'deleted_by',
        allowNull: true,
    },
    as: 'deletedByUser',
});

export default UserHasFeeTermsModel;
