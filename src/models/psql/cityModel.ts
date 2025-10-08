import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import StateModel from './stateModel';
import CountryModel from './countryModel';
import { ICityAttributes } from '@kipipackages/interfaces';

class CityModel extends Model<ICityAttributes> implements ICityAttributes {
    declare id: number;
    declare countryCode: string;
    declare name: string;
    declare stateCode: string;
    declare isActive: boolean;

    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

CityModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        countryCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'country_code',
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        stateCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'state_code',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
        },
    },
    {
        sequelize,
        modelName: 'CityModel',
        tableName: 'cities',
        timestamps: true,
    },
);

CityModel.belongsTo(StateModel, {
    foreignKey: {
        name: 'stateId',
        field: 'state_id',
    },
    as: 'state',
});
CityModel.belongsTo(CountryModel, {
    foreignKey: {
        name: 'countryId',
        field: 'country_id',
    },
    as: 'country',
});

CountryModel.hasMany(CityModel, {
    foreignKey: {
        name: 'countryId',
        field: 'country_id',
    },
    as: 'cities',
});

StateModel.hasMany(CityModel, {
    foreignKey: {
        name: 'stateId',
        field: 'state_id',
    },
    as: 'cities',
});

export default CityModel;
