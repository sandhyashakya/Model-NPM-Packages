import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import { IRulesRegulationAttributes, TRulesRegulationCreationAttributes } from '@kipipackages/interfaces';

class RulesRegilationModel extends Model<IRulesRegulationAttributes, TRulesRegulationCreationAttributes> {
    declare id: string;
    declare title: string;
    declare subTitle: string;
    declare discraption: string;
    declare status: COMMAN_STATUS;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

RulesRegilationModel.init(
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
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        discraption: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subTitle: {
            type: DataTypes.STRING(100),
            field: 'sub_title',
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
    },

    {
        modelName: 'RulesRegilationModel',
        tableName: 'term_and_condition',
        timestamps: true,
        sequelize,
    },
);

RulesRegilationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

RulesRegilationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

RulesRegilationModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default RulesRegilationModel;
