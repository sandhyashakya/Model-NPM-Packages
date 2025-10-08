import mongoose, { Model, Schema } from 'mongoose';
import {
    CATEGORY,
    COMMAN_STATUS,
    DISABILITY_TYPE,
    EMPLOYMENT_TYPE,
    FILE_TYPE,
    IS_PRINCIPAL,
    NATIONALITY,
    NO_TYPE,
    RELIGION_CASTE,
    USER_DETAILS,
    USER_INSTITUTE_META_STATUS,
    USER_TYPES,
    WORK_CATEGORY,
    WORK_TYPE,
} from '../../constants/app';
import { IAddressSchema, IEmergencyContactSchema, IExperienceSchema, ILastSchoolSchema, IUserDetailsAttributes, IUserHasFiles, IUserHasQualification, IUserSchoolInfo, IWorkingDetailsSchema } from '@kipipackages/interfaces';

const UserHasFilesSchema: Schema<IUserHasFiles> = new Schema<IUserHasFiles>(
    {
        fileType: {
            type: String,
            enum: Object.values(FILE_TYPE),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(COMMAN_STATUS),
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileStorageId: {
            type: String,
            required: true,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);

const UserHasQulificationSchema: Schema<IUserHasQualification> = new Schema<IUserHasQualification>(
    {
        degree: {
            type: String,
            required: false,
        },
        schoolCollege: {
            type: String,
            required: false,
        },
        boardUniversity: {
            type: String,
            required: false,
        },
        passingYear: {
            type: Date,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
export const UserSchoolInfoSchema: Schema<IUserSchoolInfo> = new Schema<IUserSchoolInfo>(
    {
        firstName: {
            type: String,
            required: false,
            trim: true,
        },
        middleName: {
            type: String,
            required: false,
            trim: true,
        },
        birthPlace: {
            type: String,
            required: false,
            trim: true,
        },
        lastName: {
            type: String,
            required: false,
            trim: true,
        },
        // email: {
        //     type: String,
        //     required: false,
        //     lowercase: true,
        //     trim: true,
        // },
        dob: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        bloodGroup: {
            type: String,
            required: false,
        },
        aadharCard: {
            type: String,
            default: null,
            require: false,
        },
        panCard: {
            type: String,
            default: null,
            require: false,
        },
        category: {
            type: String,
            enum: Object.values(CATEGORY),
            required: false,
        },
        nationality: {
            type: String,
            enum: Object.values(NATIONALITY),
            required: false,
        },
        religionCaste: {
            type: String,
            enum: Object.values(RELIGION_CASTE),
            required: false,
        },
        caste: {
            type: String,
            required: false,
        },
    },
    { _id: false }, // since it's a sub-schema
);
const ExperienceSchema: Schema<IExperienceSchema> = new Schema<IExperienceSchema>(
    {
        institutedName: {
            type: String,
            required: false,
        },
        instituteId: {
            type: String,
            required: false,
        },
        entities: {
            type: [String],
            required: false,
        },
        jobTitle: {
            type: String,
            required: true,
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
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(USER_INSTITUTE_META_STATUS),
            default: USER_INSTITUTE_META_STATUS.LEFT,
            required: true,
        },
        isPrincipal: {
            type: String,
            enum: Object.values(IS_PRINCIPAL),
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: false,
        },
        userType: {
            type: String,
            enum: Object.values(USER_TYPES),
            required: false,
        },
        isSchool: {
            type: Boolean,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
const LastSchoolSchema: Schema<ILastSchoolSchema> = new Schema<ILastSchoolSchema>(
    {
        name: {
            type: String,
            required: false,
        },
        startTime: {
            type: Date,
            required: false,
        },
        endTime: {
            type: Date,
            required: false,
        },
        address1: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        area: {
            type: String,
            required: false,
        },
        reason: {
            type: String,
            required: false,
        },
        pinCode: {
            type: String,
            required: false,
        },
        district: {
            type: String,
            required: false,
        },
        country: {
            type: Number,
            required: false,
        },
        state: {
            type: Number,
            required: false,
        },
        entities: {
            type: [String],
            default: [],
            required: false,
        },
        instituteId: {
            type: String,
            required: false,
        },
        city: {
            type: Number,
            required: false,
        },
        isSchool: {
            type: Boolean,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
const AddressSchema: Schema<IAddressSchema> = new Schema<IAddressSchema>(
    {
        pinCode: {
            type: String,
            required: false,
        },
        address1: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        district: {
            type: String,
            required: false,
        },
        area: {
            type: String,
            required: false,
        },
        state: {
            type: Number,
            required: false,
        },
        country: {
            type: Number,
            required: false,
        },
        city: {
            type: Number,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
const EmergencyContactSchema: Schema<IEmergencyContactSchema> = new Schema<IEmergencyContactSchema>(
    {
        name: {
            type: String,
            required: false,
        },
        relation: {
            type: String,
            required: false,
        },
        mobile: {
            type: String,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
const WorkingDesignationsSchema: Schema<IWorkingDetailsSchema> = new Schema<IWorkingDetailsSchema>(
    {
        workCategory: {
            type: String,
            enum: Object.values(WORK_CATEGORY),
            required: false,
        },
        workType: {
            type: String,
            enum: Object.values(WORK_TYPE),
            required: false,
        },
        occupation: {
            type: String,
            required: false,
        },
        organizationName: {
            type: String,
            required: false,
        },
        organizationAddress: {
            type: String,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);
const userDetailsSchema: Schema<IUserDetailsAttributes> = new Schema<IUserDetailsAttributes>(
    {
        intersetedEntities: {
            type: [{ type: String }],
            default: [],
            required: false,
        },
        experiences: {
            type: [ExperienceSchema],
            default: [],
            required: false,
        },
        lastSchool: {
            type: [LastSchoolSchema],
            default: [],
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
        // userType: {
        //     type: String,
        //     enum: Object.values(USER_TYPES),
        //     required: true,
        // },
        // instituteId: {
        //     type: String,
        //     required: false,
        // },
        files: {
            type: [UserHasFilesSchema],
            default: [],
            required: false,
        },
        qualifications: {
            type: [UserHasQulificationSchema],
            default: [],
            required: false,
        },
        bio: {
            type: String,
            required: false,
        },
        birthPlace: {
            type: String,
            default: null,
            required: false,
        },
        fatherName: {
            type: String,
            default: null,
            required: false,
        },
        motherName: {
            type: String,
            default: null,
            required: false,
        },
        aadharCard: {
            type: String,
            default: null,
            require: false,
        },
        panCard: {
            type: String,
            default: null,
            require: false,
        },
        driverlicense: {
            type: String,
            default: null,
            require: false,
        },
        category: {
            type: String,
            enum: Object.values(CATEGORY),
            required: false,
        },
        nationality: {
            type: String,
            enum: Object.values(NATIONALITY),
            required: false,
        },
        religionCaste: {
            type: String,
            enum: Object.values(RELIGION_CASTE),
            required: false,
        },
        caste: {
            type: String,
            required: false,
        },
        domicileState: {
            type: String,
            required: false,
        },
        userSchoolInfo: {
            type: UserSchoolInfoSchema,
            required: false,
        },
        numberType: {
            type: String,
            enum: Object.values(NO_TYPE),
            required: false,
        },
        workingDetails: {
            type: WorkingDesignationsSchema,
            default: {},
            required: false,
        },
        userDetailsType: {
            type: String,
            enum: Object.values(USER_DETAILS),
            required: false,
        },
        userDetails: {
            type: String,
            enum: Object.values(DISABILITY_TYPE),
            required: false,
        },
        uidNo: {
            type: String,
            require: false,
        },
        teacherUidNo: {
            type: String,
            require: false,
        },
        uniqueNumber: {
            type: String,
            require: false,
        },
        gpfNo: {
            type: String,
            require: false,
        },
        epfNo: {
            type: String,
            require: false,
        },
        currentAddress: {
            type: AddressSchema,
            default: {},
            required: false,
        },
        emergencyContact: {
            type: EmergencyContactSchema,
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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userDetailsSchema.index({
    userId: 1,
});

const userDetails: Model<IUserDetailsAttributes> = mongoose.model<IUserDetailsAttributes>('userDetails', userDetailsSchema);

// (async () => {
//     await userDetails.syncIndexes();
// })();

export default userDetails;
