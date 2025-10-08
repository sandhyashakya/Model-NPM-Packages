import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import CountryModel from './countryModel';
import StateModel from './stateModel';
import CityModel from './cityModel';
import { IPincodeAttributes } from '@kipipackages/interfaces';

class PincodeModel extends Model<IPincodeAttributes> implements IPincodeAttributes {
    declare id: number;
    declare pincode: string;
    declare district: string;
    declare state: string;
    declare countryCode: string;
    declare cityName: string;
    declare latitude: string | null;
    declare longitude: string | null;

    declare countryId: number | null;
    declare stateId: number | null;
    declare cityId: number | null;

    declare isActive: boolean;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

PincodeModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pincode: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        countryCode: {
            type: DataTypes.STRING(10),
            allowNull: true,
            field: 'country_code',
        },
        cityName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'city_name',
        },
        latitude: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'country_id',
        },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'state_id',
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'city_id',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
            allowNull: true,
        },
    },
    {
        modelName: 'PincodeModel',
        tableName: 'pincodes',
        timestamps: true,
        sequelize,
    },
);

PincodeModel.belongsTo(CountryModel, { foreignKey: 'countryId', as: 'country' });
PincodeModel.belongsTo(StateModel, { foreignKey: 'stateId', as: 'stateData' });
PincodeModel.belongsTo(CityModel, { foreignKey: 'cityId', as: 'cityData' });

export default PincodeModel;
