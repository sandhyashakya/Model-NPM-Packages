/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, {
  Schema,
  Model,
  Query,
  QueryOptions,
  FilterQuery,
} from "mongoose";
import {
  CHAPTER_INDEX_FILE_TYPE,
  CHAPTER_INDEX_TYPE,
  COMMAN_STATUS,
  INSTITUTE_ENTITY_TYPE_SEQUENCE,
  SUBJECT_INDEX_TYPE,
  USER_CHAPTER_INDEX_STATUS,
  USER_INSTITUTE_META_STATUS,
  USER_TYPES,
} from "../../constants/app";
import {
  IAssignedUsersAttributes,
  IChapterFileAttributes,
  IChapterIndexAttributes,
  IFileStorageAttributes,
  ISubjectIndexModelAttributes,
  ITypeManagementModelAttributes,
  IUserAttributes,
  IUserInstituteMetaAttributes,
} from "@kipipackages/interfaces";
import {
  buildNestedStructure,
  getUniqueArrayByFields,
  isValidUUID,
  keyByFieldOrFields,
  startOfDay,
} from "../../helpers/utils";
import { ENV_VARIABLE } from "../../configs/env";
import { getPresignedUrl } from "../../helpers/s3Uploader";
import LectureModel from "../psql/lectureModel";
import { Op } from "sequelize";
import TypeManagementModel from "../psql/typeManagementModel";
import {
  DEFAULT_EXCLUDES_ATTRIBUTES,
  INSTITUTE_BASIC_DETAIL,
  USER_BASIC_DETAIL,
} from "../../constants/defaultModelAttributes";
import FileStorageModel from "../psql/fileStorageModel";
import InstituteModel from "../psql/instituteModel";
import UserModel from "../psql/userModel";
import InstituteEntityModel from "../psql/instituteEntityModel";
import BatchModel from "../psql/batchModel";
import UserInstituteMeta from "./userInstituteMetaModel";
import {
  BATCH_ERROR_MESSAGES,
  INSTITUTE_ENTITY_ERROR_MESSAGES,
  INSTITUTE_ERROR_MESSAGES,
  SUBJECT_INDEX_ERROR_MESSAGES,
  USER_ERROR_MESSAGES,
} from "../../constants/errorMessages";
import { v4 as uuidv4 } from "uuid";

// Define the schema for IChapterFileAttributes
const ChapterFileSchema: Schema<IChapterFileAttributes> =
  new Schema<IChapterFileAttributes>(
    {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: Object.values(CHAPTER_INDEX_FILE_TYPE),
        required: true,
      },
      fileStorageId: {
        type: String,
        required: false,
      },
      fileLink: {
        type: String,
        required: false,
      },
      categoryId: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
      descriptions: {
        type: String,
        required: false,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    { _id: false } // Prevents automatic _id generation for subdocuments
  );

const assignedUsersSchema: Schema<IAssignedUsersAttributes> =
  new Schema<IAssignedUsersAttributes>(
    {
      userId: {
        type: String,
        required: true,
      },
      chapterIndexId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(USER_CHAPTER_INDEX_STATUS),
        default: USER_CHAPTER_INDEX_STATUS.NOT_COMPLETED,
        required: false,
      },
      statusUpdatedAt: {
        type: Date,
        default: () => new Date(),
        required: false,
      },
      /*******pass lecture id when checkout lecture ******/
      lectureId: {
        type: String,
        required: false,
      },
      teachingTime: {
        type: Number,
        required: false,
      },
      teachingAid: {
        type: String,
        require: false,
      },
    },
    { _id: false } // Prevents automatic _id generation for sub documents
  );

// Define the schema for IChapterIndexAttributes
const ChapterIndexSchema: Schema<IChapterIndexAttributes> =
  new Schema<IChapterIndexAttributes>(
    {
      id: {
        type: String,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        enum: Object.values(CHAPTER_INDEX_TYPE),
        required: true,
      },
      parentId: {
        type: String,
      },
      files: {
        type: [ChapterFileSchema],
        default: [],
        required: false,
      },
      teachingTime: {
        type: Number,
        required: false,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    { _id: false } // Prevents automatic _id generation for subdocuments
  );

// Define the schema for ISubjectIndexModelAttributes
const SubjectIndexSchema: Schema<ISubjectIndexModelAttributes> =
  new Schema<ISubjectIndexModelAttributes>(
    {
      title: {
        type: String,
        required: false,
      },
      subject: {
        type: String,
        required: true,
      },
      batch: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        enum: Object.values(SUBJECT_INDEX_TYPE),
        required: true,
      },
      chapterIndex: {
        type: [ChapterIndexSchema],
        required: false,
      },
      status: {
        type: String,
        enum: Object.values(COMMAN_STATUS),
        default: COMMAN_STATUS.ACTIVE,
        required: false,
      },
      instituteId: {
        type: String,
        required: false,
      },
      sharedInstituteId: {
        type: [String],
        default: [],
        required: false,
      },
      sharedUnverifiedInstituteId: {
        type: [String],
        default: [],
        required: false,
      },
      userId: {
        type: String,
        required: false,
      },
      assignedUsers: {
        type: [assignedUsersSchema],
        required: false,
        default: [],
      },
      selectedCategoryIds: {
        type: [String],
        required: false,
        default: [],
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
      versionKey: false, // Disables the __v field
    }
  );
// hook function
async function creatOrUpdateHook(subjectIndex: ISubjectIndexModelAttributes) {
  try {
    if (subjectIndex.instituteId) {
      const institute = await InstituteModel.findByPk(
        subjectIndex.instituteId as string
      );
      if (!institute) throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }

    if (subjectIndex.sharedInstituteId?.length) {
      subjectIndex.sharedInstituteId = [
        ...new Set(subjectIndex.sharedInstituteId),
      ];
      const count = await InstituteModel.count({
        where: { id: { [Op.in]: subjectIndex.sharedInstituteId } },
      });
      if (count !== subjectIndex.sharedInstituteId.length)
        throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }

    if (subjectIndex.sharedUnverifiedInstituteId?.length) {
      subjectIndex.sharedUnverifiedInstituteId = [
        ...new Set(subjectIndex.sharedUnverifiedInstituteId),
      ].filter(
        (instituteId) => !subjectIndex?.sharedInstituteId?.includes(instituteId)
      );
      const count = await InstituteModel.count({
        where: {
          id: { [Op.in]: subjectIndex.sharedUnverifiedInstituteId },
        },
      });
      if (count !== subjectIndex.sharedUnverifiedInstituteId.length)
        throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }

    if (subjectIndex.subject) {
      const subject = await InstituteEntityModel.findOne({
        where: { id: subjectIndex.subject },
        include: [
          {
            association: "entityType",
            where: { sequence: INSTITUTE_ENTITY_TYPE_SEQUENCE.LAST },
          },
        ],
      });
      if (!subject) throw new Error(INSTITUTE_ENTITY_ERROR_MESSAGES.NOT_FOUND);
    }

    if (subjectIndex.batch) {
      const batch = await BatchModel.findOne({
        where: {
          id: subjectIndex.batch,
          subjects: { [Op.overlap]: [subjectIndex.subject] },
        },
      });
      if (!batch) throw new Error(BATCH_ERROR_MESSAGES.NOT_FOUND);
    }

    if (subjectIndex.userId) {
      const userId = await UserModel.findOne({
        where: {
          id: subjectIndex.userId,
        },
      });
      if (!userId) {
        throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
      }
    }

    if (subjectIndex.chapterIndex && subjectIndex.chapterIndex.length) {
      const isValidIndex = (list: IChapterIndexAttributes[]) => {
        if (!list.length) return true;
        //make unique index aray
        const indexList = list.map((one) => one.index);
        const tmpArr = [...new Set(indexList)] as number[];
        if (tmpArr.length !== indexList.length) return false;

        //check index start from 1 and last should be nth;
        if (
          indexList[0] !== 1 ||
          indexList[indexList.length - 1] !== indexList.length
        )
          return false;

        // Sort the array
        indexList.sort((a, b) => a - b);
        for (let i = 1; i < indexList.length; i++) {
          if (!indexList[i]) return false;
          if (indexList[i] - indexList[i - 1] !== 1) {
            return false; // Condition fails
          }
        }
        return true;
      };
      const chapterList = subjectIndex.chapterIndex.filter(
        (chapter) => chapter.type === CHAPTER_INDEX_TYPE.CHAPTER
      );
      if (!isValidIndex(chapterList))
        throw new Error(SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_INDEX);

      for (const chapter of chapterList) {
        const topicList = subjectIndex.chapterIndex.filter(
          (topic) =>
            topic.type === CHAPTER_INDEX_TYPE.TOPIC &&
            topic.parentId === chapter.id
        );
        if (!isValidIndex(topicList))
          throw new Error(
            SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_TOPIC_INDEX
          );
        for (const topic of topicList) {
          const subTopicList = subjectIndex.chapterIndex.filter(
            (subTopic) =>
              subTopic.type === CHAPTER_INDEX_TYPE.SUB_TOPIC &&
              subTopic.parentId === topic.id
          );
          if (!isValidIndex(subTopicList))
            throw new Error(
              SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_SUB_TOPIC_INDEX
            );
          const topicIndex = subjectIndex.chapterIndex.findIndex(
            (c) => c.id === topic.id
          );

          if (!subTopicList.length && topic.teachingTime) {
            subjectIndex.chapterIndex[topicIndex].teachingTime =
              topic.teachingTime;
          } else {
            subjectIndex.chapterIndex[topicIndex].teachingTime =
              subTopicList.reduce(
                (sum, subTopic) => sum + (subTopic.teachingTime || 0),
                0
              );
          }
        }
        const chapterIndex = subjectIndex.chapterIndex.findIndex(
          (c) => c.id === chapter.id
        );
        if (!topicList.length && chapter.teachingTime) {
          subjectIndex.chapterIndex[chapterIndex].teachingTime =
            chapter.teachingTime;
        } else {
          subjectIndex.chapterIndex[chapterIndex].teachingTime =
            topicList.reduce(
              (sum, topic) => sum + (topic.teachingTime || 0),
              0
            );
        }
      }

      for (const chapterIndex of subjectIndex.chapterIndex) {
        if (!chapterIndex.id) chapterIndex.id = uuidv4();
        if (chapterIndex.type !== CHAPTER_INDEX_TYPE.CHAPTER) {
          const parentChapterIndex = subjectIndex.chapterIndex.find(
            (index) => index.id === chapterIndex.parentId
          );
          if (!parentChapterIndex)
            throw new Error(
              SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_TOPIC_INDEX
            );
          if (
            chapterIndex.type === CHAPTER_INDEX_TYPE.SUB_TOPIC &&
            parentChapterIndex.type !== CHAPTER_INDEX_TYPE.TOPIC
          ) {
            throw new Error(
              SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_TOPIC_INDEX
            );
          }
          if (
            chapterIndex.type === CHAPTER_INDEX_TYPE.TOPIC &&
            parentChapterIndex.type !== CHAPTER_INDEX_TYPE.CHAPTER
          ) {
            throw new Error(
              SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_SUB_TOPIC_INDEX
            );
          }
        }
        if (chapterIndex.files && chapterIndex.files.length) {
          // if (subjectIndex.selectedCategoryIds && subjectIndex.selectedCategoryIds.length) {
          //     chapterIndex.files = chapterIndex.files.filter(file =>
          //         subjectIndex.selectedCategoryIds?.includes(file.categoryId as string),
          //     );
          // }
          chapterIndex.files = chapterIndex.files.map((file) => {
            if (!file.id) file.id = uuidv4();
            return file;
          });
        }
      }
    }

    if (subjectIndex.assignedUsers && subjectIndex.assignedUsers.length) {
      subjectIndex.assignedUsers = getUniqueArrayByFields(
        subjectIndex.assignedUsers,
        ["userId", "chapterIndexId"]
      );
      const chapterIndex = [...(subjectIndex.chapterIndex || [])];

      const chapterIndexIdList = chapterIndex
        // .filter(chapter => chapter.type === CHAPTER_INDEX_TYPE.CHAPTER)
        .map((chapter) => chapter.id);

      // const isValidIndex = subjectIndex.assignedUsers.every(assignedUser => chapterIndexIdList.includes(assignedUser.chapterIndexId));
      // if (!isValidIndex) throw new Error(SUBJECT_INDEX_ERROR_MESSAGES.CAN_NOT_ASSIGN_TO_USER);

      subjectIndex.assignedUsers = subjectIndex.assignedUsers.filter(
        (assignedUser) =>
          chapterIndexIdList.includes(assignedUser.chapterIndexId)
      );

      const chapterIndexList = chapterIndex
        .filter((chapter) =>
          subjectIndex.assignedUsers
            ?.map((assigned) => assigned.chapterIndexId)
            .includes(chapter.id)
        )
        .map((chapter) => {
          const found = subjectIndex?.assignedUsers?.find(
            (assignedUser) => chapter.id === assignedUser.chapterIndexId
          );
          if (found && found.teachingTime)
            chapter.teachingTime = found.teachingTime;
          return chapter;
        });

      const chapterList = chapterIndexList.filter(
        (chapter) => chapter.type === CHAPTER_INDEX_TYPE.CHAPTER
      );
      if (!chapterList.length)
        throw new Error(SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_INDEX);

      for (const chapter of chapterList) {
        const topicList = chapterIndexList.filter(
          (topic) =>
            topic.type === CHAPTER_INDEX_TYPE.TOPIC &&
            topic.parentId === chapter.id
        );
        if (!topicList)
          throw new Error(
            SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_TOPIC_INDEX
          );
        for (const topic of topicList) {
          const subTopicList = chapterIndexList.filter(
            (subTopic) =>
              subTopic.type === CHAPTER_INDEX_TYPE.SUB_TOPIC &&
              subTopic.parentId === topic.id
          );
          if (!subTopicList)
            throw new Error(
              SUBJECT_INDEX_ERROR_MESSAGES.INVALID_CHAPTER_SUB_TOPIC_INDEX
            );
          const topicIndex = chapterIndexList.findIndex(
            (c) => c.id === topic.id
          );
          if (!subTopicList.length && topic.teachingTime) {
            chapterIndexList[topicIndex].teachingTime = topic.teachingTime;
          } else {
            chapterIndexList[topicIndex].teachingTime = subTopicList.reduce(
              (sum, subTopic) => sum + (subTopic.teachingTime || 0),
              0
            );
          }
        }
        const chapterIndex = chapterIndexList.findIndex(
          (c) => c.id === chapter.id
        );
        if (!topicList.length && chapter.teachingTime) {
          chapterIndexList[chapterIndex].teachingTime = chapter.teachingTime;
        } else {
          chapterIndexList[chapterIndex].teachingTime = topicList.reduce(
            (sum, topic) => sum + (topic.teachingTime || 0),
            0
          );
        }
      }

      subjectIndex.assignedUsers = [
        ...subjectIndex.assignedUsers.map((assignedUser) => {
          const found = chapterIndexList.find(
            (chapter) => chapter.id === assignedUser.chapterIndexId
          );
          if (found && found.teachingTime)
            assignedUser.teachingTime = found.teachingTime;
          return assignedUser;
        }),
      ];

      let userIdList = subjectIndex.assignedUsers.map(
        (assignedUser) => assignedUser.userId
      );
      userIdList = [...new Set(userIdList)];
      const assignedUsersIdCount = await UserModel.count({
        where: {
          id: {
            [Op.in]: userIdList,
          },
          type: USER_TYPES.TEACHER,
        },
      });

      if (assignedUsersIdCount !== userIdList.length) {
        throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
      }

      const where: FilterQuery<IUserInstituteMetaAttributes> = {
        userType: USER_TYPES.TEACHER,
        status: USER_INSTITUTE_META_STATUS.ACCEPTED,
        entities: { $in: [subjectIndex.subject] },
      };

      if (subjectIndex.type === SUBJECT_INDEX_TYPE.PRIVATE) {
        where.instituteId = {
          $in: [
            ...(subjectIndex.sharedInstituteId as string[]),
            subjectIndex.instituteId || "",
          ],
        };
      } else {
        where.instituteId = subjectIndex.instituteId;
      }

      const userIntituteMetaList = await UserInstituteMeta.find(where, {
        userId: 1,
      });
      let allowUserIds = userIntituteMetaList.map(
        (userIntituteMeta) => userIntituteMeta.userId
      );

      if (subjectIndex.type === SUBJECT_INDEX_TYPE.PRIVATE) {
        allowUserIds.push(subjectIndex.userId as string);
      }

      allowUserIds = [...new Set(allowUserIds)];
      const notAllowUserIds = subjectIndex.assignedUsers?.filter(
        (assignedUsers) => !allowUserIds.includes(assignedUsers.userId)
      );
      if (notAllowUserIds?.length)
        throw new Error(SUBJECT_INDEX_ERROR_MESSAGES.CAN_NOT_ASSIGN_TO_USER);
    }
  } catch (error: unknown) {
    throw error;
  }
}

async function addDocsDetailsHook(
  subjectIndexList: ISubjectIndexModelAttributes[],
  where: FilterQuery<ISubjectIndexModelAttributes> = {},
  options: QueryOptions = {}
) {
  const batchList = await BatchModel.findAll({
    where: {
      id: {
        [Op.in]: subjectIndexList.map((subject) => subject.batch as string),
      },
    },
    attributes: { exclude: DEFAULT_EXCLUDES_ATTRIBUTES },
  });
  const batchListById = keyByFieldOrFields(batchList, "id");

  const subjectList = await InstituteEntityModel.findAll({
    where: {
      id: {
        [Op.in]: subjectIndexList.map((subject) => subject.subject as string),
      },
    },
    attributes: { exclude: DEFAULT_EXCLUDES_ATTRIBUTES },
  });
  const subjectListById = keyByFieldOrFields(subjectList, "id");

  const userIdSet = new Set(
    subjectIndexList.flatMap((subject) => [
      subject.userId as string,
      subject.createdBy as string,
    ])
  );
  subjectIndexList.forEach((subject) =>
    subject.assignedUsers?.forEach((assign) => userIdSet.add(assign.userId))
  );

  const userList = await UserModel.findAll({
    where: { id: { [Op.in]: [...userIdSet] } },
    attributes: USER_BASIC_DETAIL,
  });
  const userListById = keyByFieldOrFields(userList, "id");

  const instituteIdSet = new Set(
    subjectIndexList.flatMap((subject) => [
      subject.instituteId as string,
      ...(subject.sharedInstituteId || []),
    ])
  );

  const instituteList = await InstituteModel.findAll({
    where: { id: { [Op.in]: [...instituteIdSet] } },
    attributes: INSTITUTE_BASIC_DETAIL,
  });
  const instituteListById = keyByFieldOrFields(instituteList, "id");

  const fileStorageIdList = subjectIndexList.flatMap(
    (subject) =>
      subject.chapterIndex?.flatMap(
        (chapter) =>
          chapter.files?.map((file) => file.fileStorageId as string) || []
      ) || []
  );
  const fileStorageList = await FileStorageModel.findAll({
    where: { id: { [Op.in]: fileStorageIdList } },
    attributes: { exclude: DEFAULT_EXCLUDES_ATTRIBUTES },
  });
  const fileStorageListById = keyByFieldOrFields(fileStorageList, "id");

  const fileCategoryIdList = subjectIndexList
    .flatMap(
      (subject) =>
        subject.chapterIndex?.flatMap(
          (chapter) =>
            chapter.files?.map((file) => file.categoryId as string) || []
        ) || []
    )
    .filter((id) => isValidUUID(id));
  const fileCategoryList = await TypeManagementModel.findAll({
    where: { id: { [Op.in]: fileCategoryIdList } },
    attributes: { exclude: DEFAULT_EXCLUDES_ATTRIBUTES },
  });
  const fileCategoryListById = keyByFieldOrFields(fileCategoryList, "id");

  return await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subjectIndexList.map(async (subject: any) => {
      subject.batchDetails = batchListById[subject.batch] || {};
      subject.userDetails = userListById[subject.userId] || {};
      subject.createdByUser = userListById[subject.createdBy] || {};
      subject.subjectDetails = subjectListById[subject.subject] || {};
      subject.instituteDetails = instituteListById[subject.instituteId] || {};

      if (subject.sharedInstituteId?.length) {
        subject.sharedInstituteDetails = subject.sharedInstituteId
          .map((id: string) => instituteListById[id])
          .filter(Boolean);
      }

      if (where.assignedUsers) {
        subject.assignedUsers =
          subject.assignedUsers?.filter(
            (assignedUser: IAssignedUsersAttributes) =>
              where.assignedUsers.$elemMatch.userId.$in.includes(
                assignedUser.userId
              )
          ) || [];

        const assignedUsersMap = new Map(
          subject.assignedUsers?.map((assign: { chapterIndexId: string }) => [
            assign.chapterIndexId,
            assign,
          ]) || []
        );

        subject.chapterIndex = subject.chapterIndex
          ?.filter((chapter: { id: string }) =>
            assignedUsersMap.has(chapter.id)
          )
          .map((chapter: { id: string }) => {
            const assignedUser = assignedUsersMap.get(chapter.id);
            return assignedUser ? { ...chapter, ...assignedUser } : chapter;
          });
      }
      let completedChapterLastLecture = [];
      if (
        subject.assignedUsers &&
        subject.assignedUsers.length &&
        options?.reqUser?.type === USER_TYPES.STUDENT
      ) {
        const lectureList = await LectureModel.findAll({
          where: { subject: { [Op.in]: [subject.subject] } },
          order: [["checkedInAt", "DESC"]],
          limit: 1,
        });
        const lastLecture = lectureList.pop();
        if (lastLecture) {
          const lectureDay = startOfDay(
            lastLecture.checkedInAt as Date
          ).getTime();
          completedChapterLastLecture = subject.assignedUsers
            .filter((assignedUser: IAssignedUsersAttributes) => {
              const statusUpdateDay = startOfDay(
                assignedUser.statusUpdatedAt as Date
              ).getTime();
              return (
                assignedUser?.lectureId === lastLecture.id &&
                assignedUser.status === USER_CHAPTER_INDEX_STATUS.COMPLETED &&
                lectureDay === statusUpdateDay
              );
            })
            .map(
              (assignedUser: IAssignedUsersAttributes) =>
                assignedUser.chapterIndexId
            );
        }
      }

      if (subject.chapterIndex?.length) {
        subject.chapterIndex = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          subject.chapterIndex.map(
            async (chapter: { files: any[]; id: string }) => {
              if (chapter.files?.length) {
                if (
                  subject.type === SUBJECT_INDEX_TYPE.BATCH &&
                  options.reqUser &&
                  [
                    USER_TYPES.STUDENT,
                    USER_TYPES.PARENTS,
                    USER_TYPES.TEACHER,
                  ].includes(options.reqUser.type)
                ) {
                  chapter.files = chapter.files.filter((file) =>
                    subject.selectedCategoryIds.includes(file.categoryId)
                  );
                  if (!completedChapterLastLecture.includes(chapter.id))
                    chapter.files = [];
                }
                chapter.files = await Promise.all(
                  chapter.files.map(
                    async (file: {
                      fileStorageDetails: IFileStorageAttributes;
                      fileCategoryDetails: ITypeManagementModelAttributes;
                      fileStorageId: string;
                      categoryId: string;
                    }) => {
                      file.fileStorageDetails =
                        fileStorageListById[file.fileStorageId] || {};
                      file.fileCategoryDetails =
                        fileCategoryListById[file.categoryId] || {};
                      if (file.fileStorageDetails.storageFileName) {
                        file.fileStorageDetails.filePath =
                          await getPresignedUrl(
                            ENV_VARIABLE.AWS_BUCKET_NAME,
                            file.fileStorageDetails
                          );
                      }
                      return file;
                    }
                  )
                );
              }
              return chapter;
            }
          )
        );
        subject.nestChapterIndex = buildNestedStructure(
          subject.chapterIndex,
          "parentId",
          "list"
        );
      }

      if (subject.assignedUsers?.length) {
        subject.assignedUsers = subject.assignedUsers.map(
          (assign: { userDetails: IUserAttributes; userId: string }) => {
            assign.userDetails = userListById[assign.userId] || {};
            return assign;
          }
        );
      }

      return subject;
    })
  );
}

const queryHooks = ["find", "findOne", "findById"];
queryHooks.forEach((hook) => {
  SubjectIndexSchema.post<Query<any, ISubjectIndexModelAttributes>>(
    hook as unknown as RegExp,
    async function (docs) {
      const queryFilter = this.getFilter(); // Get the query filter
      const queryOptions = this.getOptions(); // Get the query filter
      if (!queryOptions.skipAddDocDetails) {
        if (Array.isArray(docs)) {
          docs = await addDocsDetailsHook(docs, queryFilter, queryOptions);
        } else if (docs) {
          docs = await addDocsDetailsHook([docs], queryFilter, queryOptions);
          docs = docs.pop();
        }
      }
    }
  );
});

SubjectIndexSchema.pre("save", async function (next) {
  const subjectIndex = this as ISubjectIndexModelAttributes;
  try {
    await creatOrUpdateHook(subjectIndex);
    next();
  } catch (error: unknown) {
    throw error;
  }
});
SubjectIndexSchema.pre("updateMany", async function (next) {
  const subjectIndex = this.getUpdate() as ISubjectIndexModelAttributes;
  try {
    await subjectIndex;
    next();
  } catch (error: unknown) {
    throw error;
  }
});

SubjectIndexSchema.index({
  instituteId: 1,
  type: 1,
  subject: 1,
});

const SubjectIndexModel: Model<ISubjectIndexModelAttributes> =
  mongoose.model<ISubjectIndexModelAttributes>(
    "subject_indexes",
    SubjectIndexSchema
  );

// (async () => {
//     await SubjectIndexModel.syncIndexes();
// })(); // Rebuilds indexes in DB based on schema

export default SubjectIndexModel;
