import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, INVENTORY_TYPE } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import CategoryModel from './categoriesModel';
import { IInventoryModelAttributes, TInventoryModelCreationAttributes } from '@kipipackages/interfaces';

class InventoryModel extends Model<IInventoryModelAttributes, TInventoryModelCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare instituteId: string;
    declare lost?: number;
    declare damage?: number;
    declare totalQuantity: number;
    declare categoryId: string;
    declare remainingQuantity: number;
    declare inventoryType: INVENTORY_TYPE;
    declare note?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

InventoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
            allowNull: false,
        },
        inventoryType: {
            type: DataTypes.ENUM,
            values: Object.values(INVENTORY_TYPE),
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        remainingQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'remaining_quantity',
            defaultValue: 0,
        },
        lost: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        damage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        totalQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.UUID,
            field: 'category_id',
            allowNull: true,
        },
    },
    {
        modelName: 'InventoryModel',
        tableName: 'inventory',
        timestamps: true,
        sequelize,
    },
);

InventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

InventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

InventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

InventoryModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'institute',
});

InstituteModel.hasMany(InventoryModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'inventory',
});

InventoryModel.belongsTo(CategoryModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: false,
    },
    as: 'category',
});

CategoryModel.hasMany(InventoryModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: false,
    },
    as: 'inventory',
});

export default InventoryModel;
