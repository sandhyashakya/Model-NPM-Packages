import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE, COMMAN_STATUS, USER_TYPES } from '../../constants/app';
// import { IRoleAttributes } from '../../interfaces/roleInterface';
// import { TRoleCreationAttributes } from '../../types/roleType';
import UserModel from './userModel';
import { IRoleAttributes, TRoleCreationAttributes } from '@kipipackages/interfaces';

class RoleModel extends Model<IRoleAttributes, TRoleCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare isDefault: boolean;
    declare instituteId: string;
    declare isDeleted: boolean;
    declare userType: USER_TYPES;
    declare appType: APP_TYPE;
    declare isInstituteDefault?: boolean;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

RoleModel.init(
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
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_default',
            defaultValue: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_deleted',
            defaultValue: false,
        },
        userType: {
            type: DataTypes.ENUM,
            values: Object.values(USER_TYPES),
            field: 'user_type',
            allowNull: true,
        },
        appType: {
            type: DataTypes.STRING,
            field: 'app_type',
            allowNull: true,
        },
        isInstituteDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_institute_default',
            defaultValue: false,
        },
    },
    {
        modelName: 'RoleModel',
        tableName: 'roles',
        timestamps: true,
        sequelize,
    },
);

RoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

RoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

RoleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

// RoleModel.hasMany(UserModel, {
//     foreignKey: { name: 'roleId', field: 'role_id', allowNull: true },
//     sourceKey: 'id',
//     as: 'users',
// });
// UserModel.belongsTo(RoleModel, {
//     foreignKey: { name: 'roleId', field: 'role_id', allowNull: true },
//     targetKey: 'id',
//     as: 'role',
// });

export default RoleModel;
