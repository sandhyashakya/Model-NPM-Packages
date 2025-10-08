import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import CountryModel from './countryModel';
import { IStateAttributes } from '@kipipackages/interfaces';

class StateModel extends Model<IStateAttributes> implements IStateAttributes {
    declare id: number;
    declare countryCode: string;
    declare name: string;
    declare stateCode: string;
    declare isActive: boolean;

    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

StateModel.init(
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
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
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
        modelName: 'StateModel',
        tableName: 'states',
        timestamps: true,
    },
);

StateModel.belongsTo(CountryModel, {
    foreignKey: {
        name: 'countryId',
        field: 'country_id',
    },
    as: 'country',
});

CountryModel.hasMany(StateModel, {
    foreignKey: {
        name: 'countryId',
        field: 'country_id',
    },
    as: 'states',
});
export default StateModel;
