import { DataTypes, FindOptions, Model, Op } from 'sequelize';
import { sequelize } from './index';

// import { IAnnouncementModelAttributes } from '../../interfaces/announcementInterface';
// import { TAnnouncementModelCreationAttributes } from '../../types/announcementType';

import { ANNOUCEMENT_SCHEDULE_TYPE, ANNOUCEMENT_STATUS, USER_TYPES } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import InstituteEntityModel from './instituteEntityModel';
import ApiError from '../../helpers/apiError';
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode';
import { ANNOUCEMENT_ERROR_MESSAGES } from '../../constants/errorMessages';
import BatchModel from './batchModel';
import FileStorageModel from './fileStorageModel';
import { IAnnouncementModelAttributes, TAnnouncementModelCreationAttributes } from '@kipipackages/interfaces';

class AnnouncementModel extends Model<IAnnouncementModelAttributes, TAnnouncementModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare subTitle: string;
    declare description: string;
    declare scheduleType: ANNOUCEMENT_SCHEDULE_TYPE;
    declare subjects: string[];
    declare batches: string[];
    declare userTypes: USER_TYPES[];
    declare scheduleDate: Date;
    declare instituteId: string;
    declare userIds: string[];
    declare status: ANNOUCEMENT_STATUS;
    declare fileStorageId: string;
    declare link: string;
    declare entityIds: string[];

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

AnnouncementModel.init(
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
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        scheduleType: {
            type: DataTypes.ENUM,
            values: Object.values(ANNOUCEMENT_SCHEDULE_TYPE),
            allowNull: false,
        },
        subjects: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: [],
            allowNull: false,
        },
        batches: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: [],
            allowNull: false,
        },
        userTypes: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(USER_TYPES))),
            defaultValue: [],
            allowNull: true,
        },
        scheduleDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        userIds: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            field: 'user_ids',
            defaultValue: [],
            allowNull: true,
        },
        fileStorageId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(ANNOUCEMENT_STATUS),
            allowNull: false,
            defaultValue: ANNOUCEMENT_STATUS.PENDING,
        },
        entityIds: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            field: 'entity_ids',
            defaultValue: [],
            allowNull: false,
        },
    },
    {
        modelName: 'AnnouncementModel',
        tableName: 'announcementes',
        timestamps: true,
        sequelize,
    },
);

AnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

AnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

AnnouncementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

AnnouncementModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

InstituteModel.hasMany(AnnouncementModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteHasAnnouncementList',
});

AnnouncementModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'fileStorageId',
    },
    as: 'announcementFileStorage',
});
FileStorageModel.hasMany(AnnouncementModel, { foreignKey: 'fileStorageId', as: 'announcementHasFileList' });

AnnouncementModel.beforeCreate(async announcement => {
    if (announcement.subjects && announcement.subjects.length) {
        const where = { id: { [Op.in]: announcement.subjects } };
        const options: FindOptions = { include: { association: 'entityType', where: { sequence: 'LAST' } }, raw: false };
        const entityListCount = await InstituteEntityModel.count({ where, ...options });

        if (entityListCount !== announcement.subjects.length) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, ANNOUCEMENT_ERROR_MESSAGES.INVALID_SUBJECTS);
        }
    }

    if (announcement.batches && announcement.batches.length) {
        const where = { id: { [Op.in]: announcement.batches } };
        const batchCount = await BatchModel.count({ where });

        if (batchCount !== announcement.batches.length) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, ANNOUCEMENT_ERROR_MESSAGES.INVALID_BATCHES);
        }
    }

    if (announcement.userIds && announcement.userIds.length) {
        const where = { id: { [Op.in]: announcement.userIds } };
        const userCount = await UserModel.count({ where });

        if (userCount !== announcement.userIds.length) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, ANNOUCEMENT_ERROR_MESSAGES.INVALID_USERS);
        }
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
AnnouncementModel.beforeBulkUpdate(async (options: any) => {
    const { attributes } = options;

    if (attributes.subjects && attributes.subjects.length) {
        const where = { id: { [Op.in]: attributes.subjects } };
        const entityList = await InstituteEntityModel.findAll({
            where,
            include: {
                association: 'entityType',
                where: { sequene: 'LAST' },
            },
            raw: false, // Ensure you get Sequelize instances
        });

        if (entityList.length !== attributes.subjects.length) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, ANNOUCEMENT_ERROR_MESSAGES.INVALID_SUBJECTS);
        }
    }

    if (attributes.batches && attributes.batches.length) {
        const where = { id: { [Op.in]: attributes.batches } };
        const batchCount = await BatchModel.count({ where });

        if (batchCount !== attributes.batches.length) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, ANNOUCEMENT_ERROR_MESSAGES.INVALID_BATCHES);
        }
    }
});

export default AnnouncementModel;
