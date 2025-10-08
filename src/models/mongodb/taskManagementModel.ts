import mongoose, { Model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { TASK_MANAGEMENT_STATUS } from "../../constants/app";
import {
  ITaskConversationsAttributes,
  ITaskManagementModelAttributes,
} from "@kipipackages/interfaces";
import UserModel from "../psql/userModel";
import InstituteModel from "../psql/instituteModel";
import { Op } from "sequelize";
import { INSTITUTE_ERROR_MESSAGES, USER_ERROR_MESSAGES } from "../../constants/errorMessages";;

const TaskConversationsSchema = new Schema<ITaskConversationsAttributes>(
  {
    messageId: {
      type: String,
      default: uuidv4,
    },
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const TaskManagementModelSchema = new Schema<ITaskManagementModelAttributes>(
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
      required: true,
    },
    assignedUsers: {
      type: [String],
      default: [],
      required: true,
    },
    collaboratorUsers: {
      type: [String],
      default: [],
      required: true,
    },
    conversations: {
      type: [TaskConversationsSchema],
      default: [],
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TASK_MANAGEMENT_STATUS),
      required: true,
      default: TASK_MANAGEMENT_STATUS.PENDING,
    },
    instituteId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

async function creatOrUpdateHook(task: ITaskManagementModelAttributes) {
  try {
    if (task.instituteId) {
      const institute = await InstituteModel.findByPk(task.instituteId);
      if (!institute) throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }

    let users = [
      ...(task.assignedUsers || []),
      ...(task.collaboratorUsers || []),
      // ...(task.conversations.map(conversation => conversation.userId) || []),
    ];
    users = [...new Set(users)];
    if (users.length) {
      const userCount = await UserModel.count({
        where: {
          id: { [Op.in]: users },
        },
      });
      if (userCount !== users.length) {
        throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
      }
    }
  } catch (error: unknown) {
    throw error;
  }
}

TaskManagementModelSchema.pre("save", async function (next) {
  const task = this as ITaskManagementModelAttributes;
  try {
    await creatOrUpdateHook(task);
    next();
  } catch (error: unknown) {
    throw error;
  }
});
TaskManagementModelSchema.pre("updateMany", async function (next) {
  const task = this.getUpdate() as ITaskManagementModelAttributes;
  try {
    await creatOrUpdateHook(task);
    next();
  } catch (error: unknown) {
    throw error;
  }
});

const TaskManagementModel: Model<ITaskManagementModelAttributes> =
  mongoose.model<ITaskManagementModelAttributes>(
    "task_managements",
    TaskManagementModelSchema
  );

export default TaskManagementModel;
