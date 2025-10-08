import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import CityModel from './cityModel';
import { IAreaModelAttributes, TAeraModelCreationAttributes } from '@kipipackages/interfaces';

class AreaModel extends Model<IAreaModelAttributes, TAeraModelCreationAttributes> {
    declare id: string;
    declare area: string;
    declare city: number;
}

AreaModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'AreaModel',
        tableName: 'areas',
        timestamps: true,
        sequelize,
    },
);

AreaModel.belongsTo(CityModel, {
    foreignKey: 'city',
    as: 'cityArea',
});
CityModel.hasMany(AreaModel, {
    foreignKey: 'city',
    as: 'AreasHasCity',
});

export default AreaModel;
