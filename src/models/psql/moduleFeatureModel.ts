import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE, COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import FeatureActionModel from './featureActionModel';
import RoleModel from './roleModel';
import { IModuleFeatureAttributes, TModuleFeatureCreationAttributes } from '@kipipackages/interfaces';

class ModuleFeatureModel extends Model<IModuleFeatureAttributes, TModuleFeatureCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare isDefault: boolean;
    declare appType: APP_TYPE;
    declare roleId: string;
    declare moduleId: string;
    declare code: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

ModuleFeatureModel.init(
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
        moduleId: {
            type: DataTypes.UUID,
            field: 'module_id',
            allowNull: false,
        },
    },
    {
        modelName: 'ModuleFeatureModel',
        tableName: 'module_features',
        timestamps: true,
        sequelize,
    },
);

ModuleFeatureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ModuleFeatureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ModuleFeatureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

ModuleFeatureModel.hasMany(FeatureActionModel, {
    foreignKey: {
        name: 'featureId',
        field: 'feature_id',
    },
    as: 'actions',
});

ModuleFeatureModel.belongsTo(RoleModel, {
    foreignKey: {
        name: 'roleId',
        field: 'roleId',
    },
    as: 'role',
});

export default ModuleFeatureModel;
