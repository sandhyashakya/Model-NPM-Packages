import mongoose, { Model, Schema } from 'mongoose';
import {
    USER_TYPES,
    EXAM_ANSWER_SHEET_STATUS,
    EXAM_ANSWER_SHEET_QUESTION_RESULT,
    EXAM_ANSWER_SHEET_RESULT_STATUS,
    EXAM_ANSWER_SHEET_RESULT_TYPE,
} from '../../constants/app';
import { IAnswerSheetQuestion, IExamHasAnswerSheetModelAttributes } from '@kipipackages/interfaces';
import ExamModel from './examModel';
import { EXAM_ERROR_MESSAGES } from '../../constants/errorMessages';


// Define the schema for IAnswerSheetQuestion
const AnswerSheetQuestionSchema: Schema<IAnswerSheetQuestion> = new Schema<IAnswerSheetQuestion>(
    {
        index: {
            type: Number,
            required: true,
        },
        options: {
            type: [String],
            required: false,
        },
        selectedOptions: {
            type: [String],
            required: false,
        },
        validOptions: {
            type: [String],
            required: false,
        },
        result: {
            type: String,
            enum: Object.values(EXAM_ANSWER_SHEET_QUESTION_RESULT),
            default: EXAM_ANSWER_SHEET_QUESTION_RESULT.NOT_ATTENDED,
            required: false,
        },
    },
    { _id: false }, // Prevent creation of an automatic `_id` field for subdocuments
);

// Define the main schema for IExamHasAnswerSheetModelAttributes
const examHasAnswerSheetSchema: Schema<IExamHasAnswerSheetModelAttributes> = new Schema<IExamHasAnswerSheetModelAttributes>(
    {
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'exams',
            required: true,
        },
        questions: {
            type: [AnswerSheetQuestionSchema],
            default: [],
            required: true,
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
        type: {
            type: String,
            enum: Object.values(EXAM_ANSWER_SHEET_RESULT_TYPE),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(EXAM_ANSWER_SHEET_STATUS),
            default: EXAM_ANSWER_SHEET_STATUS.PENDING,
            required: true,
        },
        obtainedMarks: {
            type: Number,
            required: false,
        },
        resultStatus: {
            type: String,
            enum: Object.values(EXAM_ANSWER_SHEET_RESULT_STATUS),
            required: false,
        },
        isInProgress: {
            type: Boolean,
            default: false,
            required: false,
        },
        studentExamIp: {
            type: String,
            default: '',
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Add a pre-save hook to validate examId existence
examHasAnswerSheetSchema.pre('save', async function (next) {
    const examExists = await ExamModel.findOne({ id: this.examId });
    if (!examExists) {
        return next(new Error(EXAM_ERROR_MESSAGES.NOT_FOUND));
    }
    next();
});

const ExamHasAnswerSheetModel: Model<IExamHasAnswerSheetModelAttributes> = mongoose.model<IExamHasAnswerSheetModelAttributes>(
    'exam_answer_sheets',
    examHasAnswerSheetSchema,
);

export default ExamHasAnswerSheetModel;
