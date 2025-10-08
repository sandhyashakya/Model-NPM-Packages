import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE, COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import ModuleFeatureModel from './moduleFeatureModel';
import FeatureActionModel from './featureActionModel';
import RoleModel from './roleModel';
import { IModuleAttributes, TModuleCreationAttributes } from '@kipipackages/interfaces';

class ModuleModel extends Model<IModuleAttributes, TModuleCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare isDefault: boolean;
    declare roleId: string;
    declare code: string;
    declare appType: APP_TYPE;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

ModuleModel.init(
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
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        appType: {
            type: DataTypes.STRING,
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
        roleId: {
            type: DataTypes.UUID,
            field: 'role_id',
            allowNull: true,
        },
    },
    {
        modelName: 'ModuleModel',
        tableName: 'modules',
        timestamps: true,
        sequelize,
    },
);

ModuleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ModuleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ModuleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

ModuleModel.hasMany(ModuleFeatureModel, {
    foreignKey: {
        name: 'moduleId',
        field: 'module_id',
    },
    as: 'features',
});

ModuleModel.hasMany(FeatureActionModel, {
    foreignKey: {
        name: 'moduleId',
        field: 'module_id',
    },
    as: 'actions',
});

ModuleModel.belongsTo(RoleModel, {
    foreignKey: {
        name: 'roleId',
        field: 'roleId',
    },
    as: 'role',
});

export default ModuleModel;
