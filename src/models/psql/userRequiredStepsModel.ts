import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';
import UserModel from './userModel';
import { APP_TYPE } from '../../constants/app';
import { IUserRequiredStepsAttributes } from '@kipipackages/interfaces';

class UserRequiredSteps extends Model<IUserRequiredStepsAttributes> implements IUserRequiredStepsAttributes {
    declare id: string;
    declare userId: string;
    declare stepNumber: number;
    declare isCompleted: boolean;
    declare appType: APP_TYPE;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

UserRequiredSteps.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        stepNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'step_number',
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_completed',
        },
        appType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'app_type',
        },
    },
    {
        sequelize,
        tableName: 'user_required_steps',
        modelName: 'UserRequiredSteps',
        timestamps: true,
        underscored: true,
    },
);

UserRequiredSteps.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserRequiredSteps.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});
UserRequiredSteps.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserModel.hasMany(UserRequiredSteps, {
    foreignKey: 'userId',
    as: 'userHasRequiredSteps',
});

UserRequiredSteps.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'requiredStepsUser',
});

export default UserRequiredSteps;
