import mongoose, { Model, Schema } from 'mongoose';
import { COMMAN_STATUS, COLUMN_LIST_TITLE } from '../../constants/app';
import { IColumnModelAttributes, IRowSchema } from '@kipipackages/interfaces';

const RowSchema: Schema<IRowSchema> = new Schema<IRowSchema>(
    {
        title: { type: String, required: true },
        column: { type: String, required: true },
        default: { type: Boolean, required: true, default: false },
    },
    { _id: false },
);

const ColumnSchema: Schema<IColumnModelAttributes> = new Schema<IColumnModelAttributes>(
    {
        title: {
            type: String,
            enum: Object.values(COLUMN_LIST_TITLE),
            default: COLUMN_LIST_TITLE.FEE,
            required: true,
        },
        columnList: {
            type: [RowSchema],
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

const ColumnModel: Model<IColumnModelAttributes> = mongoose.model<IColumnModelAttributes>('column_list', ColumnSchema);

export default ColumnModel;
