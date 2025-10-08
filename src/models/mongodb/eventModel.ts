import mongoose, { CallbackError, Model, Schema } from 'mongoose';
import { ACADEMIC_CALENDARS_TYPE, COMMAN_STATUS, PLANNER_SYNC_STATUS } from '../../constants/app';
import { BATCH_ERROR_MESSAGES } from '../../constants/errorMessages';
import { IEventHasBatch, IEventModelAttributes } from '@kipipackages/interfaces';
import InstituteEntityModel from '../psql/instituteEntityModel';
import BatchModel from '../psql/batchModel';

const EventHasBatchSchema: Schema<IEventHasBatch> = new Schema<IEventHasBatch>(
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

const eventModelSchema: Schema<IEventModelAttributes> = new Schema<IEventModelAttributes>(
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
            type: [EventHasBatchSchema],
            required: false,
        },
        type: {
            type: String,
            enum: Object.values(ACADEMIC_CALENDARS_TYPE),
            default: ACADEMIC_CALENDARS_TYPE.INSTITUTE,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
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

eventModelSchema.pre('save', async function (next) {
    const event = this as IEventModelAttributes;

    try {
        // If type is BATCH, ensure instituteId and batches exist
        if (event.type === ACADEMIC_CALENDARS_TYPE.BATCH) {
            if (!event.instituteId || !event.batches || event.batches.length === 0) {
                return next(new Error(BATCH_ERROR_MESSAGES.INSTITUTED_BATCHES_REQUIRED));
            }
        }

        for (const batch of event.batches || []) {
            // Validate subjectId if provided
            if (batch.subjectId) {
                const subject = await InstituteEntityModel.findOne({ where: { id: batch.subjectId } });
                if (!subject) {
                    return next(new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED));
                }
            }

            // Validate batchId if provided
            if (batch.batchId) {
                const batchExists = await BatchModel.findOne({ where: {id: batch.batchId }});
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

eventModelSchema.index({ instituteId: 1, status: 1, 'batches.batchId': 1 });
eventModelSchema.index({ instituteId: 1, status: 1, batches: 1 });

const EventModel: Model<IEventModelAttributes> = mongoose.model<IEventModelAttributes>('event', eventModelSchema);
// (async () => {
//     await EventModel.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default EventModel;
