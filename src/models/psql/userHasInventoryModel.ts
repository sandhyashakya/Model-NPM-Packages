import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { USER_TYPES, ASSIGN_TYPE, RETURN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import InventoryModel from './inventoryModel';
import { IUserHasInventoryModelAttributes, TUserHasInventoryModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasInventoryModel extends Model<IUserHasInventoryModelAttributes, TUserHasInventoryModelCreationAttributes> {
    declare id: string;
    declare userType: USER_TYPES;
    declare userId: string;
    declare quantity: number;
    declare assignType: ASSIGN_TYPE;
    declare expectedReturnDate?: Date;
    declare inventoryId: string;
    declare subjectId?: string;
    declare returnStatus: RETURN_STATUS;
    declare returnQuantity?: number;
    declare returnDate?: Date;
    declare returnDamageQuantity?: number;
    declare returnLostQuantity?: number;
    declare penalty?: number;
    declare returnNote?: string;
    declare instituteId: string;
    declare totalReturnQuantity: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasInventoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userType: {
            type: DataTypes.ENUM,
            values: Object.values(USER_TYPES),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalReturnQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        assignType: {
            type: DataTypes.ENUM,
            values: Object.values(ASSIGN_TYPE),
            allowNull: false,
        },
        expectedReturnDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        inventoryId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        returnStatus: {
            type: DataTypes.ENUM,
            values: Object.values(RETURN_STATUS),
            allowNull: false,
            defaultValue: RETURN_STATUS.NOT_RETURN,
        },
        returnQuantity: {
            type: DataTypes.INTEGER,
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
    },
    {
        modelName: 'UserHasInventoryModel',
        tableName: 'user_has_inventory',
        timestamps: true,
        sequelize,
    },
);

UserHasInventoryModel.belongsTo(InventoryModel, {
    foreignKey: {
        name: 'inventoryId',
        field: 'inventory_id',
    },
    as: 'inventory',
});
InventoryModel.hasMany(UserHasInventoryModel, { foreignKey: 'inventoryId' });
UserHasInventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'user',
});
UserModel.hasMany(UserHasInventoryModel, { foreignKey: 'userId', as: 'userHasInventory' });

UserHasInventoryModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'inventoryInstitute',
});

InstituteModel.hasMany(UserHasInventoryModel, { foreignKey: 'instituteId' });

UserHasInventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasInventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasInventoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserHasInventoryModel;
