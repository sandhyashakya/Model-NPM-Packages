import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import FeeTypeModel from './feeTypeModel';
import SchoolFeeCollectionModel from './schoolFeeCollectionModel';
import UserFeeTypeByAccountModel from './userFeeTypeByAccountModel';
import { IUserFeeTypeModelAttributes, TUserFeeTypeModelCreationAttributes } from '@kipipackages/interfaces';

class UserFeeTypeModel extends Model<IUserFeeTypeModelAttributes, TUserFeeTypeModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare feeCollectionId: string;
    declare feeTypeId: string;
    declare status: COMMAN_STATUS;
    declare amount: number;
    declare discount: number;
    declare paidFee: number;
    declare grNumber: string;
    declare rollNumber: string;
    declare feeCollectionAccountId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserFeeTypeModel.init(
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
        feeCollectionId: {
            type: DataTypes.UUID,
            field: 'fee_collection_id',
            allowNull: false,
        },
        feeTypeId: {
            type: DataTypes.UUID,
            field: 'fee_type_id',
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paidFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rollNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feeCollectionAccountId: {
            type: DataTypes.UUID,
            field: 'fee_collection_account_id',
            allowNull: false,
        },
    },
    {
        modelName: 'UserFeeTypeModel',
        tableName: 'user_fee_types',
        timestamps: true,
        sequelize,
    },
);

UserFeeTypeModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'userFeeTypeInstitute',
});
InstituteModel.hasMany(UserFeeTypeModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteUserFeeType',
});
UserFeeTypeModel.belongsTo(FeeTypeModel, {
    foreignKey: {
        name: 'feeTypeId',
        field: 'fee_type_id',
    },
    as: 'userFeeTypeType',
});
FeeTypeModel.hasMany(UserFeeTypeModel, {
    foreignKey: {
        name: 'feeTypeId',
        field: 'fee_type_id',
    },
    as: 'TypeHasUserFeeType',
});
UserFeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userFeeTypeUser',
});
UserModel.hasMany(UserFeeTypeModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userHasUserFeeType',
});
UserFeeTypeModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'userFeeTypeFeeCollection',
});
SchoolFeeCollectionModel.hasMany(UserFeeTypeModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'userUserFeeTypeCollection',
});
UserFeeTypeModel.belongsTo(UserFeeTypeByAccountModel, {
    foreignKey: {
        name: 'feeCollectionAccountId',
        field: 'fee_collection_account_id',
    },
    as: 'userFeeTypeCollection',
});
UserFeeTypeByAccountModel.hasMany(UserFeeTypeModel, {
    foreignKey: {
        name: 'feeCollectionAccountId',
        field: 'fee_collection_account_id',
    },
    as: 'collectionHasUserFeeType',
});
UserFeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});
UserFeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});
UserFeeTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserFeeTypeModel;
