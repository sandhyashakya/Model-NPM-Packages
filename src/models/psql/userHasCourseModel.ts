import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, USER_COURSE_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import CourseModel from './courseModel';
import { IUserHasCourseModelAttributes, TUserHasCourseModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasCourseModel extends Model<IUserHasCourseModelAttributes, TUserHasCourseModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare courseId: string;
    declare instituteId?: string;
    declare price: string;
    declare discount?: string;
    declare expiryDate: Date;
    declare status: COMMAN_STATUS;
    declare courseStatus: USER_COURSE_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

UserHasCourseModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        courseId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'course_id',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expiry_date',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        courseStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: USER_COURSE_STATUS.RUNNING,
        },
    },
    {
        modelName: 'UserHasCourseModel',
        tableName: 'userHasUserHasCourses',
        timestamps: true,
        sequelize,
    },
);

// Associations
UserHasCourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasCourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasCourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasCourseModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'userHasCourseInstitute',
});

InstituteModel.hasMany(UserHasCourseModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasUserHasCourses',
});

UserHasCourseModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'userHasCourseCourse',
});
CourseModel.hasMany(UserHasCourseModel, {
    foreignKey: 'courseId',
    as: 'courseHasUserHasCourses',
});

UserHasCourseModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'courseHasUser',
});
UserModel.hasMany(UserHasCourseModel, {
    foreignKey: 'userId',
    as: 'userHasCourses',
});

export default UserHasCourseModel;
