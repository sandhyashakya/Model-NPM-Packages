import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { INSTITUTE_ENTITY_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteEntityTypeModel from './instituteEntityTypeModel';
import InstituteModel from './instituteModel';
import { IInstituteEntityAttributes, TInstituteEntityCreationAttributes } from '@kipipackages/interfaces';

class InstituteEntityModel extends Model<IInstituteEntityAttributes, TInstituteEntityCreationAttributes> {
    declare id: string;
    declare title: string;
    declare subTitle: string;
    declare description: string;
    declare svgUrl: string;
    declare entityTypeId: string;
    declare status: INSTITUTE_ENTITY_STATUS;
    declare entityId: string;
    declare instituteId: string;
    declare isDefault: boolean;
    declare code: string;
    declare sequenceNumber: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

InstituteEntityModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sub_title',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        svgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'svg_url',
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: INSTITUTE_ENTITY_STATUS.ACTIVE,
            values: Object.values(INSTITUTE_ENTITY_STATUS),
        },
        entityTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'entity_type_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_default',
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sequenceNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sequence_number',
        },
    },
    {
        modelName: 'InstituteEntityModel',
        tableName: 'institute_entities',
        timestamps: true,
        sequelize,
    },
);

InstituteEntityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

InstituteEntityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

InstituteEntityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

InstituteEntityModel.hasMany(InstituteEntityModel, {
    foreignKey: {
        name: 'entityId',
        allowNull: true,
        field: 'entity_id',
    },
    as: 'entities',
});

InstituteEntityModel.belongsTo(InstituteEntityTypeModel, {
    foreignKey: {
        name: 'entityTypeId',
        allowNull: false,
        field: 'entity_type_id',
    },
    as: 'entityType',
});

InstituteEntityModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'institute',
});

InstituteModel.hasMany(InstituteEntityModel, {
    foreignKey: {
        name: 'instituteId',
        allowNull: true,
        field: 'institute_id',
    },
    as: 'instituteEntities',
});

export default InstituteEntityModel;
