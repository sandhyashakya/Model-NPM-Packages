import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { INSTITUTE_ENTITY_TYPE_SEQUENCE, INSTITUTE_ENTITY_TYPE_STATUS } from '../../constants/app';
import UserModel from './userModel';
import { IInstituteEntityTypeAttributes, TInstituteEntityTypeCreationAttributes } from '@kipipackages/interfaces';

class InstituteEntityTypeModel extends Model<IInstituteEntityTypeAttributes, TInstituteEntityTypeCreationAttributes> {
    declare id: string;
    declare title: string;
    declare subTitle: string;
    declare status: INSTITUTE_ENTITY_TYPE_STATUS;
    declare svgUrl: string;
    declare sequence: INSTITUTE_ENTITY_TYPE_SEQUENCE;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

InstituteEntityTypeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'sub_title',
        },
        svgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'svg_url',
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: INSTITUTE_ENTITY_TYPE_STATUS.ACTIVE,
            values: Object.values(INSTITUTE_ENTITY_TYPE_STATUS),
        },
        sequence: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: Object.values(INSTITUTE_ENTITY_TYPE_SEQUENCE),
        },
    },
    {
        modelName: 'InstituteEntityTypeModel',
        tableName: 'institute_entity_types',
        timestamps: true,
        sequelize,
    },
);

InstituteEntityTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

InstituteEntityTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

InstituteEntityTypeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default InstituteEntityTypeModel;
