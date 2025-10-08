import { DataTypes, FindOptions, Model, Op, Transaction, UpdateOptions, WhereOptions } from 'sequelize';
import { sequelize } from './index';
import {
    INSTITUTE_ENTITY_TYPE_SEQUENCE,
    LECTURE_STATUS,
    LECTURE_TITLE,
    PLANNER_SYNC_STATUS,
    TYPE_MANAGEMENT_TYPE,
    USER_TYPES,
} from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import TypeManagementModel from './typeManagementModel';
import WorkingDayModel from './workingDayModel';
import ClassRoomModel from './classRoomModel';
import {
    BATCH_ERROR_MESSAGES,
    CLASSROOM_ERROR_MESSAGES,
    INSTITUTE_ENTITY_ERROR_MESSAGES,
    INSTITUTE_ERROR_MESSAGES,
    LECTURE_ERROR_MESSAGES,
    SCHOOL_SHIFT_ERROR_MESSAGES,
    TYPE_MANAGEMENT_ERROR_MESSAGES,
    WORKING_DAYS_ERROR_MESSAGES,
} from '../../constants/errorMessages';
import BatchModel from './batchModel';
import { isTimeWithinRange } from '../../helpers/utils';
import InstituteEntityModel from './instituteEntityModel';
import SlotModel from './slotModel';
import WorkingShiftModel from './workingShiftModel';
import { ILectureModelAttributes, TLectureModelCreationAttributes } from '@kipipackages/interfaces';
import UserHasBatchModel from './userHasBatchModel';
import InstituteEntityTypeModel from './instituteEntityTypeModel';
import UserInstituteMeta from '../mongodb/userInstituteMetaModel';

class LectureModel extends Model<ILectureModelAttributes, TLectureModelCreationAttributes> {
    declare id: string;
    declare title: LECTURE_TITLE;
    declare descriptions: string;

    declare type: string;
    declare slotDuration: number;
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
    declare plannerSyncStatus: PLANNER_SYNC_STATUS;
    declare shiftId: string;
    declare slotId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

LectureModel.init(
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
            defaultValue: LECTURE_TITLE.LECTURE,
        },
        descriptions: {
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
            allowNull: false,
        },
        subject: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.DATE,
            field: 'start_time',
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            field: 'end_time',
            allowNull: false,
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
            field: 'primary_user_id',
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
            allowNull: false,
        },
        batchId: {
            type: DataTypes.UUID,
            field: 'batch_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
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
        plannerSyncStatus: {
            type: DataTypes.STRING,
            field: 'planner_sync_status',
            allowNull: true,
            defaultValue: PLANNER_SYNC_STATUS.PENDING,
        },
        shiftId: {
            type: DataTypes.UUID,
            field: 'shift_id',
            allowNull: true,
        },
        slotId: {
            type: DataTypes.UUID,
            field: 'slot_id',
            allowNull: true,
        },
    },
    {
        modelName: 'LectureModel',
        tableName: 'lectures',
        timestamps: true,
        sequelize,
    },
);

// Associations
LectureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

LectureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

LectureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

LectureModel.belongsTo(TypeManagementModel, {
    foreignKey: 'type',
    as: 'lectureType',
});

LectureModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'institute',
});

InstituteModel.hasMany(LectureModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasLectures',
});

LectureModel.belongsTo(WorkingDayModel, {
    foreignKey: 'workingDayId',
    as: 'workingDay',
});

WorkingDayModel.hasMany(LectureModel, {
    foreignKey: 'workingDayId',
    as: 'workingDayHasLectures',
});

LectureModel.belongsTo(SlotModel, {
    foreignKey: 'slotId',
    as: 'lectureSlot',
});

SlotModel.hasMany(LectureModel, {
    foreignKey: 'slotId',
    as: 'slotLectureList',
});

LectureModel.belongsTo(WorkingShiftModel, {
    foreignKey: 'shiftId',
    as: 'lectureShift',
});

WorkingShiftModel.hasMany(LectureModel, {
    foreignKey: 'shiftId',
    as: 'shiftLectureList',
});

LectureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'primaryUserId',
        field: 'primary_user_id',
        allowNull: true,
    },
    as: 'user',
});

UserModel.hasMany(LectureModel, {
    foreignKey: {
        name: 'primaryUserId',
        field: 'primary_user_id',
        allowNull: true,
    },
    as: 'userHasLectures',
});

LectureModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'secondaryUserId',
        field: 'secondary_user_id',
        allowNull: true,
    },
    as: 'secondaryUser',
});

UserModel.hasMany(LectureModel, {
    foreignKey: {
        name: 'secondaryUserId',
        field: 'secondary_user_id',
        allowNull: true,
    },
    as: 'secondaryUserHasLectures',
});

LectureModel.belongsTo(ClassRoomModel, {
    foreignKey: 'classRoomId',
    as: 'classRoom',
});

ClassRoomModel.hasMany(LectureModel, {
    foreignKey: 'classRoomId',
    as: 'classRoomHasLectures',
});

LectureModel.belongsTo(BatchModel, {
    foreignKey: 'batchId',
    as: 'batch',
});

BatchModel.hasMany(LectureModel, {
    foreignKey: 'batchId',
    as: 'batchHasLectures',
});

LectureModel.belongsTo(InstituteEntityModel, {
    foreignKey: 'subject',
    as: 'subjectDetails',
});

InstituteEntityModel.hasMany(LectureModel, {
    foreignKey: 'subject',
    as: 'subjectHasLectures',
});

const beforeCreateOrUpdateHook = async (lecture: LectureModel, transaction: Transaction | null = null) => {
    const options: FindOptions = {};
    if (transaction) options.transaction = transaction;
    if (lecture.instituteId) {
        const institute = await InstituteModel.findByPk(lecture.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }

    if (lecture.workingDayId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let workingDay: any = await WorkingDayModel.findOne({
            where: { id: lecture.workingDayId },
            include: [{ association: 'workingDayShift', required: false, include: [{ association: 'shiftSlot', required: false }] }],
        });
        if (!workingDay) {
            throw new Error(WORKING_DAYS_ERROR_MESSAGES.NOT_FOUND);
        }
        workingDay = JSON.parse(JSON.stringify(workingDay));

        if (lecture.slotId) {
            if (!workingDay.workingDayShift.length) throw new Error(SCHOOL_SHIFT_ERROR_MESSAGES.NOT_FOUND);
            const validShift = workingDay.workingDayShift.find((shift: { id: string; slotId: string }) => shift.slotId === lecture.slotId);
            if (!validShift) {
                throw new Error(LECTURE_ERROR_MESSAGES.INVALID_SLOT_OR_SHIFT);
            }
            validShift.startTime = new Date(validShift.startTime);
            validShift.endTime = new Date(validShift.endTime);

            const isValidStartTime = isTimeWithinRange(lecture.startTime, validShift.startTime, validShift.endTime);
            const isValidEndTime = isTimeWithinRange(lecture.endTime, validShift.startTime, validShift.endTime);
            if (!isValidStartTime || !isValidEndTime) {
                throw new Error(LECTURE_ERROR_MESSAGES.INVALID_LECTURE_TIME);
            }
        } else {
            workingDay.startTime = new Date(workingDay.startTime);
            workingDay.endTime = new Date(workingDay.endTime);

            const isValidStartTime = isTimeWithinRange(lecture.startTime, workingDay.startTime, workingDay.endTime);
            const isValidEndTime = isTimeWithinRange(lecture.endTime, workingDay.startTime, workingDay.endTime);
            if (!isValidStartTime || !isValidEndTime) {
                throw new Error(LECTURE_ERROR_MESSAGES.INVALID_LECTURE_TIME);
            }
        }
    }

    // Validate the classRoomId
    if (lecture.classRoomId) {
        const classRoom = await ClassRoomModel.findByPk(lecture.classRoomId);
        if (!classRoom) {
            throw new Error(CLASSROOM_ERROR_MESSAGES.NOT_FOUND);
        }
    }

    // Validate the primaryUserId
    if (lecture.primaryUserId) {
        if (!lecture.batchId) throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);

        const batchWhere: WhereOptions = {
            batchId: lecture.batchId,
            userId: lecture.primaryUserId,
        };
        if (lecture.subject) batchWhere.subjects = { [Op.overlap]: [lecture.subject] };

        const user = await UserHasBatchModel.findOne({
            where: batchWhere,
            ...options,
            include: [{ association: 'user', where: { type: USER_TYPES.TEACHER } }],
        });
        if (!user) {
            throw new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED);
        }
    }

    // Validate the secondaryUserId
    // if (lecture.secondaryUserId) {
    //     if (!lecture.batchId) throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);

    //     const batchWhere: WhereOptions = {
    //         batchId: lecture.batchId,
    //         userId: lecture.secondaryUserId,
    //     };
    //     if (lecture.subject) batchWhere.subjects = { [Op.overlap]: [lecture.subject] };

    //     const user = await userHasBatchService.findOne(batchWhere, { include: [{ association: 'user', where: { type: USER_TYPES.TEACHER } }] });
    //     if (!user) {
    //         throw new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED);
    //     }
    // }

    if (lecture.workingDayId && lecture.startTime && lecture.endTime) {
        let where: WhereOptions = {
            [Op.or]: [
                {
                    [Op.and]: [{ startTime: { [Op.lte]: lecture.startTime } }, { endTime: { [Op.gt]: lecture.startTime } }],
                },
                {
                    [Op.and]: [{ startTime: { [Op.lt]: lecture.endTime } }, { endTime: { [Op.gte]: lecture.endTime } }],
                },
                {
                    [Op.and]: [{ startTime: { [Op.gte]: lecture.startTime } }, { endTime: { [Op.lte]: lecture.endTime } }],
                },
            ],
            instituteId: lecture.instituteId,
            workingDayId: lecture.workingDayId,
        };
        if (lecture.id) where = { ...where, id: { [Op.ne]: lecture.id } };
        // if (lecture.batchId) where = { ...where, batchId: lecture.batchId };
        // if (lecture.classRoomId) where = { ...where, classRoomId: lecture.classRoomId };

        // const existLecture = await LectureModel.findOne({ where });
        // if (existLecture) throw new Error(LECTURE_ERROR_MESSAGES.DUPLICATE);

        if (lecture.batchId) {
            if (lecture.slotId) where.slotId = lecture.slotId;
            const batchConflict = await LectureModel.findOne({
                where: {
                    ...where,
                    batchId: lecture.batchId,
                },
                ...options,
            });
            if (batchConflict) throw new Error(LECTURE_ERROR_MESSAGES.BATCH_OCCUPIED);
        }
        if (lecture.classRoomId) {
            const classRoomConflict = await LectureModel.findOne({
                where: {
                    ...where,
                    classRoomId: lecture.classRoomId,
                },
                ...options,
            });
            if (classRoomConflict) throw new Error(LECTURE_ERROR_MESSAGES.CLASSROOM_OCCUPIED);
        }
        if (lecture.primaryUserId) {
            const teacherConflict = await LectureModel.findOne({
                where: {
                    ...where,
                    primaryUserId: lecture.primaryUserId,
                },
                ...options,
            });
            if (teacherConflict) throw new Error(LECTURE_ERROR_MESSAGES.TEACHER_OCCUPIED);
        }
        if (lecture.secondaryUserId) {
            const teacherConflict = await LectureModel.findOne({
                where: {
                    ...where,
                    secondaryUserId: lecture.secondaryUserId,
                },
                ...options,
            });
            if (teacherConflict) throw new Error(LECTURE_ERROR_MESSAGES.TEACHER_OCCUPIED);
        }
    }

    // Validate the batchId
    if (lecture.batchId) {
        const batchWhere: WhereOptions = {
            id: lecture.batchId,
        };
        if (lecture.shiftId) batchWhere.shiftId = lecture.shiftId;

        const batch = await BatchModel.findOne({ where: batchWhere, ...options });
        if (!batch) {
            throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);
        }
    }

    // Validate the type
    if (lecture.type) {
        const type = await TypeManagementModel.findOne({ where: { id: lecture.type, type: TYPE_MANAGEMENT_TYPE.LECTURE } });
        if (!type) {
            throw new Error(TYPE_MANAGEMENT_ERROR_MESSAGES.NOT_FOUND);
        }
    }

    // Validate the workingDayId
    if (lecture.subject) {
        const subject = await InstituteEntityTypeModel.findOne({
            where: { id: lecture.subject },
            include: [{ association: 'entityType', where: { sequence: INSTITUTE_ENTITY_TYPE_SEQUENCE.LAST } }],
        });
        if (!subject) {
            throw new Error(INSTITUTE_ENTITY_ERROR_MESSAGES.NOT_FOUND);
        }
        const existSubjectInMeta = await UserInstituteMeta.findOne({ entities: lecture.subject });
        if (!existSubjectInMeta) {
            throw new Error(INSTITUTE_ENTITY_ERROR_MESSAGES.NOT_FOUND);
        }
    }
};

LectureModel.beforeCreate(async (instance, options) => {
    const transaction = options.transaction || null;
    await beforeCreateOrUpdateHook(instance, transaction);
});
LectureModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    const transaction = options.transaction || null;
    await beforeCreateOrUpdateHook(options.attributes, transaction);
});

LectureModel.beforeBulkCreate(async (instances, options) => {
    const transaction = options.transaction || null;
    for (const instance of instances) {
        await beforeCreateOrUpdateHook(instance, transaction);
    }
});

export default LectureModel;
