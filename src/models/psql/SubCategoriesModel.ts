import { DataTypes, Model } from 'sequelize';
import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import { sequelize } from './index';
import UserModel from './userModel';
import CategoriesModel from './categoriesModel';
import { ISubCategoriesModelAttributes, TSubCategoriesModelCreationAttributes } from '@kipipackages/interfaces';

class SubCategoriesModel extends Model<ISubCategoriesModelAttributes, TSubCategoriesModelCreationAttributes> {
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
SubCategoriesModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.UUID,
            field: 'category_id',
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'SubCategoriesModel',
        tableName: 'sub_categories',
        timestamps: true,
        sequelize,
    },
);

SubCategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SubCategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SubCategoriesModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

SubCategoriesModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'instituteSubCategory',
});

InstituteModel.hasMany(SubCategoriesModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'categoriesInstitute',
});
SubCategoriesModel.belongsTo(CategoriesModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: true,
    },
    as: 'categories',
});

CategoriesModel.hasMany(SubCategoriesModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: true,
    },
    as: 'subCategoryOfCategory',
});

export default SubCategoriesModel;
