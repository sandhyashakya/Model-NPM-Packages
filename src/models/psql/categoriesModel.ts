import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { ICategoriesModelAttributes, TCategoriesModelCreationAttributes } from '@kipipackages/interfaces';

class CategoriesModel extends Model<ICategoriesModelAttributes, TCategoriesModelCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare instituteId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
CategoriesModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'CategoriesModel',
        tableName: 'categories',
        timestamps: true,
        sequelize,
    },
);

CategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

CategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

CategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

CategoriesModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'institute',
});

InstituteModel.hasMany(CategoriesModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'categories',
});

export default CategoriesModel;
