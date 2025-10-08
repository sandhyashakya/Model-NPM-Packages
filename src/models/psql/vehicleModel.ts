import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import FileStorageModel from './fileStorageModel';
import { IVehicleModelAttributes, TVehicleModelCreationAttributes } from '@kipipackages/interfaces';

class VehicleModel extends Model<IVehicleModelAttributes, TVehicleModelCreationAttributes> implements IVehicleModelAttributes {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare number: string;
    declare capacity: number;
    declare rcBookFileId: string;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

VehicleModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rcBookFileId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'rc_book_file_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
    },
    {
        modelName: 'VehicleModel',
        tableName: 'vehicles',
        timestamps: true,
        indexes: [
            {
                name: 'vehicle_unique_number',
                unique: true,
                fields: ['number', 'institute_id'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
        sequelize,
    },
);

VehicleModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'vehicleInstitute',
});

InstituteModel.hasMany(VehicleModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteVehicleList',
});

VehicleModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'rcBookFileId',
        field: 'rc_book_file_id',
    },
    as: 'vehicleRcBookFile',
});

// Associations
VehicleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

VehicleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

VehicleModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default VehicleModel;
