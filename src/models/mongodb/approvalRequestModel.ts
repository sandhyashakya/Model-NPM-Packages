import mongoose, { Model, Schema } from 'mongoose';
import { APPROVE_REQUEST_STATUS, APPROVE_REQUEST_TYPE } from '../../constants/app';
import { IApproveRequestModelAttributes } from '@kipipackages/interfaces';

const approveRequestSchema: Schema<IApproveRequestModelAttributes> = new Schema<IApproveRequestModelAttributes>(
    {
        approveType: {
            type: String,
            enum: Object.values(APPROVE_REQUEST_TYPE),
            default: null,
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(APPROVE_REQUEST_STATUS),
            default: APPROVE_REQUEST_STATUS.PENDING,
            required: false,
        },
        data: {
            type: Object,
            required: true,
        },
        approveDate: {
            type: Date,
            required: false,
        },
        rejectDate: {
            type: Date,
            required: false,
        },
        reason: {
            type: String,
            required: false,
        },
        approveBy: {
            type: String,
            required: false,
        },
        rejectBy: {
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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

approveRequestSchema.index({ approveType: 1, status: 1, createdBy: 1 });

const ApproveRequestModel: Model<IApproveRequestModelAttributes> = mongoose.model<IApproveRequestModelAttributes>(
    'approveRequest',
    approveRequestSchema,
);
// (async () => {
//     await ApproveRequestModel.syncIndexes();
// })();
export default ApproveRequestModel;
