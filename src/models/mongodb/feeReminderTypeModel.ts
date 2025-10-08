import mongoose, { Model, Schema } from 'mongoose';
import { FEE_REMINDER_SETTING_FREQUENCY, FEE_REMINDER_SETTING_TYPE } from '../../constants/app';
import { IFeeReminderTypeModelAttributes } from '@kipipackages/interfaces';

const feeReminderTypeModelSchema: Schema<IFeeReminderTypeModelAttributes> = new Schema<IFeeReminderTypeModelAttributes>(
    {
        type: {
            type: String,
            enum: Object.values(FEE_REMINDER_SETTING_TYPE),
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        frequency: {
            type: String,
            enum: Object.values(FEE_REMINDER_SETTING_FREQUENCY),
        },
        instituteId: {
            type: String,
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

const FeeReminderTypeModel: Model<IFeeReminderTypeModelAttributes> = mongoose.model<IFeeReminderTypeModelAttributes>(
    'feeReminderType',
    feeReminderTypeModelSchema,
);

export default FeeReminderTypeModel;
