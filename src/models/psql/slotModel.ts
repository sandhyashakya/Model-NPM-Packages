import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { SCHOOL_SHIFT } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INSTITUTE_ERROR_MESSAGES } from '../../constants/errorMessages';
import { ISlotModelAttributes, TSlotModelCreationAttributes } from '@kipipackages/interfaces';


class SlotModel extends Model<ISlotModelAttributes, TSlotModelCreationAttributes> {
    declare id: string;
    declare name: string;
    declare instituteId: string;
    declare type: SCHOOL_SHIFT;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

SlotModel.init(
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
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(SCHOOL_SHIFT),
        },
    },
    {
        modelName: 'SlotModel',
        tableName: 'slots',
        indexes: [
            {
                name: 'institute_id_name',
                unique: true,
                fields: ['institute_id', 'name', 'type'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
        timestamps: true,
        sequelize,
    },
);

// Associations
SlotModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SlotModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SlotModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

SlotModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'slotInstitute',
});

InstituteModel.hasMany(SlotModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasSlots',
});

const beforeCreateOrUpdateHook = async (slot: SlotModel) => {
    if (slot.instituteId) {
        const institute = await InstituteModel.findByPk(slot.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
};

SlotModel.beforeCreate(beforeCreateOrUpdateHook);

SlotModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

SlotModel.beforeBulkCreate(async instances => {
    for (const instance of instances) {
        await beforeCreateOrUpdateHook(instance);
    }
});

export default SlotModel;
