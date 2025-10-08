import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { USER_HAS_ANNOUCEMENT_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import AnnouncementModel from './announcementModel';
import { IUserHasAnnouncementModelAttributes, TUserHasAnnouncementModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasAnnouncementModel extends Model<IUserHasAnnouncementModelAttributes, TUserHasAnnouncementModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare announcementId: string;
    declare instituteId: string;
    declare status: USER_HAS_ANNOUCEMENT_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasAnnouncementModel.init(
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
            allowNull: true,
        },
        announcementId: {
            type: DataTypes.UUID,
            field: 'announcement_id',
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(USER_HAS_ANNOUCEMENT_STATUS),
            allowNull: false,
            defaultValue: USER_HAS_ANNOUCEMENT_STATUS.SENT,
        },
    },
    {
        modelName: 'UserHasAnnouncementModel',
        tableName: 'user_has_announcementes',
        timestamps: true,
        sequelize,
    },
);

UserHasAnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasAnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasAnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasAnnouncementModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

InstituteModel.hasMany(UserHasAnnouncementModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteHasAnnouncementes',
});

UserHasAnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'user',
});

UserModel.hasMany(UserHasAnnouncementModel, {
    foreignKey: {
        name: 'userId',
    },
    as: 'userHasAnnouncementes',
});

UserHasAnnouncementModel.belongsTo(AnnouncementModel, {
    foreignKey: {
        name: 'announcementId',
    },
    as: 'announcement',
});

AnnouncementModel.hasMany(UserHasAnnouncementModel, {
    foreignKey: {
        name: 'announcementId',
    },
    as: 'announcementUserList',
});

export default UserHasAnnouncementModel;
