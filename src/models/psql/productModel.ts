import { DataTypes, Model } from 'sequelize';
import { COMMAN_STATUS } from '../../constants/app';
import CategoriesModel from './categoriesModel';
import InstituteModel from './instituteModel';
import { sequelize } from './index';
import UserModel from './userModel';
import SubCategoriesModel from './SubCategoriesModel';
import { IProductModelAttributes, TProductsModelCreationAttributes } from '@kipipackages/interfaces';

class ProductModel extends Model<IProductModelAttributes, TProductsModelCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: COMMAN_STATUS;
    declare instituteId?: string;
    declare categoryId?: string;
    declare subCategoryId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
ProductModel.init(
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
        subCategoryId: {
            type: DataTypes.UUID,
            field: 'sub_category_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'ProductModel',
        tableName: 'products',
        timestamps: true,
        sequelize,
    },
);

ProductModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ProductModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ProductModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

ProductModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'instituteProduct',
});

InstituteModel.hasMany(ProductModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: false,
    },
    as: 'productInstitute',
});
ProductModel.belongsTo(CategoriesModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: true,
    },
    as: 'productCategories',
});

CategoriesModel.hasMany(ProductModel, {
    foreignKey: {
        name: 'categoryId',
        field: 'category_id',
        allowNull: true,
    },
    as: 'productOfCategories',
});

ProductModel.belongsTo(SubCategoriesModel, {
    foreignKey: {
        name: 'subCategoryId',
        field: 'sub_category_id',
        allowNull: true,
    },
    as: 'productSubCategories',
});

SubCategoriesModel.hasMany(ProductModel, {
    foreignKey: {
        name: 'subCategoryId',
        field: 'sub_category_id',
        allowNull: true,
    },
    as: 'productOfSubCategories',
});

export default ProductModel;
