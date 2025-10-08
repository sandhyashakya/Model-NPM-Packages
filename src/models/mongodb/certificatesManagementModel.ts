import mongoose, { Schema, Model } from 'mongoose';
import { COMMAN_STATUS } from '../../constants/app';
import { ICertificatesManagementAttributes } from '@kipipackages/interfaces';

const CertificatesManagementSchema: Schema<ICertificatesManagementAttributes> = new Schema<ICertificatesManagementAttributes>(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
        },
        instituteId: {
            type: String,
            required: false,
        },
        additionalData: {
            type: [String],
            default: [],
            required: false,
        },
        // isDefault: {
        //     type: Boolean,
        //     required: false,
        // },
        isInstituteDefault: {
            type: Boolean,
            required: false,
        },
    },
    { timestamps: true, versionKey: false },
);

const CertificatesManagement: Model<ICertificatesManagementAttributes> = mongoose.model<ICertificatesManagementAttributes>(
    'certificates_details',
    CertificatesManagementSchema,
);

export default CertificatesManagement;
