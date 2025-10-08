import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { ICountryAttributes } from '@kipipackages/interfaces';

class CountryModel extends Model<ICountryAttributes> implements ICountryAttributes {
    declare id: number;
    declare countryCode: string;
    declare name: string;
    declare phoneCode: number;
    declare currency: string;
    declare isActive: boolean;

    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

CountryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
        phoneCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'phone_code',
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'CountryModel',
        tableName: 'countries',
        timestamps: true,
    },
);

export default CountryModel;
