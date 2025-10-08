import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { LECTURE_SLOT_DURATION, LECTURE_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import TypeManagementModel from './typeManagementModel';
import WorkingDayModel from './workingDayModel';
import ClassRoomModel from './classRoomModel';
import BatchModel from './batchModel';
import InstituteEntityModel from './instituteEntityModel';
import LectureModel from './lectureModel';
import { ILectureHistoryModelAttributes, TLectureHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class LectureHistoryModel extends Model<ILectureHistoryModelAttributes, TLectureHistoryModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare type: string;
    declare slotDuration: LECTURE_SLOT_DURATION;
    declare subject: string;
    declare startTime: Date;
    declare endTime: Date;
    declare instituteId: string;
    declare classRoomId: string;
    declare primaryUserId: string;
    declare secondaryUserId: string;
    declare workingDayId: string;
    declare batchId: string;
    declare status: LECTURE_STATUS;
    declare checkedInAt: Date;
    declare checkedOutAt: Date;
    declare color: string;
    declare weekNumber: number;
    declare lectureId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

LectureHistoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        slotDuration: {
            type: DataTypes.INTEGER,
            field: 'slot_duration',
            allowNull: true,
        },
        subject: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.DATE,
            field: 'start_time',
            allowNull: true,
        },
        endTime: {
            type: DataTypes.DATE,
            field: 'end_time',
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        classRoomId: {
            type: DataTypes.UUID,
            field: 'class_room_id',
            allowNull: true,
        },
        groupId: {
            type: DataTypes.UUID,
            field: 'group_id',
            allowNull: true,
        },
        primaryUserId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: true,
        },
        secondaryUserId: {
            type: DataTypes.UUID,
            field: 'secondary_user_id',
            allowNull: true,
        },
        workingDayId: {
            type: DataTypes.UUID,
            field: 'working_day_id',
            allowNull: true,
        },
        batchId: {
            type: DataTypes.UUID,
            field: 'batch_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: Object.values(LECTURE_STATUS),
            defaultValue: LECTURE_STATUS.NOT_STARTED,
        },
        checkedInAt: {
            type: DataTypes.DATE,
            field: 'checked_in_at',
            allowNull: true,
        },
        checkedOutAt: {
            type: DataTypes.DATE,
            field: 'checked_out_at',
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lectureId: {
            type: DataTypes.UUID,
            field: 'lecture_id',
            allowNull: true,
        },
        weekNumber: {
            type: DataTypes.INTEGER,
            field: 'week_number',
            allowNull: true,
        },
    },
    {
        modelName: 'LectureHistoryModel',
        tableName: 'lecture_history',
        timestamps: true,
        sequelize,
    },
);

// Associations
LectureHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

LectureHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

LectureHistoryModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

LectureHistoryModel.belongsTo(TypeManagementModel, {
    foreignKey: 'type',
    as: 'lectureHistoryType',
});

LectureHistoryModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'institute',
});

InstituteModel.hasMany(LectureHistoryModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasLectureHistory',
});

LectureHistoryModel.belongsTo(WorkingDayModel, {
    foreignKey: 'workingDayId',
    as: 'workingDay',
});

WorkingDayModel.hasMany(LectureHistoryModel, {
    foreignKey: 'workingDayId',
    as: 'workingDayHasLectureHistory',
});

LectureHistoryModel.belongsTo(UserModel, {
    foreignKey: 'primaryUserId',
    as: 'user',
});

UserModel.hasMany(LectureHistoryModel, {
    foreignKey: 'primaryUserId',
    as: 'userHasLectureHistory',
});

LectureHistoryModel.belongsTo(UserModel, {
    foreignKey: 'secondaryUserId',
    as: 'secondaryUser',
});

UserModel.hasMany(LectureHistoryModel, {
    foreignKey: 'secondaryUserId',
    as: 'secondaryUserHasLectureHistory',
});

LectureHistoryModel.belongsTo(ClassRoomModel, {
    foreignKey: 'classRoomId',
    as: 'classRoom',
});

ClassRoomModel.hasMany(LectureHistoryModel, {
    foreignKey: 'classRoomId',
    as: 'classRoomHasLectureHistory',
});

LectureHistoryModel.belongsTo(BatchModel, {
    foreignKey: 'batchId',
    as: 'batch',
});

BatchModel.hasMany(LectureHistoryModel, {
    foreignKey: 'batchId',
    as: 'batchHasLectureHistory',
});

LectureHistoryModel.belongsTo(InstituteEntityModel, {
    foreignKey: 'subject',
    as: 'subjectDetails',
});

InstituteEntityModel.hasMany(LectureHistoryModel, {
    foreignKey: 'subject',
    as: 'subjectHasLectureHistory',
});

LectureHistoryModel.belongsTo(LectureModel, {
    foreignKey: {
        name: 'lectureId',
        field: 'lecture_id',
    },
    as: 'lecture',
});

LectureModel.hasMany(LectureHistoryModel, {
    foreignKey: {
        name: 'lectureId',
        field: 'lecture_id',
    },
    as: 'lectureHistoryList',
});

export default LectureHistoryModel;
