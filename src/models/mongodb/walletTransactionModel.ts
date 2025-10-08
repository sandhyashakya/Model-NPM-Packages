import mongoose, { Schema, Model } from 'mongoose';
import {
    PAYMENT_GATEWAY_TYPES,
    WALLET_HISTORY_ACTION,
    WALLET_HISTORY_ITEM_TYPE,
    WALLET_HISTORY_STATUS,
    WALLET_HISTORY_TYPE,
    WALLET_TRANSACTION_USERS_TYPE,
    WALLET_TRANSACTION_VALID_DATE_IN_MINUTES,
} from '../../constants/app';
import { generateUuidToNumber } from '../../helpers/utils';
import { addMinutes } from 'date-fns';
import { IWalletTransactionModelAttributes, IWalletTransactionUsers } from '@kipipackages/interfaces';

// --- Sub-schema for users in transaction ---
const walletTransactionUsersSchema: Schema<IWalletTransactionUsers> = new Schema<IWalletTransactionUsers>(
    {
        userId: {
            type: String,
            required: true,
        },
        uuid: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(WALLET_TRANSACTION_USERS_TYPE),
            required: true,
        },
        action: {
            type: String,
            enum: Object.values(WALLET_HISTORY_ACTION),
            required: true,
        },
        walletHistoryId: {
            type: String,
            required: true,
        },
        userDetails: {
            type: Schema.Types.Mixed,
            default: {},
            required: false,
        },
    },
    { _id: false },
);

// --- Wallet Transaction Schema ---
const walletTransactionSchema: Schema<IWalletTransactionModelAttributes> = new Schema<IWalletTransactionModelAttributes>(
    {
        tId: {
            type: String,
            required: true,
            unique: true,
            default: () => generateUuidToNumber(),
        },
        ptId: {
            type: String,
            required: false,
        },
        users: {
            type: [walletTransactionUsersSchema],
            default: [],
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(WALLET_HISTORY_TYPE),
            required: true,
        },
        // userType: {
        //     type: String,
        //     enum: Object.values(USER_TYPES),
        //     required: false,
        // },
        instituteId: {
            type: String,
            required: false,
        },
        totalCoin: {
            type: Number,
            required: true,
        },
        itemType: {
            type: String,
            enum: Object.values(WALLET_HISTORY_ITEM_TYPE),
            required: true,
        },
        item: {
            type: Schema.Types.Mixed,
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(WALLET_HISTORY_STATUS),
            default: WALLET_HISTORY_STATUS.PENDING,
            required: true,
        },
        orderDetails: {
            type: Schema.Types.Mixed,
            default: {},
            required: false,
        },
        voucherCode: {
            type: String,
            required: false,
        },
        validDate: {
            type: Date,
            default: addMinutes(new Date(), WALLET_TRANSACTION_VALID_DATE_IN_MINUTES),
            required: false,
        },
        isOtpVerified: {
            type: Boolean,
            default: true,
            required: false,
        },
        validOtp: {
            type: String,
            required: false,
        },
        paymentGateWayType: {
            type: String,
            enum: Object.values(PAYMENT_GATEWAY_TYPES),
            required: false,
            default: PAYMENT_GATEWAY_TYPES.COIN,
        },
        token: {
            type: String,
            required: false,
        },
        redirectUrl: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// --- Model ---
const WalletTransactionModel: Model<IWalletTransactionModelAttributes> = mongoose.model<IWalletTransactionModelAttributes>(
    'wallet_transactions',
    walletTransactionSchema,
);

export default WalletTransactionModel;
