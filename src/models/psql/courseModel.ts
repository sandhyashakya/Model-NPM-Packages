import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { APP_TYPE, COMMAN_STATUS, COURSE_STATUS, USER_TYPES } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import TypeManagementModel from './typeManagementModel';
import InstituteEntityModel from './instituteEntityModel';
import { ICourseModelAttributes, TCourseModelCreationAttributes } from '@kipipackages/interfaces';

class CourseModel extends Model<ICourseModelAttributes, TCourseModelCreationAttributes> {
    declare id: string;
    declare instituteId?: string;
    declare subjectId: string;
    declare price: number;
    declare title: string;
    declare subTitle: string;
    declare materialType: string;
    declare userType: USER_TYPES;
    declare appType: APP_TYPE;
    declare courseStatus: COURSE_STATUS;
    declare entities: string[];
    declare status: COMMAN_STATUS;
    declare instructor: string;
    declare expiryTime: number; // in day

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

CourseModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        subjectId: {
            type: DataTypes.UUID,
            field: 'subject_id',
            allowNull: true,
        },
        materialType: {
            type: DataTypes.UUID,
            field: 'material_type',
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        appType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        courseStatus: {
            type: DataTypes.STRING,
            defaultValue: COURSE_STATUS.SAVE_AS_DRAFT,
            allowNull: true,
        },
        entities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiryTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        modelName: 'CourseModel',
        tableName: 'courses',
        timestamps: true,
        sequelize,
    },
);

// Associations
CourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

CourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

CourseModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

CourseModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'courseInstitute',
});

InstituteModel.hasMany(CourseModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasCourses',
});
CourseModel.belongsTo(InstituteEntityModel, {
    foreignKey: 'subjectId',
    as: 'courseSubject',
});

InstituteEntityModel.hasMany(CourseModel, {
    foreignKey: 'subjectId',
    as: 'subjectHasCourses',
});
CourseModel.belongsTo(TypeManagementModel, {
    foreignKey: 'materialType',
    as: 'courseMaterialType',
});
TypeManagementModel.hasMany(CourseModel, {
    foreignKey: 'materialType',
    as: 'materialTypeHasCourses',
});

export default CourseModel;
