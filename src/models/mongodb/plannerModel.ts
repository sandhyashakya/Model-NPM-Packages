import mongoose, { Model, Schema } from 'mongoose';

// import {
//     IPlannerLectureAttributes,
//     IPlannerLectureContentAttributes,
//     IPlannerModelAttributes,
//     IPlannerTimeSlotAttributes,
// } from '../../interfaces/plannerInterface';
import { USER_CHAPTER_INDEX_STATUS } from '../../constants/app';
import { IPlannerLectureAttributes, IPlannerLectureContentAttributes, IPlannerModelAttributes, IPlannerTimeSlotAttributes } from '@kipipackages/interfaces';

const plannerLectureContentSchema = new Schema<IPlannerLectureContentAttributes>(
    {
        chapterIndexId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(USER_CHAPTER_INDEX_STATUS),
            default: USER_CHAPTER_INDEX_STATUS.NOT_COMPLETED,
            required: false,
        },
    },
    { _id: false },
);

const plannerLectureSchema = new Schema<IPlannerLectureAttributes>(
    {
        lectureId: {
            type: String,
            required: true,
        },
        teacherId: {
            type: String,
            required: false,
        },
        lectureContent: {
            type: [plannerLectureContentSchema],
            default: [],
            required: false,
        },
        subjectIndexId: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const plannerTimeSlotSchema = new Schema<IPlannerTimeSlotAttributes>(
    {
        id: {
            type: String,
            required: false,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    },
    { _id: false },
);

const plannerModelSchema = new Schema<IPlannerModelAttributes>(
    {
        instituteId: {
            type: String,
            required: true,
        },
        academicCalenderId: {
            type: String,
            required: true,
        },
        workingDayId: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        batchId: {
            type: String,
            required: true,
        },
        lectures: {
            type: [plannerLectureSchema],
            default: [],
            required: true,
        },
        freeSlots: {
            type: [plannerTimeSlotSchema],
            default: [],
            required: true,
        },
        events: {
            type: [plannerTimeSlotSchema],
            default: [],
            required: true,
        },
        holidays: {
            type: [plannerTimeSlotSchema],
            default: [],
            required: true,
        },
        exams: {
            type: [plannerTimeSlotSchema],
            default: [],
            required: true,
        },
        lastSyncTime: {
            type: Date,
            default: () => new Date(),
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// plannerModelSchema.index({
//     instituteId: 1,
//     workingDayId: 1,
//     batchId: 1,
//     date: 1,
//     academicCalenderId: 1,
// });

// plannerModelSchema.index({
//     instituteId: 1,
//     date: 1,
//     academicCalenderId: 1,
// });

// plannerModelSchema.index({
//     instituteId: 1,
//     academicCalenderId: 1,
//     'lectures.teacherId': 1,
//     date: 1,
// });

// plannerModelSchema.index({
//     instituteId: 1,
//     academicCalenderId: 1, // optional in some queries, still included for index reuse
//     batchId: 1,
//     date: 1,
// });

plannerModelSchema.index({
    instituteId: 1,
    academicCalenderId: 1,
    batchId: 1,
    'lectures.teacherId': 1,
    workingDayId: 1,
    date: 1,
});

const PlannerModel: Model<IPlannerModelAttributes> = mongoose.model<IPlannerModelAttributes>('Planner', plannerModelSchema);
// (async () => {
//     await PlannerModel.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default PlannerModel;
