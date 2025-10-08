import { CallbackError, Schema, model } from 'mongoose';
import { BOOLEAN_STATUS, DESIGNATION_OF_PERSON, PROPERTY_STATUS, TRUST_REGISTERED_UNDER, TRUST_TYPE } from '../../constants/app';
import { INSTITUTE_ERROR_MESSAGES } from '../../constants/errorMessages';
import ApiError from '../../helpers/apiError';
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode';
import { IBuildingInformation, ICoInfrastructureSchema, ICorrespondentInformation, IHscSscSchema, ISchoolInformation, ITrustiesInformation, ITrustInformation, IUserSchoolMetaModelAttributes } from '@kipipackages/interfaces';
import InstituteModel from '../psql/instituteModel';
import CityModel from '../psql/cityModel';
import StateModel from '../psql/stateModel';
import CountryModel from '../psql/countryModel';

const hscSscSchema: Schema<IHscSscSchema> = new Schema<IHscSscSchema>(
    {
        centerCode: {
            type: String,
            required: false,
        },
        centerName: {
            type: String,
            required: false,
        },
        zoneCode: {
            type: String,
            required: false,
        },
        zoneName: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
const coInfrastructureSchema: Schema<ICoInfrastructureSchema> = new Schema<ICoInfrastructureSchema>(
    {
        // id: {
        //     type: String,
        //     required: true,
        // },
        hostel: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
        canteen: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
        transport: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
    },
    { _id: false },
);

const schoolInformationSchema: Schema<ISchoolInformation> = new Schema<ISchoolInformation>(
    {
        description: {
            type: String,
            required: false,
        },
        landline: {
            type: String,
            required: false,
        },
        mobile: [{ type: String, required: false }],
        country: {
            type: Number,
            required: false,
        },
        fax: {
            type: String,
            required: false,
        },
        svsName: {
            type: String,
            // enum: Object.values(SVA_NAME),
            required: false,
        },
        qdcName: {
            type: String,
            // enum: Object.values(QDC_NAME),
            required: false,
        },
        schoolStartYear: {
            type: Date,
            required: false,
        },
        schoolRegistrationDate: {
            type: Date,
            required: false,
        },
        schoolRegistrationNumber: {
            type: String,
            required: false,
        },
        semiCode: {
            type: String,
            required: false,
        },
        udiseCode: {
            type: String,
            required: false,
        },
        brochure: {
            type: String,
            required: false,
        },
        certificate: {
            type: String,
            required: false,
        },
        sscIndexNo: {
            type: String,
            required: false,
        },
        hscIndexNo: {
            type: String,
            required: false,
        },
        sscData: {
            type: hscSscSchema,
            required: false,
            default: null,
        },
        hscData: {
            type: hscSscSchema,
            required: false,
            default: null,
        },
        location: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const trustInformationSchema: Schema<ITrustInformation> = new Schema<ITrustInformation>(
    {
        // id: {
        //     type: String,
        //     required: true,
        // },
        registrationDate: {
            type: Date,
            required: false,
        },
        trustType: {
            type: String,
            enum: Object.values(TRUST_TYPE),
            required: false,
        },
        trustRegisteredUnder: {
            type: String,
            enum: Object.values(TRUST_REGISTERED_UNDER),
            required: false,
        },
        trustName: {
            type: String,
            required: false,
        },
        address1: {
            type: String,
            required: false,
        },
        area: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        pinCode: {
            type: String,
            required: false,
        },
        country: {
            type: Number,
            required: false,
        },
        trustRegistrationNo: {
            type: String,
            required: false,
        },
        state: {
            type: Number,
            required: false,
        },
        city: {
            type: Number,
            required: false,
        },
        landline: {
            type: String,
            required: false,
        },
        mobile: [
            {
                type: String,
                required: false,
            },
        ],
        email: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
const correspondentInformationSchema: Schema<ICorrespondentInformation> = new Schema<ICorrespondentInformation>(
    {
        // correspondentId: {
        //     type: String,
        //     required: false,
        // },
        authorizedPerson: {
            type: String,
            required: false,
        },
        designationOfPerson: {
            type: String,
            // enum: Object.values(DESIGNATION_OF_PERSON),
            required: false,
        },
        trustType: {
            type: String,
            enum: Object.values(TRUST_TYPE),
            required: false,
        },
        address1: {
            type: String,
            required: false,
        },
        area: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        pinCode: {
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
        city: {
            type: Number,
            required: false,
        },
        landline: {
            type: String,
            required: false,
        },
        mobile: [
            {
                type: String,
                required: false,
            },
        ],
        email: {
            type: String,
            required: false,
        },
        aadharCardNumber: {
            type: String,
            required: false,
        },
        panCardNumber: {
            type: String,
            required: false,
        },
        profileImage: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
const trustiesInformationSchema: Schema<ITrustiesInformation> = new Schema<ITrustiesInformation>(
    {
        // correspondentId: {
        //     type: String,
        //     required: false,
        // },
        isCorrespondent: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            default: BOOLEAN_STATUS.NO,
            required: false,
        },
        authorizedPerson: {
            type: String,
            required: false,
        },
        designationOfPerson: {
            type: String,
            enum: Object.values(DESIGNATION_OF_PERSON),
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
        pinCode: {
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
        city: {
            type: Number,
            required: false,
        },
        landline: {
            type: String,
            required: false,
        },
        mobile: [
            {
                type: String,
                required: false,
            },
        ],
        email: {
            type: String,
            required: false,
        },
        aadharCardNumber: {
            type: String,
            required: false,
        },
        panCardNumber: {
            type: String,
            required: false,
        },
        profileImage: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
const buildingInformationSchema: Schema<IBuildingInformation> = new Schema<IBuildingInformation>(
    {
        // id: {
        //     type: String,
        //     required: true,
        // },
        buildingStatus: {
            type: String,
            enum: Object.values(PROPERTY_STATUS),
            required: false,
        },
        buildingOwnerName: {
            type: String,
            required: false,
        },
        compoundedWall: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
        playGroundStatus: {
            type: String,
            enum: Object.values(PROPERTY_STATUS),
            required: false,
        },
        playGroundOwnerName: {
            type: String,
            required: false,
        },
        playGroundArea: {
            type: String,
            required: false,
        },
        buildingPlanOfSchoolSanctioned: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
        permissionTaken: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            required: false,
        },
        tpNumber: {
            type: String,
            required: false,
        },
        finalPlotNumber: {
            type: String,
            required: false,
        },
        surveyNumber: {
            type: String,
            required: false,
        },
        finalPlotSize: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);
const userSchoolMetaModelSchema = new Schema<IUserSchoolMetaModelAttributes>(
    {
        instituteId: {
            type: String,
            required: true,
        },
        completedPercentage: {
            type: Number,
            default: 0,
            required: false,
        },
        isSubmitted: {
            type: String,
            enum: Object.values(BOOLEAN_STATUS),
            default: BOOLEAN_STATUS.NO,
            required: false,
        },
        schoolInformation: {
            type: [schoolInformationSchema],
            required: false,
            default: [],
        },
        trustInformation: {
            type: [trustInformationSchema],
            required: false,
            default: [],
        },
        correspondentInformation: {
            type: [correspondentInformationSchema],
            required: false,
            default: [],
        },
        trustiesInformationSchema: {
            type: [trustiesInformationSchema],
            required: false,
            default: [],
        },
        buildingInformation: {
            type: [buildingInformationSchema],
            required: false,
            default: [],
        },
        coInfrastructure: {
            type: coInfrastructureSchema,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
userSchoolMetaModelSchema.pre('save', async function (next) {
    const userSchoolMeta = this as IUserSchoolMetaModelAttributes;

    try {
        await Promise.all([
            (async () => {
                if (userSchoolMeta.instituteId) {
                    const institute = await InstituteModel.findByPk(userSchoolMeta.instituteId);
                    if (!institute) {
                        throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
                    }
                }
            })(),
            (async () => {
                if (userSchoolMeta.correspondentInformation?.length) {
                    await Promise.all(
                        userSchoolMeta.correspondentInformation.map(async correspondent => {
                            if (correspondent.city) {
                                const cityExists = await CityModel.findByPk(correspondent.city);
                                if (!cityExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'City not found');
                            }
                            if (correspondent.state) {
                                const stateExists = await StateModel.findByPk(correspondent.state);
                                if (!stateExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'State not found');
                            }
                            if (correspondent.country) {
                                const countryExists = await CountryModel.findByPk(correspondent.country);
                                if (!countryExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'Country not found');
                            }
                        }),
                    );
                }
            })(),

            (async () => {
                if (userSchoolMeta.trustInformation?.length) {
                    await Promise.all(
                        userSchoolMeta.trustInformation.map(async trust => {
                            if (trust.city) {
                                const cityExists = await CityModel.findByPk(trust.city);
                                if (!cityExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'City not found');
                            }
                            if (trust.state) {
                                const stateExists = await StateModel.findByPk(trust.state);
                                if (!stateExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'State not found');
                            }
                            if (trust.country) {
                                const countryExists = await CountryModel.findByPk(trust.country);
                                if (!countryExists) throw new ApiError(HTTP_STATUS_CODE.NOTFOUND, 'Country not found');
                            }
                        }),
                    );
                }
            })(),
        ]);
        next();
    } catch (error: unknown) {
        return next(error as CallbackError);
    }
});
const UserSchoolMetaModel = model<IUserSchoolMetaModelAttributes>('UserSchoolMeta', userSchoolMetaModelSchema);

export default UserSchoolMetaModel;
