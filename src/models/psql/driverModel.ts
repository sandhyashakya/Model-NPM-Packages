import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE, COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INSTITUTE_ERROR_MESSAGES } from '../../constants/errorMessages';
import CountryModel from './countryModel';
import StateModel from './stateModel';
import CityModel from './cityModel';
import FileStorageModel from './fileStorageModel';
import { IDriverModelAttributes, TDriverModelCreationAttributes } from '@kipipackages/interfaces';


class DriverModel extends Model<IDriverModelAttributes, TDriverModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare firstName: string;
    declare lastName: string;
    declare address1: string;
    declare address2?: string;
    declare pinCode: string;
    declare city: number;
    declare state: number;
    declare country: number;
    declare area: string;
    declare aadharCardNumber: string;
    declare aadharCard: string;
    declare drivingLicenseNumber: string;
    declare drivingLicense: string;
    declare appType?: APP_TYPE;
    declare status: COMMAN_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

DriverModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(25),
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING(25),
            allowNull: false,
            field: 'last_name',
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pinCode: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'pin_code',
        },
        country: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aadharCardNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aadharCard: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        drivingLicenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drivingLicense: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        appType: {
            type: DataTypes.ENUM,
            values: Object.values(APP_TYPE),
            allowNull: true,
            field: 'app_type',
            // defaultValue: APP_TYPE.SCHOOL_APP,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'DriverModel',
        tableName: 'drivers',
        timestamps: true,
        sequelize,
    },
);

// Associations
DriverModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

DriverModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

DriverModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

DriverModel.belongsTo(CountryModel, { foreignKey: 'country', as: 'countryDetails' });
DriverModel.belongsTo(StateModel, { foreignKey: 'state', as: 'stateDetails' });
DriverModel.belongsTo(CityModel, { foreignKey: 'city', as: 'cityDetails' });

DriverModel.belongsTo(FileStorageModel, { foreignKey: 'drivingLicense', as: 'drivingLicenseDetails' });
DriverModel.belongsTo(FileStorageModel, { foreignKey: 'aadharCard', as: 'aadharCardDetails' });

DriverModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'driverInstitute',
});

InstituteModel.hasMany(DriverModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasDrivers',
});

const beforeCreateOrUpdateHook = async (driver: DriverModel) => {
    if (driver.instituteId) {
        const institute = await InstituteModel.findByPk(driver.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
};

DriverModel.beforeCreate(beforeCreateOrUpdateHook);

DriverModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

export default DriverModel;
