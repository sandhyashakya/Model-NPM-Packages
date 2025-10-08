import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import BatchModel from './batchModel';
import { IUserHasRollNumberModelAttributes, TUserHasRoleCreationAttributes } from '@kipipackages/interfaces';

class UserHasRollNumberModel extends Model<IUserHasRollNumberModelAttributes, TUserHasRoleCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare batchId: string;
    declare rollNumber: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasRollNumberModel.init(
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
        batchId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        rollNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasRollNumberModel',
        tableName: 'user_has_roll_number',
        timestamps: true,
        sequelize,
    },
);

UserHasRollNumberModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'rollNumberHasInstitute',
});

InstituteModel.hasMany(UserHasRollNumberModel, { foreignKey: 'instituteId', as: 'instituteHasRollNumber' });

UserHasRollNumberModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'rollNumberHasBatch',
});

BatchModel.hasMany(UserHasRollNumberModel, { foreignKey: 'batchId', as: 'batchHasRollNumber' });

UserHasRollNumberModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasRollNumberModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasRollNumberModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasRollNumberModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userRollNumber',
});

UserModel.hasMany(UserHasRollNumberModel, { foreignKey: 'userId', as: 'rollNumberHasUser' });

export default UserHasRollNumberModel;
