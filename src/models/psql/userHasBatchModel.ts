import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import BatchModel from './batchModel';
import { IUserHasBatchModelAttributes, TUserHasBatchModelCreationAttributes } from '@kipipackages/interfaces';
class UserHasBatchModel extends Model<IUserHasBatchModelAttributes, TUserHasBatchModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare batchId: string;
    declare subjects: string[];

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasBatchModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: false,
        },
        batchId: {
            type: DataTypes.UUID,
            field: 'batch_id',
            allowNull: false,
        },
        subjects: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false,
        },
    },
    {
        modelName: 'UserHasBatchModel',
        tableName: 'user_has_batches',
        timestamps: true,
        sequelize,
    },
);

UserHasBatchModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasBatchModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasBatchModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasBatchModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'user',
});

UserModel.hasMany(UserHasBatchModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userHasBatches',
});

UserHasBatchModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'batch',
});

BatchModel.hasMany(UserHasBatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'userBatches',
});

export default UserHasBatchModel;
