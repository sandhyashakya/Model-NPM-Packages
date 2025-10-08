import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { USER_PAYOUT_TYPE, USER_TYPES } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import UserPayoutModel from './userPayoutModel';
import { IUserPayoutHistoryModelAttributes, TUserPayoutHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class UserPayoutHistoryModel extends Model<IUserPayoutHistoryModelAttributes, TUserPayoutHistoryModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare userType: USER_TYPES;
    declare instituteId: string;
    declare userPayoutId: string;
    declare paidAmount: number;
    declare payableAmount: number;
    declare overtimeAmount: number;
    declare bonusAmount: number;
    declare payoutDate: Date;
    declare payoutStartTime: Date;
    declare payoutEndTime: Date;
    declare payoutType: USER_PAYOUT_TYPE;
    declare description: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: Date;
    declare readonly updatedAt: Date;
}

UserPayoutHistoryModel.init(
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
            field: 'user_id',
        },
        userType: {
            type: DataTypes.ENUM,
            values: Object.values(USER_TYPES),
            allowNull: false,
            field: 'user_type',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
        userPayoutId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_payout_id',
        },
        paidAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'paid_amount',
        },
        payableAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'payable_amount',
        },
        bonusAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            field: 'bonus_amount',
        },
        overtimeAmount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
            field: 'overtime_amount',
        },
        payoutDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'payout_date',
        },
        payoutStartTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'payout_start_time',
        },
        payoutEndTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'payout_end_time',
        },
        payoutType: {
            type: DataTypes.ENUM,
            values: Object.values(USER_PAYOUT_TYPE),
            allowNull: false,
            field: 'payout_type',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        modelName: 'UserPayoutHistoryModel',
        tableName: 'user_payout_history',
        timestamps: true,
        sequelize,
    },
);

UserPayoutHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserPayoutHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserPayoutHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserPayoutHistoryModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

InstituteModel.hasMany(UserPayoutHistoryModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteHasPayoutHistoryList',
});

UserPayoutHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'user',
});

UserModel.hasMany(UserPayoutHistoryModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'userHasPayoutHistoryList',
});

UserPayoutHistoryModel.belongsTo(UserPayoutModel, {
    foreignKey: {
        name: 'userPayoutId',
    },
    as: 'userPayout',
});

UserPayoutModel.hasMany(UserPayoutHistoryModel, {
    foreignKey: {
        name: 'userPayoutId',
    },
    as: 'userPayoutHistoryList',
});

export default UserPayoutHistoryModel;
