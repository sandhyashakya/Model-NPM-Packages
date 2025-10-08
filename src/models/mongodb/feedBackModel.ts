import mongoose, { Model, Schema } from 'mongoose';
import { FEED_BACK_STATUS, FEED_BACK_TYPE } from '../../constants/app';
import { IConversation, IFeedBackModelAttributes } from '@kipipackages/interfaces';

const ConversationSchema: Schema<IConversation> = new Schema<IConversation>(
    {
        userId: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        parentCommentId: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            // default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    { _id: true },
);

const FeedBackSchema: Schema<IFeedBackModelAttributes> = new Schema<IFeedBackModelAttributes>(
    {
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            enum: Object.values(FEED_BACK_TYPE),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(FEED_BACK_STATUS),
            required: true,
        },
        conversation: {
            type: [ConversationSchema],
            required: false,
        },
        instituteId: {
            type: String,
            required: false,
        },
        serialNo: {
            type: String,
            required: false,
        },
        publicToAll: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
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
    },
);

const FeedBackModel: Model<IFeedBackModelAttributes> = mongoose.model<IFeedBackModelAttributes>('feedBack', FeedBackSchema);

export default FeedBackModel;
