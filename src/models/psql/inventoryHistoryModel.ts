import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, INVENTORY_TYPE, USER_INVENTORY_ACTION } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import CategoryModel from './categoriesModel';
import InventoryModel from './inventoryModel';
import { IInventoryHistoryModelAttributes, TInventoryHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class InventoryHistoryModel extends Model<IInventoryHistoryModelAttributes, TInventoryHistoryModelCreationAttributes> {
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
    declare inventoryId: string;
    declare action: USER_INVENTORY_ACTION;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

InventoryHistoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
            allowNull: true,
        },
        action: {
            type: DataTypes.ENUM,
            values: Object.values(USER_INVENTORY_ACTION),
            allowNull: true,
        },
        inventoryType: {
            type: DataTypes.ENUM,
            values: Object.values(INVENTORY_TYPE),
            allowNull: true,
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
        inventoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'inventory_id',
        },
    },
    {
        modelName: 'InventoryHistoryModel',
        tableName: 'inventory_history',
        timestamps: true,
        sequelize,
    },
);
InventoryHistoryModel.belongsTo(InventoryModel, {
    foreignKey: {
        name: 'inventoryId',
        allowNull: true,
        field: 'inventory_id',
    },
    as: 'InventoryHistory',
});
InventoryModel.hasMany(InventoryHistoryModel, {
    foreignKey: {
        name: 'inventoryId',
        allowNull: true,
        field: 'inventory_id',
    },
    as: 'historyHasInventory',
});

InventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

InventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

InventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

InventoryHistoryModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'institute',
});

InstituteModel.hasMany(InventoryHistoryModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'inventoryInstitute',
});

InventoryHistoryModel.belongsTo(CategoryModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: false,
    },
    as: 'categoryHistory',
});

CategoryModel.hasMany(InventoryHistoryModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: false,
    },
    as: 'inventoryHistory',
});

export default InventoryHistoryModel;
