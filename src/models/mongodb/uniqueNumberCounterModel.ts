import mongoose, { Model, Schema } from 'mongoose';
import { TYPE_OF_USER, USER_TYPES } from '../../constants/app';
import { IUniqueNumberCounterModelAttributes } from '@kipipackages/interfaces';

const uniqueNumberCounterSchema: Schema<IUniqueNumberCounterModelAttributes> = new Schema<IUniqueNumberCounterModelAttributes>(
    {
        instituteId: {
            type: String,
            default: null,
            required: false,
        },
        lastRollNumber: {
            type: Number,
            default: 0,
            required: true,
        },
        userType: {
            type: String,
            enum: Object.values(USER_TYPES),
            default: null,
            required: false,
        },
        type: {
            type: String,
            enum: Object.values(TYPE_OF_USER),
            default: null,
            required: false,
        },
        letterCode: {
            type: String,
            default: 'A',
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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
const UniqueNumberCounterModel: Model<IUniqueNumberCounterModelAttributes> = mongoose.model<IUniqueNumberCounterModelAttributes>(
    'uniqueNumberCounter',
    uniqueNumberCounterSchema,
);

export default UniqueNumberCounterModel;
