import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { USER_PAYOUT_TYPE } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import BatchModel from './batchModel';
import InstituteEntityModel from './instituteEntityModel';
import UserPayoutModel from './userPayoutModel';
import { IUserPayoutDetailsModelAttributes, TUserPayoutDetailsModelCreationAttributes } from '@kipipackages/interfaces';

class UserPayoutDetailsModel extends Model<IUserPayoutDetailsModelAttributes, TUserPayoutDetailsModelCreationAttributes> {
    declare id: string;
    declare subjectId: string;
    declare batchId: string;
    declare userPayoutId: string;
    declare amountPerHour?: number;
    declare percentage?: number;
    declare type: USER_PAYOUT_TYPE;
    declare payableAmount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: Date;
    declare readonly updatedAt: Date;
}

UserPayoutDetailsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'subject_id',
        },
        batchId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'batch_id',
        },
        userPayoutId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_payout_id',
        },
        payableAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            field: 'payable_amount',
        },
        amountPerHour: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            field: 'amount_per_hour',
        },
        percentage: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            field: 'percentage',
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(USER_PAYOUT_TYPE),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
    },
    {
        modelName: 'UserPayoutDetailsModel',
        tableName: 'user_payout_details',
        timestamps: true,
        paranoid: true,
        sequelize,
    },
);

UserPayoutDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserPayoutDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserPayoutDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserPayoutDetailsModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

InstituteModel.hasMany(UserPayoutDetailsModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteHasPayoutDetailsList',
});

UserPayoutDetailsModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
    },
    as: 'batch',
});

BatchModel.hasMany(UserPayoutDetailsModel, {
    foreignKey: {
        name: 'batchId',
    },
    as: 'batchHasPayoutDetailsList',
});

UserPayoutDetailsModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
    },
    as: 'subject',
});

InstituteEntityModel.hasMany(UserPayoutDetailsModel, {
    foreignKey: {
        name: 'subjectId',
    },
    as: 'subjectHasPayoutDetailsList',
});

UserPayoutDetailsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'user',
});

UserModel.hasMany(UserPayoutDetailsModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'userHasPayoutDetailsList',
});

UserPayoutDetailsModel.belongsTo(UserPayoutModel, {
    foreignKey: {
        name: 'userPayoutId',
    },
    as: 'userPayout',
});

UserPayoutModel.hasMany(UserPayoutDetailsModel, {
    foreignKey: {
        name: 'userPayoutId',
    },
    as: 'userPayoutDetailsList',
});

export default UserPayoutDetailsModel;
