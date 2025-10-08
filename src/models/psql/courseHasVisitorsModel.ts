import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import CourseModel from './courseModel';
import { ICourseHasVisitorsModelAttributes, TCourseHasVisitorsModelCreationAttributes } from '@kipipackages/interfaces';

class CourseHasVisitorsModel extends Model<ICourseHasVisitorsModelAttributes, TCourseHasVisitorsModelCreationAttributes> {
    declare id: string;
    declare courseId: string;
    declare date: Date;
    declare visitCount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

CourseHasVisitorsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        courseId: {
            type: DataTypes.UUID,
            field: 'course_id',
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        visitCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        modelName: 'CourseHasVisitorsModel',
        tableName: 'courseHasVisitors',
        timestamps: true,
        sequelize,
    },
);

// Associations
CourseHasVisitorsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

CourseHasVisitorsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

CourseHasVisitorsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

CourseHasVisitorsModel.belongsTo(CourseModel, {
    foreignKey: 'courseId',
    as: 'visitorCourse',
});
CourseModel.hasMany(CourseHasVisitorsModel, {
    foreignKey: 'courseId',
    as: 'courseHasVisitor',
});

export default CourseHasVisitorsModel;
