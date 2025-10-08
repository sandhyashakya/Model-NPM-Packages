import mongoose, { Model, Schema } from 'mongoose';
import { BLOG_STATUS } from '../../constants/app';
import { IBlogModelAttributes, ICommentSchema, ILikeSchema, IShareListSchema, ISubTopicSchema } from '@kipipackages/interfaces';

const CommentSchema: Schema<ICommentSchema> = new Schema<ICommentSchema>(
    {
        userId: { type: String, required: true },
        text: { type: String, required: true },
        parentCommentId: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
        isHide: { type: Boolean, default: false },
        id: { type: String, required: true },
    },
    { _id: false },
);

const LikeSchema: Schema<ILikeSchema> = new Schema<ILikeSchema>(
    {
        likeId: { type: String, required: true },
        userId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { _id: false },
);
const ShareListSchema: Schema<IShareListSchema> = new Schema<IShareListSchema>(
    {
        userId: { type: String, required: true },
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { _id: false },
);

const SubTopicSchema: Schema<ISubTopicSchema> = new Schema<ISubTopicSchema>(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        files: { type: [String], default: [] },
        srNo: { type: Number, required: true },
    },
    { _id: false },
);

const blogModelSchema: Schema<IBlogModelAttributes> = new Schema<IBlogModelAttributes>(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        blogStatus: {
            type: String,
            enum: Object.values(BLOG_STATUS),
            default: BLOG_STATUS.PENDING,
            required: true,
        },
        instituteId: { type: String, required: true },
        feedBackId: { type: String, required: false },
        academicCalendarId: { type: String, required: true },
        files: { type: [String], default: [] },
        comment: { type: [CommentSchema], default: [] },
        like: { type: [LikeSchema], default: [] },
        approveBy: { type: String, required: false },
        rejectBy: { type: String, required: false },
        rejectNote: { type: String, required: false },
        subTopic: { type: [SubTopicSchema], default: [] },
        shareList: { type: [ShareListSchema], default: [] },
        slug: { type: String, required: true },
        createdBy: { type: String, required: false },
        updatedBy: { type: String, required: false },
        deletedBy: { type: String, required: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const BlogModel: Model<IBlogModelAttributes> = mongoose.model<IBlogModelAttributes>('blog', blogModelSchema);

export default BlogModel;
