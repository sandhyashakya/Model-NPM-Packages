import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE, COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import RoleModel from './roleModel';
import { IFeatureActionAttributes, TFeatureActionCreationAttributes } from '@kipipackages/interfaces';

class FeatureActionModel extends Model<IFeatureActionAttributes, TFeatureActionCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare isDefault: boolean;
    declare roleId: string;
    declare appType: APP_TYPE;
    declare moduleId: string;
    declare featureId: string;
    declare code: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

FeatureActionModel.init(
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
        featureId: {
            type: DataTypes.UUID,
            field: 'feature_id',
            allowNull: false,
        },
    },
    {
        modelName: 'FeatureActionModel',
        tableName: 'feature_actions',
        timestamps: true,
        sequelize,
    },
);

FeatureActionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeatureActionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeatureActionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

FeatureActionModel.belongsTo(RoleModel, {
    foreignKey: {
        name: 'roleId',
        field: 'roleId',
    },
    as: 'role',
});

export default FeatureActionModel;
