import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
// import { IAccountHasReceiptDetailsInterfaceModelAttributes } from '../../interfaces/accountHasReceiptDetailsInterface';
// import { TAccountHasReceiptDetailsModelCreationAttributes } from '../../types/accountHasReceiptDetailsType';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import FileStorageModel from './fileStorageModel';
import BankAccountDetailsModel from './bankAccountDetailsModel';
import { IAccountHasReceiptDetailsInterfaceModelAttributes, TAccountHasReceiptDetailsModelCreationAttributes } from '@kipipackages/interfaces';

class AccountHasReceiptDetailsModel extends Model<
    IAccountHasReceiptDetailsInterfaceModelAttributes,
    TAccountHasReceiptDetailsModelCreationAttributes
> {
    declare id: string;
    declare bankId: string;
    declare addressLine1: string;
    declare addressLine2: string;
    declare pinCode: string;
    declare city: number;
    declare state: number;
    declare country: number;
    declare mobile: string[];
    declare area: string;
    declare profileImage: string;
    declare name: string;
    declare landline: string;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

AccountHasReceiptDetailsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false,
        },
        landline: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'address_line_1',
        },
        addressLine2: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'address_line_2',
        },
        pinCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'pin_code',
        },
        profileImage: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'profile_image',
        },
        country: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        bankId: {
            type: DataTypes.UUID,
            field: 'bank_id',
            allowNull: false,
        },
    },
    {
        modelName: 'AccountHasReceiptDetailsModel',
        tableName: 'account_has_receipt_details',
        timestamps: true,
        sequelize,
    },
);
AccountHasReceiptDetailsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'receiptInstitute',
});

InstituteModel.hasMany(AccountHasReceiptDetailsModel, { foreignKey: 'instituteId', as: 'instituteHasReceipt' });

AccountHasReceiptDetailsModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'profileImage',
        field: 'profile_image',
    },
    as: 'receiptProfileImage',
});

FileStorageModel.hasMany(AccountHasReceiptDetailsModel, {
    foreignKey: {
        name: 'profileImage',
        field: 'profile_image',
    },
    as: 'profileImageHasReceipt',
});

AccountHasReceiptDetailsModel.belongsTo(BankAccountDetailsModel, {
    foreignKey: {
        name: 'bankId',
        field: 'bank_id',
    },
    as: 'accountHasReceiptBank',
});

BankAccountDetailsModel.hasMany(AccountHasReceiptDetailsModel, {
    foreignKey: {
        name: 'bankId',
        field: 'bank_id',
    },
    as: 'bankHasReceipt',
});

AccountHasReceiptDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

AccountHasReceiptDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

AccountHasReceiptDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default AccountHasReceiptDetailsModel;
