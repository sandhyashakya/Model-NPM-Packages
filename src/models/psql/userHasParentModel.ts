import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { USER_HAS_PARENT_STATUS } from '../../constants/app';
import UserModel from './userModel';
import { IUserHasParentAttributes, TUserHasParentCreationAttributes } from '@kipipackages/interfaces';

class UserHasParentModel extends Model<IUserHasParentAttributes, TUserHasParentCreationAttributes> {
    declare id: string;
    declare status: USER_HAS_PARENT_STATUS;
    declare userId: string;
    declare parentId: string;
    declare instituteAccess: string[];
    declare unverifiedInstitute: string[];
    declare isPrimaryParent: boolean;
    declare isGuardianParent: boolean;
    declare isDeleted: boolean;
    declare securityCode: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasParentModel.init(
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
            defaultValue: USER_HAS_PARENT_STATUS.PENDING,
        },
        securityCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentId: {
            type: DataTypes.UUID,
            field: 'parent_id',
            allowNull: false,
        },
        instituteAccess: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'institute_access',
            defaultValue: [],
            allowNull: true,
        },
        unverifiedInstitute: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'unverified_institute',
            defaultValue: [],
            allowNull: true,
        },
        isPrimaryParent: {
            type: DataTypes.BOOLEAN,
            field: 'is_primary_parent',
            allowNull: false,
            defaultValue: false,
        },
        isGuardianParent: {
            type: DataTypes.BOOLEAN,
            field: 'is_guardian_parent',
            allowNull: false,
            defaultValue: false,
        },

        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'is_deleted',
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        modelName: 'UserHasParentModel',
        tableName: 'user_has_parents',
        timestamps: true,
        sequelize,
    },
);

UserModel.hasMany(UserHasParentModel, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'userId',
    },
    as: 'parents',
});

UserModel.hasMany(UserHasParentModel, {
    foreignKey: {
        name: 'parentId',
        allowNull: false,
        field: 'parentId',
    },
    as: 'users',
});

UserHasParentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'parentId',
        allowNull: false,
        field: 'parent_id',
    },
    as: 'parent',
});

UserHasParentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'user_id',
    },
    as: 'user',
});

UserHasParentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasParentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasParentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasParentModel.addHook('beforeFind', options => {
    if (!Object.prototype.hasOwnProperty.call(options.where, 'isDeleted')) {
        options.where = { ...options.where, isDeleted: false };
    }
});

export default UserHasParentModel;
