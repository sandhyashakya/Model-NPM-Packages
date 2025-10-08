import { ICertificatesHistoryAttributes } from '@kipipackages/interfaces';
import mongoose, { Schema, Model } from 'mongoose';
const CertificatesHistorySchema: Schema<ICertificatesHistoryAttributes> = new Schema<ICertificatesHistoryAttributes>(
    {
        certificatesManagementId: {
            type: String,
            required: true,
        },
        instituteId: {
            type: String,
            required: false,
        },
        userInstituteMetaId: [
            {
                type: String,
                required: true,
            },
        ],
        additionalData: {
            type: Object,
            required: false,
        },
    },
    { timestamps: true, versionKey: false },
);

const CertificatesHistory: Model<ICertificatesHistoryAttributes> = mongoose.model<ICertificatesHistoryAttributes>(
    'certificates_history',
    CertificatesHistorySchema,
);

export default CertificatesHistory;
