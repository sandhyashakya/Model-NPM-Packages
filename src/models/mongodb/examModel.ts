import mongoose, { CallbackError, Model, Schema } from "mongoose";
import {
  EXAM_MODE,
  EXAM_STATUS,
  EXAM_ANSWER_SELECTION_TYPE,
  EXAM_VALID_ANSWER_TYPE,
  TYPE_MANAGEMENT_TYPE,
  PLANNER_SYNC_STATUS,
} from "../../constants/app";
import { Op, WhereOptions } from "sequelize";
import {
  BATCH_ERROR_MESSAGES,
  CLASSROOM_ERROR_MESSAGES,
  FILE_STORAGE_ERROR_MESSAGES,
  INSTITUTE_ERROR_MESSAGES,
  TYPE_MANAGEMENT_ERROR_MESSAGES,
} from "../../constants/errorMessages";
import { IExamHasBatch, IExamModelAttributes } from "@kipipackages/interfaces";
import InstituteEntityModel from "../psql/instituteEntityModel";
import BatchModel from "../psql/batchModel";
import InstituteModel from "../psql/instituteModel";
import FileStorageModel from "../psql/fileStorageModel";
import TypeManagementModel from "../psql/typeManagementModel";
import ClassRoomModel from "../psql/classRoomModel";


const ExamHasBatchSchema: Schema<IExamHasBatch> = new Schema<IExamHasBatch>(
  {
    batchId: {
      type: String,
      required: true,
    },
    classroomId: {
      type: String,
      required: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isMarksAdded: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // Prevent creation of an automatic `_id` field for subdocuments
);

const examModelSchema: Schema<IExamModelAttributes> =
  new Schema<IExamModelAttributes>(
    {
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      subject: {
        type: String,
        required: true,
      },
      batches: {
        type: [ExamHasBatchSchema],
        required: true,
      },
      mode: {
        type: String,
        enum: Object.values(EXAM_MODE),
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      scheduleDate: {
        type: Date,
        required: true,
      },
      maxMarks: {
        type: Number,
        required: true,
      },
      passingMarks: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(EXAM_STATUS),
        default: EXAM_STATUS.PENDING,
        required: false,
      },
      nagativeMarksPerQuestion: {
        type: Number,
        required: false,
      },
      marksPerQuestion: {
        type: Number,
        required: false,
      },
      instituteId: {
        type: String,
        required: false,
      },
      fileId: {
        type: String,
        required: false,
      },
      // fileUrl: {
      //     type: String,
      //     required: false,
      // },
      totalQuestions: {
        type: Number,
        required: false,
      },
      mcqOptions: {
        type: [String],
        required: false,
      },
      ansSelectionType: {
        type: String,
        enum: Object.values(EXAM_ANSWER_SELECTION_TYPE),
        required: false,
      },
      validAnsType: {
        type: String,
        enum: Object.values(EXAM_VALID_ANSWER_TYPE),
        required: false,
      },
      standard: {
        type: String,
        required: false,
      },
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
      isPublished: {
        type: Boolean,
        default: true,
      },
      publishedDate: {
        type: Date,
        required: false,
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
      isMarksAdded: {
        type: Boolean,
        default: false,
      },
      plannerSyncStatus: {
        type: String,
        default: PLANNER_SYNC_STATUS.PENDING,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

examModelSchema.pre("save", async function (next) {
  const exam = this as IExamModelAttributes;

  try {
    if (exam.batches && exam.batches.length && exam.subject) {
      let where: WhereOptions = {
        id: exam.subject,
      };

      const subject = await InstituteEntityModel.findOne(where);
      if (!subject) {
        return next(new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED));
      }

      where = {
        id: { [Op.in]: exam.batches.map((batch) => batch.batchId) },
        subjects: { [Op.overlap]: [exam.subject] },
      };

      const batchesList = await BatchModel.findAll(where);
      if (batchesList.length !== exam.batches.length) {
        return next(new Error(BATCH_ERROR_MESSAGES.INVALID_SELECTED));
      }

      if (exam.mode === EXAM_MODE.OFFLINE && !exam.groupId) {
        where = {
          id: { [Op.in]: exam.batches.map((batch) => batch.classroomId) },
        };

        const classroomCount = await ClassRoomModel.count(where);
        const classroomDataount = [
          ...new Set(exam.batches.map((val) => val.classroomId)),
        ].length;
        if (classroomCount !== classroomDataount) {
          return next(new Error(CLASSROOM_ERROR_MESSAGES.INVALID_SELECTED));
        }
      }
    }

    if (exam.instituteId) {
      const institute = await InstituteModel.findByPk(exam.instituteId);
      if (!institute) {
        return next(new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND));
      }
    }

    if (exam.fileId) {
      const file = await FileStorageModel.findByPk(exam.fileId);
      if (!file) {
        return next(new Error(FILE_STORAGE_ERROR_MESSAGES.NOT_FOUND));
      }
    }

    if (exam.type) {
      const type = await TypeManagementModel.findOne({
        where: { id: exam.type, type: TYPE_MANAGEMENT_TYPE.EXAM },
      });
      if (!type) {
        return next(new Error(TYPE_MANAGEMENT_ERROR_MESSAGES.NOT_FOUND));
      }
    }
    next(); // Proceed with the save operation
  } catch (error: unknown) {
    return next(error as CallbackError); // Handle any errors that occur during the validation
  }
});

examModelSchema.index({
  instituteId: 1,
  "batches.batchId": 1,
  scheduleDate: 1,
  subject: 1,
  status: 1,
  mode: 1,
});

const ExamModel: Model<IExamModelAttributes> =
  mongoose.model<IExamModelAttributes>("exams", examModelSchema);
// (async () => {
//     await ExamModel.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default ExamModel;
