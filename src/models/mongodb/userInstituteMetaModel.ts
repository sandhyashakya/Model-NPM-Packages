import mongoose, { Model, Schema } from 'mongoose';
import {
    ADMISSION_TYPE,
    BOOLEAN_STATUS,
    COMMAN_STATUS,
    EMPLOYMENT_TYPE,
    IS_PRINCIPAL,
    USER_INSTITUTE_META_STATUS,
    USER_TYPES,
} from '../../constants/app';
import { IUserInstituteMetaAttributes, IUserInstituteMetaSlots } from '@kipipackages/interfaces';

const userInstituteMetaSlotsSchema: Schema<IUserInstituteMetaSlots> = new Schema<IUserInstituteMetaSlots>(
    {
        slotId: {
            type: String,
            required: false,
        },
        isPrimary: {
            type: Boolean,
            required: false,
            default: false,
        },
        presentEndTime: {
            type: Number,
            required: false,
        },
        presentStartTime: {
            type: Number,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);

const userInstituteMetaSchema: Schema<IUserInstituteMetaAttributes> = new Schema<IUserInstituteMetaAttributes>(
    {
        entities: {
            type: [{ type: String }],
        },
        secondarySubject: {
            type: [{ type: String }],
        },
        // experienceEntities: {
        //     type: [{ type: String }],
        // },
        isPrincipal: {
            type: String,
            enum: Object.values(IS_PRINCIPAL),
            default: BOOLEAN_STATUS.NO,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            enum: Object.values(USER_TYPES),
            required: true,
        },
        joiningDate: {
            type: Date,
            required: false,
        },
        joinDate: {
            type: Date,
            required: false,
        },
        instituteId: {
            type: String,
            required: false,
        },
        rollNumber: {
            type: String,
            required: false,
        },
        grNumber: {
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
        jobDescription: {
            type: String,
            required: false,
        },
        employmentType: {
            type: String,
            enum: Object.values(EMPLOYMENT_TYPE),
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(USER_INSTITUTE_META_STATUS),
            default: USER_INSTITUTE_META_STATUS.PENDING,
        },
        admissionType: {
            type: String,
            enum: Object.values(ADMISSION_TYPE),
        },
        details: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            default: BOOLEAN_STATUS.NO,
        },
        isNewAdmission: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            default: BOOLEAN_STATUS.NO,
        },
        startTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endTime: {
            type: Date,
            required: false,
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
        isActive: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            default: COMMAN_STATUS.ACTIVE,
        },
        rejectedDate: {
            type: Date,
        },
        slots: {
            type: [userInstituteMetaSlotsSchema],
            default: [],
            required: false,
        },
        sidNo: {
            type: String,
            required: false,
        },
        seatNo: {
            type: String,
            required: false,
        },
        lastGreetingDate: {
            type: Date,
            required: false,
        },
        isSyncToSubscriptionPlan: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// userInstituteMetaSchema.pre('updateMany', async function (next) {
//     const userMetaData = this.getUpdate() as IUserInstituteMetaAttributes;
//     try {
//         if (!userMetaData.rollNumber) {
//             if (userMetaData.status === USER_INSTITUTE_META_STATUS.ACCEPTED) await userInstituteMetaService.creatOrUpdateHook(userMetaData);
//         }
//         next();
//     } catch (error: unknown) {
//         throw error;
//     }
// });

userInstituteMetaSchema.index({
    instituteId: 1,
    userId: 1,
    userType: 1,
    status: 1,
    // entities: 1,
});

const UserInstituteMeta: Model<IUserInstituteMetaAttributes> = mongoose.model<IUserInstituteMetaAttributes>(
    'userInstituteMeta',
    userInstituteMetaSchema,
);
// (async () => {
//     await UserInstituteMeta.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default UserInstituteMeta;
