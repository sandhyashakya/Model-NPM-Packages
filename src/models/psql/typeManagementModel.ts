import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';

import { COMMAN_STATUS, TYPE_MANAGEMENT_TYPE } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { INSTITUTE_ERROR_MESSAGES, TYPE_MANAGEMENT_ERROR_MESSAGES } from '../../constants/errorMessages';
import { ITypeManagementModelAttributes,TTypeManagementModelCreationAttributes } from '@kipipackages/interfaces';
// import { ITypeManagementModelAttributes, TTypeManagementModelCreationAttributes } from '@kipipackages/interfaces';


class TypeManagementModel extends Model<ITypeManagementModelAttributes, TTypeManagementModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare instituteId: string;
    declare status?: COMMAN_STATUS;
    declare type: TYPE_MANAGEMENT_TYPE;
    declare isInstituteDefault: boolean;
    declare isDefault: boolean;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

TypeManagementModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isInstituteDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_institute_default',
            defaultValue: false,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_default',
            defaultValue: false,
        },
    },
    {
        modelName: 'TypeManagementModel',
        tableName: 'type_management',
        timestamps: true,
        sequelize,
    },
);

const beforeCreateOrUpdateHook = async (type: TypeManagementModel): Promise<void> => {
    if (type.instituteId) {
        const institute = await InstituteModel.findByPk(type.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
    if (type.title && type.instituteId && type.type) {
        const typeExit = await TypeManagementModel.findOne({ where: { title: type.title, instituteId: type.instituteId, type: type.type } });
        if (typeExit) throw new Error(TYPE_MANAGEMENT_ERROR_MESSAGES.TYPE_ALREADY_EXISTS);
    }
};
TypeManagementModel.beforeCreate(beforeCreateOrUpdateHook);

TypeManagementModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

TypeManagementModel.beforeBulkCreate(async instances => {
    for (const instance of instances) {
        await beforeCreateOrUpdateHook(instance);
    }
});

// TypeManagementModel belongs to InstituteModel
TypeManagementModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'institute',
});

InstituteModel.hasMany(TypeManagementModel, {
    foreignKey: 'instituteId',
    as: 'typeManagements',
});

TypeManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

TypeManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

TypeManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default TypeManagementModel;
