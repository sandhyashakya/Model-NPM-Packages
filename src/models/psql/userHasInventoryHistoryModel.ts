import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import InventoryModel from './inventoryModel';
import { USER_INVENTORY_ACTION } from '../../constants/app';
import { IUserHasInventoryHistoryModelAttributes, TUserHasInventoryHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasInventoryHistoryModel extends Model<IUserHasInventoryHistoryModelAttributes, TUserHasInventoryHistoryModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare totalReturnQuantity: number;
    declare inventoryId: string;
    declare returnQuantity?: number;
    declare returnDate?: Date | null;
    declare returnDamageQuantity?: number;
    declare assignQuantity?: number;
    declare returnLostQuantity?: number;
    declare penalty?: number;
    declare returnNote?: string;
    declare instituteId: string;
    declare action: USER_INVENTORY_ACTION;
    declare parentId: string;
    declare remainingQuantity: number;
    declare totalQuantity: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: string;
}

UserHasInventoryHistoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        totalReturnQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inventoryId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        returnQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        assignQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        totalQuantity: {
            type: DataTypes.INTEGER,
            field: 'total_quantity',
            allowNull: true,
            defaultValue: 0,
        },
        remainingQuantity: {
            type: DataTypes.INTEGER,
            field: 'remaining_quantity',
            allowNull: true,
            defaultValue: 0,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        returnDamageQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        action: {
            type: DataTypes.ENUM,
            values: Object.values(USER_INVENTORY_ACTION),
            allowNull: false,
        },
        returnLostQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        penalty: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        returnNote: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasInventoryHistoryModel',
        tableName: 'user_has_inventory_history',
        timestamps: true,
        sequelize,
    },
);

// Associations

UserHasInventoryHistoryModel.belongsTo(InventoryModel, {
    foreignKey: {
        name: 'inventoryId',
        field: 'inventory_id',
    },
    as: 'inventory',
});
InventoryModel.hasMany(UserHasInventoryHistoryModel, { foreignKey: 'inventoryId', as: 'historyInventory' });

UserHasInventoryHistoryModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'inventoryInstitute',
});
InstituteModel.hasMany(UserHasInventoryHistoryModel, { foreignKey: 'instituteId', as: 'historyHasInstitute' });

UserHasInventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'inventoryUser',
});
UserModel.hasMany(UserHasInventoryHistoryModel, { foreignKey: 'userId' });

UserHasInventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasInventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasInventoryHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasInventoryHistoryModel;
