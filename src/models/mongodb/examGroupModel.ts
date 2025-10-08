import mongoose, { Model, Schema, Document } from "mongoose";
import {
  EXAM_GROUP_STANDARD_RESULT,
  EXAM_GROUP_STATUS,
} from "../../constants/app";
import { addDays } from 'date-fns';
import {
  IExamGroupDaysAttributes,
  IExamGroupModelAttributes,
  IExamGroupStandardByDaysAttributes,
} from "@kipipackages/interfaces";
import { EXAM_GROUP_ERROR_MESSAGES, INSTITUTE_ENTITY_TYPE_ERROR_MESSAGES, INSTITUTE_ERROR_MESSAGES } from "../../constants/errorMessages";
import InstituteModel from "../psql/instituteModel";
import InstituteEntityModel from "../psql/instituteEntityModel";
import { Op } from "sequelize";
import UserInstituteMeta from "./userInstituteMetaModel";
import { groupByFieldOrFields } from "../../helpers/utils";

const examGroupDaysSchema = new Schema<IExamGroupDaysAttributes>(
  {
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    subjectId: {
      type: String,
      required: false,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isHoliday: {
      type: Boolean,
      required: true,
      default: false,
    },
    examDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const examGroupStandardByDaysSchema =
  new Schema<IExamGroupStandardByDaysAttributes>(
    {
      standardId: {
        type: String,
        required: true,
      },
      // batches: {
      //     type: [String],
      //     default: [],
      // },
      // subjects: {
      //     type: [String],
      //     default: [],
      // },
      days: {
        type: [examGroupDaysSchema],
        required: true,
      },
      isMarksAdded: {
        type: Boolean,
        default: false,
      },
      result: {
        type: String,
        enum: EXAM_GROUP_STANDARD_RESULT,
        default: EXAM_GROUP_STANDARD_RESULT.PENDING,
      },
    },
    { _id: false }
  );

const examGroupModelSchema = new Schema<IExamGroupModelAttributes & Document>(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
    instituteId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    standards: {
      type: [String],
      default: [],
      required: true,
    },
    subjects: {
      type: [String],
      default: [],
      required: true,
    },
    standardByDays: {
      type: [examGroupStandardByDaysSchema],
      required: true,
    },
    status: {
      type: String,
      enum: EXAM_GROUP_STATUS,
      default: EXAM_GROUP_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
///
async function createOrUpdateHook(
  examGroup: IExamGroupModelAttributes
){
  try {
    if (examGroup.instituteId) {
      const institute = await InstituteModel.findOne({where:{
        id: examGroup.instituteId,
      }});
      if (!institute) throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }

    if (examGroup.standards) {
      examGroup.standards = [...new Set(examGroup.standards)];
      const standardCount = await InstituteEntityModel.count({where:{
        id: { [Op.in]: examGroup.standards },
      }});
      if (standardCount !== examGroup.standards.length)
        throw new Error(INSTITUTE_ENTITY_TYPE_ERROR_MESSAGES.NOT_FOUND);
    }

    if (examGroup.isNew) {
      examGroup.standardByDays = examGroup.standardByDays = [];
      examGroup.subjects = [];
    }

    if (examGroup.standardByDays) {
      examGroup.standardByDays = examGroup.standardByDays.filter(
        (standardByDays) =>
          examGroup.standards.includes(standardByDays.standardId)
      );
      const userInstituteMeta = await UserInstituteMeta.findOne({
        userId: examGroup.instituteId,
        instituteId: examGroup.instituteId,
      });
      let subjectList = await InstituteEntityModel.findAll({where:{
        entityId: { [Op.in]: userInstituteMeta?.entities },
      }});
      subjectList = subjectList.filter((subject) =>
        examGroup.standards.includes(subject.entityId as string)
      );
      subjectList = subjectList.filter((subject) =>
        userInstituteMeta?.entities?.includes(subject.id)
      );

      examGroup.subjects = subjectList.map((subject) => subject.id);

      const subjectListByStandardId = groupByFieldOrFields(
        subjectList,
        "entityId"
      );

      const dateList: Date[] = [];
      let startDate = examGroup.startDate;
      while (
        new Date(startDate).getTime() < new Date(examGroup.endDate).getTime()
      ) {
        dateList.push(startDate);
        startDate = addDays(startDate, 1);
      }

      for (const standard of examGroup.standards) {
        if (!subjectListByStandardId[standard]) continue;

        const existStandardByDays = examGroup.standardByDays.find(
          (standardByDays) => standardByDays.standardId === standard
        );
        const existStandardByDaysIndex = examGroup.standardByDays.findIndex(
          (standardByDays) => standardByDays.standardId === standard
        );

        let standardByDays = {
          standardId: standard,
          // batches: batches.map(batch => batch.id),
          // subjects: standardSubjectList,
          days: [] as IExamGroupDaysAttributes[],
        };

        dateList.forEach((date) => {
          const dayObject = {
            date,
            note: "",
            subjectId: "",
            isHoliday: false,
          };
          if (existStandardByDays) {
            existStandardByDays.days = existStandardByDays.days.filter(
              (day) => {
                return dateList
                  .map((date) => new Date(date).getTime())
                  .includes(new Date(day.date).getTime());
              }
            );
            const existDate = existStandardByDays.days.find((day) => {
              return dateList
                .map((date) => new Date(date).getTime())
                .includes(new Date(day.date).getTime());
            });
            if (!existDate) existStandardByDays.days.push(dayObject);
          } else {
            standardByDays.days.push(dayObject);
          }
        });

        if (existStandardByDays) {
          examGroup.standardByDays[existStandardByDaysIndex] =
            existStandardByDays;
          const isNotValidHoliday = examGroup.standardByDays[
            existStandardByDaysIndex
          ].days.some((day) => day.isHoliday && day.subjectId.length > 1);
          if (isNotValidHoliday)
            throw new Error(EXAM_GROUP_ERROR_MESSAGES.INVALID_HOLIDAY);
          standardByDays = { ...existStandardByDays };
        } else {
          examGroup.standardByDays.push(standardByDays);
        }

        /**************** Remove if want validate all subject exam created when status publish **************/
        // if (examGroup.status === EXAM_GROUP_STATUS.PUBLISHED) {
        //     const isAllSubjectExamCreated = standardByDays.days.every(day => standardSubjectList.includes(day.subjectId as string));
        //     if (!isAllSubjectExamCreated) throw new Error(EXAM_GROUP_ERROR_MESSAGES.ALL_SUBJECT_EXAM_NOT_CREATED);
        // }
      }

      //*********** days array remove duplicate date from date if multiple date empty ********///
      examGroup.standardByDays = examGroup.standardByDays.map((standard) => ({
        ...standard,
        days: standard.days.reduce((acc: IExamGroupDaysAttributes[], day) => {
          const existingIndex = acc.findIndex(
            (d) => new Date(d.date).getTime() === new Date(day.date).getTime()
          );
          if (Object.keys(day.examDetails || {}).length > 0) {
            // If an empty object exists for this date, remove it
            if (
              existingIndex !== -1 &&
              Object.keys(acc[existingIndex].examDetails || {}).length === 0
            ) {
              acc.splice(existingIndex, 1);
            }
            acc.push(day);
          } else if (existingIndex === -1) {
            // Push empty examDetails object only if there's no existing entry
            acc.push(day);
          }
          return acc;
        }, []),
      }));
    }
  } catch (err) {
    throw err;
  }
};

examGroupModelSchema.pre("save", async function (next) {
  const subjectIndex = this as IExamGroupModelAttributes;
  try {
    await createOrUpdateHook(subjectIndex);
    next();
  } catch (error: unknown) {
    throw error;
  }
});
examGroupModelSchema.pre("updateMany", async function (next) {
  const subjectIndex = this.getUpdate() as IExamGroupModelAttributes;
  try {
    await createOrUpdateHook(subjectIndex);
    next();
  } catch (error: unknown) {
    throw error;
  }
});

const ExamGroupModel: Model<IExamGroupModelAttributes> =
  mongoose.model<IExamGroupModelAttributes>(
    "exam_groups",
    examGroupModelSchema
  );
export default ExamGroupModel;
