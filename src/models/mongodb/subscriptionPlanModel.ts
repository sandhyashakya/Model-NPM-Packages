import mongoose, { Schema, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { COMMAN_STATUS, SUBSCRIPTION_PLAN_CHARGE_INTERVAL, DISCOUNT_TYPE, VALID_CURRENCY } from '../../constants/app';
import { ISubscriptionPlanFiles, ISubscriptionPlanModelAttributes } from '@kipipackages/interfaces';

const subscriptionPlanFilesSchema: Schema<ISubscriptionPlanFiles> = new Schema<ISubscriptionPlanFiles>(
    {
        type: {
            type: String,
            required: true,
        },
        fileStorageId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: COMMAN_STATUS.ACTIVE,
            required: true,
        },
    },
    { _id: false },
);

const subscriptionPlanModelSchema: Schema<ISubscriptionPlanModelAttributes> = new Schema<ISubscriptionPlanModelAttributes>(
    {
        uuid: {
            type: String,
            required: true,
            default: uuidv4,
        },
        title: {
            type: String,
            required: true,
        },
        descriptions: {
            type: String,
            required: true,
        },
        maxUsers: {
            type: Number,
            required: true,
        },
        maxStorageInGb: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: COMMAN_STATUS.ACTIVE,
            required: true,
        },
        perUserCharge: {
            type: Number,
            required: true,
        },
        perStudentCharge: {
            type: Number,
            required: true,
        },
        chargeInterval: {
            type: String,
            default: SUBSCRIPTION_PLAN_CHARGE_INTERVAL.MONTHLY,
            required: true,
        },
        discountType: {
            type: String,
            default: DISCOUNT_TYPE.NONE,
            required: true,
        },
        moduleList: {
            type: [String],
            default: [],
            required: true,
        },
        validCurrency: {
            type: String,
            default: VALID_CURRENCY.COIN,
            required: true,
        },
        files: {
            type: [subscriptionPlanFilesSchema],
            default: [],
            required: true,
        },
        planHistory: {
            type: Schema.Types.Mixed,
            default: [],
            required: false,
        },
        userType: {
            type: String,
            required: false,
        },
        appType: {
            type: String,
            required: true,
        },
        sequence: { type: Number, required: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const SubscriptionPlanModel: Model<ISubscriptionPlanModelAttributes> = mongoose.model<ISubscriptionPlanModelAttributes>(
    'subscription_plans',
    subscriptionPlanModelSchema,
);

export default SubscriptionPlanModel;
