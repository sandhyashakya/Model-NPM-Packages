import { DataTypes, Model } from 'sequelize';
import { COMMAN_STATUS } from '../../constants/app';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import CityModel from './cityModel';
import StateModel from './stateModel';
import CountryModel from './countryModel';
import { IVendorModelAttributes, TVendorCreationAttributes } from '@kipipackages/interfaces';

class VendorManagementModel extends Model<IVendorModelAttributes, TVendorCreationAttributes> {
    declare status: COMMAN_STATUS;
    declare name: string;
    declare mobile1: string;
    declare mobile2: string;
    declare email: string;
    declare gstNo: string;
    declare address1: string;
    declare address2: string;
    declare pinCode: string;
    declare area: string;
    declare cityId: string;
    declare stateId: string;
    declare countryId: string;
    declare id: string;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
VendorManagementModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile1: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        mobile2: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        gstNo: {
            type: DataTypes.STRING,
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
        area: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'city_id',
        },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'state_id',
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'country_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
    },
    {
        modelName: 'VendorManagement',
        tableName: 'vendor_management',
        timestamps: true,
        sequelize,
    },
);

VendorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

VendorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

VendorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

VendorManagementModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'instituteVendor',
});

InstituteModel.hasMany(VendorManagementModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'vendorInstitute',
});

VendorManagementModel.belongsTo(CityModel, {
    foreignKey: {
        name: 'cityId',
        allowNull: true,
        field: 'city_id',
    },
    as: 'cityDetails',
});

CityModel.hasMany(VendorManagementModel, {
    foreignKey: {
        name: 'cityId',
        allowNull: true,
        field: 'city_id',
    },
    as: 'detailsOfCity',
});

VendorManagementModel.belongsTo(StateModel, {
    foreignKey: {
        name: 'stateId',
        allowNull: true,
        field: 'state_id',
    },
    as: 'stateDetails',
});

StateModel.hasMany(VendorManagementModel, {
    foreignKey: {
        name: 'stateId',
        allowNull: true,
        field: 'state_id',
    },
    as: 'detailsOfState',
});

VendorManagementModel.belongsTo(CountryModel, {
    foreignKey: {
        name: 'countryId',
        allowNull: true,
        field: 'country_id',
    },
    as: 'countryDetails',
});

CountryModel.hasMany(VendorManagementModel, {
    foreignKey: {
        name: 'countryId',
        allowNull: true,
        field: 'country_id',
    },
    as: 'detailsOfCountry',
});

export default VendorManagementModel;
