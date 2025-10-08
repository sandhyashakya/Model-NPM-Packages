import mongoose, { Schema, Model } from 'mongoose';
import { COMMAN_STATUS, EMPLOYMENT_TYPE, FILE_TYPE, IMAGE__NAME, JOB_ACTION } from '../../constants/app';
import { IDocuments, IExperience, IJobApplyAttributes, IQualifications } from '@kipipackages/interfaces';

const QualificationsSchema: Schema<IQualifications> = new Schema<IQualifications>(
    {
        degree: {
            type: String,
            required: false,
        },
        schoolCollege: {
            type: String,
            required: false,
        },
        passingYear: {
            type: Date,
            required: false,
        },
    },
    { _id: false },
);

const IExperienceSchema: Schema<IExperience> = new Schema<IExperience>(
    {
        instituteName: {
            type: String,
            required: false,
        },
        jobTitle: {
            type: String,
            required: false,
        },
        subJobTitle: {
            type: String,
            required: false,
        },
        employmentType: {
            enum: Object.values(EMPLOYMENT_TYPE),
            type: String,
            required: false,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: false,
        },
    },
    { _id: false },
);

const IDocumentsSchema: Schema<IDocuments> = new Schema<IDocuments>(
    {
        fileType: {
            type: String,
            enum: Object.values(FILE_TYPE),
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            required: false,
        },
        fileName: {
            type: String,
            enum: Object.values(IMAGE__NAME),
            required: false,
        },
        fileStorageId: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const JobApplySchema: Schema<IJobApplyAttributes> = new Schema<IJobApplyAttributes>(
    {
        userId: {
            type: String,
            required: true,
        },
        instituteId: {
            type: String,
            required: true,
        },
        entities: {
            type: [String],
        },
        qualifications: {
            type: [QualificationsSchema],
            default: [],
            required: false,
        },
        experience: {
            type: [IExperienceSchema],
            default: [],
            required: false,
        },
        documents: {
            type: [IDocumentsSchema],
            default: [],
            required: false,
        },
        jobId: {
            type: String,
            required: false,
        },
        coverLetter: {
            type: String,
            required: false,
        },
        action: {
            type: String,
            enum: Object.values(JOB_ACTION),
            default: JOB_ACTION.PENDING,
            required: false,
        },
        mobile: {
            type: [String],
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
    },
    { timestamps: true, versionKey: false },
);

const JobApplyDetails: Model<IJobApplyAttributes> = mongoose.model<IJobApplyAttributes>('jobApplyDetails', JobApplySchema);

export default JobApplyDetails;
