import { DataTypes, Model } from 'sequelize';
import InstituteEntityModel from './instituteEntityModel';
import { COMMAN_STATUS } from '../../constants/app';
import { sequelize } from './index';
import UserModel from './userModel';
import { IEntityGroupModelAttributes, TEntityGroupModelCreationAttributes } from '@kipipackages/interfaces';

class EntityGroupModel extends Model<IEntityGroupModelAttributes, TEntityGroupModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare isDefault: boolean;
    declare standardId: string;
    declare instituteId: string;
    declare entityIds: string[];
    declare status: COMMAN_STATUS;
    declare selectionCount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: string;
}
EntityGroupModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        standardId: {
            type: DataTypes.UUID,
            field: 'standard_id',
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        entityIds: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'entity_ids',
            allowNull: true,
        },
        selectionCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'EntityGroupModel',
        tableName: 'entity_group',
        timestamps: true,
        sequelize,
    },
);

EntityGroupModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

EntityGroupModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

EntityGroupModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

EntityGroupModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'standardId',
        allowNull: true,
        field: 'standard_id',
    },
    as: 'standardEntityGroup',
});

InstituteEntityModel.hasMany(EntityGroupModel, {
    foreignKey: {
        name: 'standardId',
        allowNull: true,
        field: 'standard_id',
    },
    as: 'entityGroupStandard',
});

export default EntityGroupModel;
