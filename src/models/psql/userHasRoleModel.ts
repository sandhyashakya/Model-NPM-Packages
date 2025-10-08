import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';

import UserModel from './userModel';
import RoleModel from './roleModel';
import InstituteModel from './instituteModel';
import { IUserHasRoleAttributes, TUserHasRoleCreationAttributes } from '@kipipackages/interfaces';

class UserHasRoleModel extends Model<IUserHasRoleAttributes, TUserHasRoleCreationAttributes> {
    declare id: string;
    declare status: COMMAN_STATUS;
    declare userId: string;
    declare roleId: string;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasRoleModel.init(
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
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        roleId: {
            type: DataTypes.UUID,
            field: 'role_id',
            allowNull: false,
        },

        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
    },
    {
        modelName: 'UserHasRoleModel',
        tableName: 'user_has_roles',
        timestamps: true,
        sequelize,
    },
);

// UserModel.belongsToMany(RoleModel, { foreignKey: 'userId', through: 'UserHasRoleModel' });
// RoleModel.belongsToMany(UserModel, { foreignKey: 'roleId', through: 'UserHasRoleModel' });

UserHasRoleModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'institute',
});

UserHasRoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'user_id',
    },
    as: 'user',
});

UserHasRoleModel.belongsTo(RoleModel, {
    foreignKey: {
        name: 'roleId',
        allowNull: false,
        field: 'role_id',
    },
    as: 'role',
});

UserHasRoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasRoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasRoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default UserHasRoleModel;
