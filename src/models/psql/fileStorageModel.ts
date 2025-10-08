import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { APP_TYPE } from '../../constants/app';
import UserModel from './userModel';
import { IFileStorageAttributes, TFileStorageModelCreationAttributes } from '@kipipackages/interfaces';
class FileStorageModel extends Model<IFileStorageAttributes, TFileStorageModelCreationAttributes> {}

FileStorageModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        originalFileName: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        storageFileName: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        storagePath: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        localPath: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        uploadedFrom: {
            type: DataTypes.ENUM,
            values: Object.values(APP_TYPE),
            allowNull: false,
            // defaultValue: APP_TYPE.INSTITUTE_APP,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        fileSize: {
            type: DataTypes.FLOAT,
            field: 'file_size',
            allowNull: true,
        },
        storageUserId: {
            type: DataTypes.UUID,
            field: 'storage_user_id',
            allowNull: true,
        },
    },
    {
        modelName: 'FileStorageModel',
        tableName: 'file_storage',
        timestamps: true,
        sequelize,
    },
);

FileStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FileStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FileStorageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default FileStorageModel;
