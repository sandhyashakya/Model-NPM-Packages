import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import BatchModel from './batchModel';
import { HOME_WORK_STATUS } from '../../constants/app';
import HomeWorkModel from './homeWorkModel';
import { IUserHasHomeWorkModelAttributes, TUserHasHomeWorkAttributes } from '@kipipackages/interfaces';

class UserHasHomeWorkModel extends Model<IUserHasHomeWorkModelAttributes, TUserHasHomeWorkAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare homeWorkId: string;
    declare note: string;
    declare status: HOME_WORK_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasHomeWorkModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        homeWorkId: {
            type: DataTypes.UUID,
            field: 'homework_id',
            allowNull: true,
        },
        note: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        studentStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: HOME_WORK_STATUS.NOT_COMPLETED,
        },
        instituteStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: HOME_WORK_STATUS.NOT_COMPLETED,
        },
    },
    {
        modelName: 'UserHasHomeWorkModel',
        tableName: 'user_has_home_work',
        timestamps: true,
        sequelize,
    },
);

UserHasHomeWorkModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'homeWorkHasInstitute',
});

InstituteModel.hasMany(UserHasHomeWorkModel, { foreignKey: 'instituteId', as: 'instituteHasHomeWork' });

UserHasHomeWorkModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'homeWorkHasBatch',
});

BatchModel.hasMany(UserHasHomeWorkModel, { foreignKey: 'batchId', as: 'batchHasHomeWork' });

UserHasHomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasHomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasHomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasHomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userHomeWork',
});

UserModel.hasMany(UserHasHomeWorkModel, { foreignKey: 'userId', as: 'homeWorkHasUser' });
UserHasHomeWorkModel.belongsTo(HomeWorkModel, {
    foreignKey: {
        name: 'homeWorkId',
        field: 'homework_id',
    },
    as: 'homeWork',
});
HomeWorkModel.hasMany(UserHasHomeWorkModel, {
    foreignKey: {
        name: 'homeWorkId',
        field: 'homework_id',
    },
    as: 'homeWorkUsers',
});

export default UserHasHomeWorkModel;
