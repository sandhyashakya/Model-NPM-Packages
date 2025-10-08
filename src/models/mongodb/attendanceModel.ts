import mongoose, { CallbackError, Model, Schema } from 'mongoose';
import { ATTENDANCE_STATUS, ATTENDANCE_TYPE, USER_TYPES } from '../../constants/app';
import { ATTENDANCE_ERROR_MESSAGES, INSTITUTE_ERROR_MESSAGES } from '../../constants/errorMessages';
import { Op, WhereOptions } from 'sequelize';
import { endOfDay, isDateWithinRange, startOfDay } from '../../helpers/utils';
import { IAttendanceModelAttributes, IAttendanceUser, TUserHasBatchModelAttributesWithAssociations } from '@kipipackages/interfaces';
import InstituteModel from '../psql/instituteModel';
import UserHasBatchModel from '../psql/userHasBatchModel';


const attendanceUserSchema: Schema<IAttendanceUser> = new Schema<IAttendanceUser>(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(ATTENDANCE_STATUS),
            default: ATTENDANCE_STATUS.NONE,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        checkedInTime: {
            type: Date,
            required: false,
        },
        checkedOutTime: {
            type: Date,
            required: false,
        },
    },
    { _id: false },
);

const attendanceModelSchema: Schema<IAttendanceModelAttributes> = new Schema<IAttendanceModelAttributes>(
    {
        date: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(ATTENDANCE_TYPE),
            required: true,
        },
        userType: {
            type: String,
            enum: Object.values(USER_TYPES),
            required: true,
        },
        instituteId: {
            type: String,
            required: true,
        },
        users: {
            type: [attendanceUserSchema],
            required: true,
        },
        batchId: {
            type: String,
        },
        lectureId: {
            type: String,
        },
        slotId: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        virtuals: true,
    },
);

attendanceModelSchema.pre('save', async function (next) {
    const attendance = this as IAttendanceModelAttributes;
    try {
        if (attendance.instituteId) {
            const institute = await InstituteModel.findByPk(attendance.instituteId);
            if (!institute) {
                throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
            }
        }

        if (attendance.users && attendance.users.length) {
            const batchWhere: WhereOptions = { instituteId: attendance.instituteId };
            //for BATCH type
            if (ATTENDANCE_TYPE.BATCH === attendance.type) {
                batchWhere.id = attendance.batchId;
            }

            //for LECTURE type
            if (ATTENDANCE_TYPE.LECTURE === attendance.type) {
                //
            }
            const userHasBatchList: TUserHasBatchModelAttributesWithAssociations[] = await UserHasBatchModel.findAll({
                where: {
                    userId: { [Op.in]: attendance.users.map(user => user.userId) },
                },
                include: [
                    { association: 'batch', where: batchWhere },
                    { association: 'user', where: { type: attendance.userType } },
                ],
            });

            for (const user of attendance.users) {
                //check attendance time full day wise

                let startTime = startOfDay(attendance.date);
                let endTime = endOfDay(attendance.date);

                //check attendance time batch wise
                if (attendance.type === ATTENDANCE_TYPE.BATCH) {
                    if (!attendance.batchId) throw new Error(ATTENDANCE_ERROR_MESSAGES.USER_BATCH_NOT_FOUND);
                    const userHasbatch = userHasBatchList.find(
                        userBatch => userBatch.batchId === attendance.batchId && userBatch.userId === user.userId,
                    );
                    if (!userHasbatch || !userHasbatch.batch) throw new Error(ATTENDANCE_ERROR_MESSAGES.USER_HAS_BATCH_NOT_FOUND);
                    startTime = userHasbatch.batch.startTime;
                    endTime = userHasbatch.batch.endTime;
                    const isValidStartTime = isDateWithinRange(startOfDay(attendance.date), startTime, endTime);
                    const isValidEndTime = isDateWithinRange(endOfDay(attendance.date), startTime, endTime);
                    if (!isValidStartTime || !isValidEndTime) {
                        throw new Error(ATTENDANCE_ERROR_MESSAGES.BATCH_TIME_NOT_MATCH);
                    }
                }

                //check attendance time lecture wise
                if (attendance.type === ATTENDANCE_TYPE.LECTURE) {
                    //update start time and endTime accorind lecture
                }
            }
        }
        next(); // Proceed with the save operation
    } catch (error: unknown) {
        return next(error as CallbackError); // Handle any errors that occur during the validation
    }
});

attendanceModelSchema.index({ type: 1, date: 1, batchId: 1, userType: 1, instituteId: 1, 'users.userId': 1 });

const AttendanceModel: Model<IAttendanceModelAttributes> = mongoose.model<IAttendanceModelAttributes>('attendance', attendanceModelSchema);

// (async () => {
//     await AttendanceModel.syncIndexes();
// })();

export default AttendanceModel;
