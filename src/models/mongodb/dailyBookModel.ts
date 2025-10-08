import { IDailyBookModelAttributes } from '@kipipackages/interfaces';
import mongoose, { Schema, Model } from 'mongoose';

const DailyBookSchema: Schema<IDailyBookModelAttributes> = new Schema<IDailyBookModelAttributes>(
    {
        userId: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        instituteId: {
            type: String,
            required: false,
        },
        batchId: {
            type: String,
            required: false,
        },
        subjectId: {
            type: String,
            required: false,
        },
        lectureId: {
            type: String,
            required: false,
        },
        subjectIndexId: {
            type: String,
            required: false,
        },
        chapterIndexId: {
            type: [String],
            required: false,
        },
        teachingAid: {
            type: String,
            required: false,
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

const DailyBookModel: Model<IDailyBookModelAttributes> = mongoose.model<IDailyBookModelAttributes>('daily_book', DailyBookSchema);

export default DailyBookModel;
