import { IGenarateIdCardModelAttributes } from '@kipipackages/interfaces';
import mongoose, { Schema, Model } from 'mongoose';

const GenerateIdCardSchema: Schema<IGenarateIdCardModelAttributes> = new Schema<IGenarateIdCardModelAttributes>(
    {
        templateName: {
            type: String,
            required: false,
        },
        content: {
            type: String,
            required: false,
        },
        instituteId: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const GenerateIdCardModel: Model<IGenarateIdCardModelAttributes> = mongoose.model<IGenarateIdCardModelAttributes>(
    'generate_idcard',
    GenerateIdCardSchema,
);
export default GenerateIdCardModel;
