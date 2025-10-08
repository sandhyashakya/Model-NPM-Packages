import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import BatchSubjectBookAssessmentModel from './batchSubjectBookAssessmentModel';
import { USER_BOOK_ASSESSMENT_STATUS } from '../../constants/app';
import BatchModel from './batchModel';
import BookAssessmentDateModel from './bookAssessmentDateModel';
import { IUserBookAssessmentModelAttributes, TUserBookAssessmentModelCreationAttributes } from '@kipipackages/interfaces';

class UserBookAssessmentModel extends Model<IUserBookAssessmentModelAttributes, TUserBookAssessmentModelCreationAttributes> {
    declare id: string;
    declare assessmentBookId: string;
    declare assessmentDateId: string;
    declare batchId: string;
    declare userId: string;
    declare status: USER_BOOK_ASSESSMENT_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserBookAssessmentModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        assessmentBookId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'assessment_book_id',
        },
        assessmentDateId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'assessment_date_id',
        },
        batchId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'batch_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        status: {
            type: DataTypes.ENUM(...Object.values(USER_BOOK_ASSESSMENT_STATUS)),
            defaultValue: USER_BOOK_ASSESSMENT_STATUS.PENDING,
        },
    },
    {
        modelName: 'UserBookAssessmentModel',
        tableName: 'user_book_assessments',
        sequelize,
        indexes: [
            {
                name: 'composite_unique_key',
                unique: true,
                fields: ['assessment_book_id', 'assessment_date_id', 'batch_id', 'user_id'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
    },
);

// Associations
UserBookAssessmentModel.belongsTo(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'assessmentBookId',
        field: 'assessment_book_id',
    },
    as: 'assessmentBook',
});

BatchSubjectBookAssessmentModel.hasMany(UserBookAssessmentModel, {
    foreignKey: {
        name: 'assessmentBookId',
        field: 'assessment_book_id',
    },
    as: 'subjectBookAssessmentUserList',
});

UserBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'user',
});

UserModel.hasMany(UserBookAssessmentModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userBookAssessmentList',
});

UserBookAssessmentModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'batch',
});

BatchModel.hasMany(UserBookAssessmentModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'batchUserBookAssessmentList',
});

UserBookAssessmentModel.belongsTo(BookAssessmentDateModel, {
    foreignKey: {
        name: 'assessmentDateId',
        field: 'assessment_date_id',
    },
    as: 'assessmentDate',
});

BookAssessmentDateModel.hasMany(UserBookAssessmentModel, {
    foreignKey: {
        name: 'assessmentDateId',
        field: 'assessment_date_id',
    },
    as: 'assessmentDateUserList',
});

UserBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserBookAssessmentModel;
