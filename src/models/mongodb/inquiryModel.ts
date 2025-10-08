import mongoose, { Model, Schema } from "mongoose";
import {
  APP_TYPE,
  INQUIRY_REFERRED_BY,
  INQUIRY_STATUS,
  TYPE_MANAGEMENT_TYPE,
  USER_TYPES,
} from "../../constants/app";
// import {
//     IBasicInformation,
//     IAcademicInformation,
//     IGuardianInformation,
//     IInquiryModelAttributes,
//     ILastSchool,
// } from '../../interfaces/inquiryInterface';
import { CallbackError } from "mongoose";
import {
  INSTITUTE_ENTITY_ERROR_MESSAGES,
  INSTITUTE_ERROR_MESSAGES,
  TYPE_MANAGEMENT_ERROR_MESSAGES,
} from "../../constants/errorMessages";
import {
  IAcademicInformation,
  IAddressSchema,
  IBasicInformation,
  IGuardianInformation,
  IInquiryModelAttributes,
  ILastSchool,
} from "@kipipackages/interfaces";
import InstituteModel from "../psql/instituteModel";
import TypeManagementModel from "../psql/typeManagementModel";
import InstituteEntityModel from "../psql/instituteEntityModel";
import { Op } from "sequelize";

const BasicInformationSchema: Schema<IBasicInformation> =
  new Schema<IBasicInformation>(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, required: false },
      birthPlace: { type: String, required: false },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      gender: { type: String, required: true },
      dob: { type: Date, required: true },
      address1: { type: String, required: false },
    },
    { _id: false }
  );

const AcademicInformationSchema: Schema<IAcademicInformation> =
  new Schema<IAcademicInformation>(
    {
      entities: { type: [String], required: true },
      batchType: { type: String, required: false },
      admissionType: { type: String, required: false },
    },
    { _id: false }
  );
const LastSchoolSchema: Schema<ILastSchool> = new Schema<ILastSchool>(
  {
    name: { type: String, required: false },
    address1: { type: String, required: false },
    reason: { type: String, required: false },
    uidNo: { type: String, required: false },
    haveLeavingCertificate: { type: Boolean, required: false },
    result: { type: Number, required: false },
  },
  { _id: false }
);

const GuardianInformationSchema: Schema<IGuardianInformation> =
  new Schema<IGuardianInformation>(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, required: false },
      mobile: { type: String, required: true },
      relation: { type: String, required: false },
      email: { type: String, required: false },
      guardianQualification: { type: String, required: true },
      guardianOccupation: { type: String, required: true },
      guardianOccupationDetails: { type: String, required: false },
      motherName: { type: String, required: false },
    },
    { _id: false }
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
  { _id: false } // Prevent creation of an automatic `_id` field for subdocuments
);

const InquirySchema: Schema<IInquiryModelAttributes> =
  new Schema<IInquiryModelAttributes>(
    {
      instituteId: { type: String, required: false },
      basicInformation: { type: BasicInformationSchema, required: true },
      academicInformation: { type: AcademicInformationSchema, required: true },
      guardianInformation: { type: GuardianInformationSchema, required: true },
      lastSchoolInformation: { type: LastSchoolSchema, required: true },
      address: { type: AddressSchema, required: false },
      referredBy: {
        type: String,
        enum: Object.values(INQUIRY_REFERRED_BY),
        required: true,
      },
      others: {
        type: String,
        required: false,
      },
      inquiryStatus: {
        type: String,
        enum: Object.values(INQUIRY_STATUS),
        default: INQUIRY_STATUS.NOT_ENROLL,
        required: true,
      },
      appType: {
        type: String,
        enum: Object.values(APP_TYPE),
        required: true,
      },
      userType: {
        type: String,
        enum: Object.values(USER_TYPES),
        default: USER_TYPES.STUDENT,
        required: true,
      },
      createdBy: { type: String, required: false },
      updatedBy: { type: String, required: false },
      deletedBy: { type: String, required: false },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
InquirySchema.pre("save", async function (next) {
  const inquiry = this as IInquiryModelAttributes;

  try {
    if (inquiry.academicInformation.batchType) {
      const batchType = await TypeManagementModel.findByPk(
        inquiry.academicInformation.batchType
      );
      if (!batchType || batchType.type !== TYPE_MANAGEMENT_TYPE.BATCH)
        throw new Error(TYPE_MANAGEMENT_ERROR_MESSAGES.NOT_FOUND);
    }
    if (inquiry.instituteId) {
      const institute = await InstituteModel.findByPk(inquiry.instituteId);
      if (!institute) {
        throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
      }
    }
    if (inquiry.academicInformation.entities) {
      const entitiesList = await InstituteEntityModel.findAll({
        where: { id: { [Op.in]: inquiry.academicInformation.entities } },
      });
      if (!entitiesList || entitiesList.length === 0) {
        throw new Error(INSTITUTE_ENTITY_ERROR_MESSAGES.INVALID_TYPE);
      }
    }
    next();
  } catch (error: unknown) {
    return next(error as CallbackError);
  }
});
const InquiryModel: Model<IInquiryModelAttributes> =
  mongoose.model<IInquiryModelAttributes>("inquiry", InquirySchema);

export default InquiryModel;
