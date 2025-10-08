import mongoose, { CallbackError, Model, Schema } from 'mongoose';
import { ACADEMIC_CALENDARS_TYPE, COMMAN_STATUS, PLANNER_SYNC_STATUS } from '../../constants/app';
import { BATCH_ERROR_MESSAGES } from '../../constants/errorMessages';
import { IHolidayHasBatch, IHolidayModelAttributes } from '@kipipackages/interfaces';
import InstituteEntityModel from '../psql/instituteEntityModel';
import BatchModel from '../psql/batchModel';

const HolidayHasBatchSchema: Schema<IHolidayHasBatch> = new Schema<IHolidayHasBatch>(
    {
        batchId: {
            type: String,
            required: true,
        },
        subjectId: {
            type: String,
            required: false,
        },
        lectureId: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const holidayModelSchema: Schema<IHolidayModelAttributes> = new Schema<IHolidayModelAttributes>(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        // subject: {
        //     type: String,
        //     required: false,
        // },
        batches: {
            type: [HolidayHasBatchSchema],
            required: false,
        },
        type: {
            type: String,
            enum: Object.values(ACADEMIC_CALENDARS_TYPE),
            default: ACADEMIC_CALENDARS_TYPE.INSTITUTE,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.INACTIVE,
            required: true,
        },
        instituteId: {
            type: String,
            required: false,
        },
        typeManagementId: {
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
        createdBy: {
            type: String,
            required: false,
        },
        updatedBy: {
            type: String,
            required: false,
        },
        deletedBy: {
            type: String,
            required: false,
        },
        plannerSyncStatus: {
            type: String,
            default: PLANNER_SYNC_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

holidayModelSchema.pre('save', async function (next) {
    const holiday = this as IHolidayModelAttributes;

    try {
        // If type is BATCH, ensure instituteId and batches exist
        if (holiday.type === ACADEMIC_CALENDARS_TYPE.BATCH) {
            if (!holiday.instituteId || !holiday.batches || holiday.batches.length === 0) {
                return next(new Error(BATCH_ERROR_MESSAGES.INSTITUTED_BATCHES_REQUIRED));
            }
        }

        for (const batch of holiday.batches || []) {
            // Validate subjectId if provided
            if (batch.subjectId) {
                const subject = await InstituteEntityModel.findOne({ where:{ id: batch.subjectId }});
                if (!subject) {
                    return next(new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED));
                }
            }

            // Validate batchId if provided
            if (batch.batchId) {
                const batchExists = await BatchModel.findOne({ where: { id: batch.batchId }});
                if (!batchExists) {
                    return next(new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED));
                }
            }
        }

        next();
    } catch (error: unknown) {
        return next(error as CallbackError);
    }
});

holidayModelSchema.index({ instituteId: 1, status: 1, 'batches.batchId': 1 });
holidayModelSchema.index({ instituteId: 1, status: 1, batches: 1 });

const HolidayModel: Model<IHolidayModelAttributes> = mongoose.model<IHolidayModelAttributes>('holiday', holidayModelSchema);
// (async () => {
//     await HolidayModel.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default HolidayModel;
