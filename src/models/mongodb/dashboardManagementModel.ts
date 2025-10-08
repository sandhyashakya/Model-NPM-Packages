import mongoose, { Model, Schema } from 'mongoose';
import { USER_TYPES, COMMAN_STATUS } from '../../constants/app';
import { IDashboardManagementAttributes, IModuleList } from '@kipipackages/interfaces';

const DashboardManagementSchema: Schema<IModuleList> = new Schema<IModuleList>(
    {
        sequenceNumber: {
            type: Number,
            required: true,
        },
        moduleName: {
            type: String,
            required: false,
        },
        webConfig: {
            type: String,
            required: true,
        },
        mobileConfig: {
            type: String,
            required: true,
        },
        webStatus: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
            required: false,
        },
        mobileStatus: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
            required: false,
        },
    },
    { _id: false },
);

const DashboardManagementModelSchema: Schema<IDashboardManagementAttributes> = new Schema<IDashboardManagementAttributes>(
    {
        isDefault: {
            type: Boolean,
            required: true,
        },
        instituteId: {
            type: String,
            required: false,
        },
        userId: {
            type: String,
            required: false,
        },
        userType: {
            type: String,
            enum: Object.values(USER_TYPES),
            required: false,
        },
        moduleList: {
            type: [DashboardManagementSchema],
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

// DashboardManagementModelSchema.index({
//     instituteId: 1,
//     user:1
// });

const DashboardManagement: Model<IDashboardManagementAttributes> = mongoose.model<IDashboardManagementAttributes>(
    'dashboard_management',
    DashboardManagementModelSchema,
);

export default DashboardManagement;
