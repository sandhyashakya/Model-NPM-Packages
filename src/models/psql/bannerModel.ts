import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { BANNER_TYPE, APP_TYPE, COMMAN_STATUS, USER_TYPES } from '../../constants/app';
import InstituteModel from './instituteModel';
import FileStorageModel from './fileStorageModel';
import UserModel from './userModel';
import { IBannerModelAttributes, TBannerModelCreationAttributes } from '@kipipackages/interfaces';

class BannerModel extends Model<IBannerModelAttributes, TBannerModelCreationAttributes> {
    declare id: string;
    declare title?: string;
    declare subTitle?: string;
    declare description?: string;
    declare type: APP_TYPE;
    declare bannerType: BANNER_TYPE;
    declare userType?: USER_TYPES;
    declare status: COMMAN_STATUS;
    declare fileStorageId: string;
    declare instituteId: string;
    declare fileUrl?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

BannerModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        subTitle: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        fileUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(APP_TYPE),
            allowNull: false,
            defaultValue: APP_TYPE.INSTITUTE_APP,
        },
        userType: {
            type: DataTypes.ENUM,
            field: 'user_type',
            values: Object.values(USER_TYPES),
            defaultValue: null,
            allowNull: true,
        },
        bannerType: {
            type: DataTypes.ENUM,
            values: Object.values(BANNER_TYPE),
            allowNull: false,
            defaultValue: BANNER_TYPE.BANNER_IMAGE,
        },
        fileStorageId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.INACTIVE,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        modelName: 'BannerModel',
        tableName: 'banners',
        timestamps: true,
        sequelize,
    },
);
BannerModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'bannerInstitute',
});

BannerModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'fileStorageId',
        field: 'file_storage_id',
    },
    as: 'bannerFileStorage',
});
InstituteModel.hasMany(BannerModel, { foreignKey: 'instituteId', as: 'instituteHasBanners' });
FileStorageModel.hasMany(BannerModel, { foreignKey: 'fileStorageId' });

BannerModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

BannerModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

BannerModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default BannerModel;
