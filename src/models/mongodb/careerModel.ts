import mongoose, { Model, Schema } from 'mongoose';
import { COMMAN_STATUS } from '../../constants/app';
import { ICareerModelAttributes } from '@kipipackages/interfaces';

const CareerSchema: Schema<ICareerModelAttributes> = new Schema<ICareerModelAttributes>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        technology: {
            type: [String],
            required: true,
        },
        resumeFileStorageId: {
            type: String,
            required: true,
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

const CareerModel: Model<ICareerModelAttributes> = mongoose.model<ICareerModelAttributes>('career', CareerSchema);

export default CareerModel;
