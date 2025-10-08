import mongoose, { Model, Schema } from 'mongoose';
import { LANGUAGES } from '../../constants/app';
import { IDescription, IInformationSupportModelAttributes } from '@kipipackages/interfaces';
// import AutoIncrementFactory from 'mongoose-sequence';

// const AutoIncrement = AutoIncrementFactory(mongoose);

const descriptionSchema: Schema<IDescription> = new Schema<IDescription>(
    {
        videoId: {
            type: [String],
            default: [],
        },
        videoUrl: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            enum: Object.values(LANGUAGES),
            required: true,
        },
    },
    { _id: false }, // disable _id for subdocs if not needed
);

const informationSupportSchema: Schema<IInformationSupportModelAttributes> = new Schema<IInformationSupportModelAttributes>(
    {
        title: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: false, // This will be auto-incremented on server side
        },
        information: {
            type: [descriptionSchema],
            default: [],
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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
// informationSupportSchema.plugin(AutoIncrement, {
//     // eslint-disable-next-line camelcase
//     inc_field: 'number',
//     // eslint-disable-next-line camelcase
//     start_seq: 1, // optional: where numbering should start
// });

const InformationSupportModel: Model<IInformationSupportModelAttributes> = mongoose.model<IInformationSupportModelAttributes>(
    'informationSupport',
    informationSupportSchema,
);

export default InformationSupportModel;
