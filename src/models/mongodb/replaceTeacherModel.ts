import mongoose, { Model, Schema } from 'mongoose';
import { COMMAN_STATUS, TEACHER_TYPE, REPLACE_TEACHER_STATUS } from '../../constants/app';
import { IReplaceTeacherBatchesSchema, IReplaceTeacherModelAttributes } from '@kipipackages/interfaces';

const batchesItemSchema: Schema<IReplaceTeacherBatchesSchema> = new Schema<IReplaceTeacherBatchesSchema>(
    {
        userBatchId: { type: String, required: true },
        replaceTeacherBatchId: { type: String, required: true },
        subjectId: { type: String, required: false },
        lectureId: { type: String, required: false },
    },
    { _id: false },
);

const ReplaceTeacherSchema: Schema<IReplaceTeacherModelAttributes> = new Schema<IReplaceTeacherModelAttributes>(
    {
        batches: {
            type: [batchesItemSchema],
            required: true,
            trim: true,
        },
        standardId: {
            type: String,
            required: false,
            trim: true,
        },
        teacherType: {
            type: String,
            enum: Object.values(TEACHER_TYPE),
            required: true,
        },
        replaceTeacherStatus: {
            type: String,
            enum: Object.values(REPLACE_TEACHER_STATUS),
            default: REPLACE_TEACHER_STATUS.PENDING,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
            trim: true,
        },
        endDate: {
            type: Date,
            trim: true,
        },
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        replaceTeacherId: {
            type: String,
            required: true,
            trim: true,
        },
        instituteId: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
            required: true,
        },
        createdBy: {
            type: String,
        },
        updatedBy: {
            type: String,
        },
        deletedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const ReplaceTeacherModel: Model<IReplaceTeacherModelAttributes> = mongoose.model<IReplaceTeacherModelAttributes>(
    'replaceTeachers',
    ReplaceTeacherSchema,
);

export default ReplaceTeacherModel;
