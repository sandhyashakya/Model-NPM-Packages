import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import UserModel from './userModel';
import BatchSubjectBookAssessmentModel from './batchSubjectBookAssessmentModel';
import { BOOK_ASSESSMENT_DATE_STATUS } from '../../constants/app';
import { IBookAssessmentDateModelAttributes, TBookAssessmentDateModelCreationAttributes } from '@kipipackages/interfaces';

class BookAssessmentDateModel extends Model<IBookAssessmentDateModelAttributes, TBookAssessmentDateModelCreationAttributes> {
    declare id: string;
    declare assessmentBookId: string;
    declare date: Date;
    declare status: BOOK_ASSESSMENT_DATE_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

BookAssessmentDateModel.init(
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
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(BOOK_ASSESSMENT_DATE_STATUS),
            defaultValue: BOOK_ASSESSMENT_DATE_STATUS.PENDING,
        },
    },
    {
        modelName: 'BookAssessmentDateModel',
        tableName: 'book_assessment_dates',
        sequelize,
        indexes: [
            {
                name: 'assessment_book_id_date',
                unique: true,
                fields: ['assessment_book_id', 'date'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
    },
);

// Associations
BookAssessmentDateModel.belongsTo(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'assessmentBookId',
        field: 'assessment_book_id',
    },
    as: 'assessmentBook',
});

BatchSubjectBookAssessmentModel.hasMany(BookAssessmentDateModel, {
    foreignKey: {
        name: 'assessmentBookId',
        field: 'assessment_book_id',
    },
    as: 'subjectBookAssessmentDateList',
});

BookAssessmentDateModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

BookAssessmentDateModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

BookAssessmentDateModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default BookAssessmentDateModel;
