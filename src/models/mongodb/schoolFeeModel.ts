import mongoose, { CallbackError, Model, Schema } from "mongoose";
import { PAYMENT_TERMS_TYPE } from "../../constants/app";
import {
  FEE_TYPE_ERROR_MESSAGES,
  INSTITUTE_ERROR_MESSAGES,
  USER_INSTITUTE_META_ERROR_MESSAGES,
} from "../../constants/errorMessages";
import {
  IFeeSchema,
  ISchoolFeeModelAttributes,
  ITermsSchema,
} from "@kipipackages/interfaces";
import InstituteModel from "../psql/instituteModel";
import UserInstituteMeta from "./userInstituteMetaModel";
import FeeTypeModel from "../psql/feeTypeModel";

const termsSchemaSchema = new Schema<ITermsSchema>(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    // paidAmount: {
    //     type: Number,
    //     default: 0,
    //     required: false,
    // },
  },
  { _id: false }
);
const feeSchema = new Schema<IFeeSchema>(
  {
    feeTypeId: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: Object.values(PAYMENT_TERMS_TYPE),
      required: true,
    },
    terms: {
      type: [termsSchemaSchema],
      default: [],
      required: true,
    },
    isNotApplicableForGirls: {
      type: Boolean,
      default: false,
      required: false,
    },
    totalAmount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { _id: false }
);

const schoolFeeSchema: Schema<ISchoolFeeModelAttributes> =
  new Schema<ISchoolFeeModelAttributes>(
    {
      instituteId: {
        type: String,
        required: true,
      },
      stdId: {
        type: [String],
        required: true,
      },
      commonDueDate: {
        type: Number,
        required: true,
      },
      fees: {
        type: [feeSchema],
        default: [],
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
    }
  );
schoolFeeSchema.pre("save", async function (next) {
  const schoolFee = this as ISchoolFeeModelAttributes;

  try {
    if (!schoolFee.fees || schoolFee.fees.length === 0) {
      return next(new Error("Fees array cannot be empty."));
    }
    if (schoolFee.instituteId) {
      const institute = await InstituteModel.findByPk(schoolFee.instituteId);
      if (!institute) {
        return next(new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND));
      }
    }
    if (schoolFee.stdId) {
      const stdExits = await UserInstituteMeta.findOne({
        userId: schoolFee.instituteId,
        instituteId: schoolFee.instituteId,
        entities: { $all: schoolFee.stdId },
      });
      if (!stdExits) {
        return next(
          new Error(USER_INSTITUTE_META_ERROR_MESSAGES.STD_NOT_FOUND)
        );
      }
    }
    // const expectedLengths: Record<PAYMENT_TERMS_TYPE, number> = {
    //     YEARLY: 1,
    //     MONTHLY: 12,
    //     HALF_YEARLY: 2,
    //     QUARTERLY: 4,
    //     FULL_PAYMENT: 1,
    // };
    for (const fee of schoolFee.fees) {
      // if (fee.frequency && expectedLengths[fee.frequency] !== fee.terms.length) {
      //     return next(
      //         new Error(`Invalid terms length for ${fee.frequency}. Expected ${expectedLengths[fee.frequency]}, but got ${fee.terms.length}.`),
      //     );
      // }
      if (fee.feeTypeId) {
        const feeType = await FeeTypeModel.findByPk(fee.feeTypeId);
        if (!feeType) return next(new Error(FEE_TYPE_ERROR_MESSAGES.NOT_FOUND));
      }
      const totalTermsAmount = fee.terms.reduce(
        (sum, term) => sum + term.amount,
        0
      );
      if (totalTermsAmount !== fee.totalAmount) {
        return next(
          new Error(
            `Total amount mismatch for feeTypeId ${fee.feeTypeId}: Expected ${fee.totalAmount}, but sum of terms is ${totalTermsAmount}.`
          )
        );
      }
      for (const term of fee.terms) {
        if (!(term.date instanceof Date) || isNaN(term.date.getTime())) {
          return next(
            new Error(
              `Invalid date format in terms for feeTypeId ${fee.feeTypeId}.`
            )
          );
        }
      }
    }
    next();
  } catch (error: unknown) {
    return next(error as CallbackError);
  }
});
const SchoolFeeModel: Model<ISchoolFeeModelAttributes> =
  mongoose.model<ISchoolFeeModelAttributes>("schoolFee", schoolFeeSchema);

export default SchoolFeeModel;
