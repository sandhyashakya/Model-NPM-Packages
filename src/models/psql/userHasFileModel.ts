import { Model, DataTypes } from 'sequelize';
import { COMMAN_STATUS, FILE_TYPE } from '../../constants/app';
import UserModel from './userModel';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import { IUserHasFileModelAttributes } from '@kipipackages/interfaces';

class UserHasFileModel extends Model<IUserHasFileModelAttributes> implements IUserHasFileModelAttributes {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare fileType: FILE_TYPE;
    declare status: COMMAN_STATUS;
    declare fileName: string;
    declare fileStorageId: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: Date;
    declare readonly updatedAt: Date;
}

UserHasFileModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        fileType: {
            type: DataTypes.ENUM(...Object.values(FILE_TYPE)),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(COMMAN_STATUS)),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileStorageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasFileModel',
        tableName: 'user_has_files',
        timestamps: true,
        sequelize,
    },
);

UserHasFileModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'user_id',
    },
    as: 'user',
});

UserHasFileModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'institute',
});

UserModel.hasMany(UserHasFileModel, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'user_id',
    },
    as: 'userFiles',
});

InstituteModel.hasMany(UserHasFileModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'instituteFiles',
});

UserHasFileModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasFileModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasFileModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasFileModel;
