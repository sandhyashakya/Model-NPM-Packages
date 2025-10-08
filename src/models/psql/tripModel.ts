import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { TRIP_TYPE } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import VehicleModel from './vehicleModel';
import { ITripModelAttributes, TTripModelCreationAttributes } from '@kipipackages/interfaces';

class TripModel extends Model<ITripModelAttributes, TTripModelCreationAttributes> {
    declare id: string;
    declare tripType: TRIP_TYPE;
    declare vehicleId: string;
    declare driverId: string;
    declare shiftId: string[];
    declare area: string[];
    declare instituteId: string;
    declare departure: Date;
    declare arrival: Date;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

TripModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        tripType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(TRIP_TYPE),
        },
        vehicleId: {
            type: DataTypes.UUID,
            field: 'vehicle_id',
            allowNull: true,
        },
        driverId: {
            type: DataTypes.UUID,
            field: 'driver_id',
            allowNull: true,
        },
        shiftId: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: [],
            allowNull: true,
        },
        area: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true,
        },
        departure: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrival: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
    },
    {
        modelName: 'TripModel',
        tableName: 'trips',
        timestamps: true,
        sequelize,
    },
);

// Associations
TripModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

TripModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

TripModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

TripModel.belongsTo(VehicleModel, {
    foreignKey: 'vehicleId',
    as: 'tripVehicle',
});
VehicleModel.hasMany(TripModel, {
    foreignKey: 'vehicleId',
    as: 'tripHasVehicle',
});

TripModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'tripInstitute',
});

InstituteModel.hasMany(TripModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasTrips',
});

TripModel.belongsTo(UserModel, {
    foreignKey: 'driverId',
    as: 'driver',
});

UserModel.hasMany(TripModel, {
    foreignKey: 'driverId',
    as: 'tripHasDriver',
});

export default TripModel;
