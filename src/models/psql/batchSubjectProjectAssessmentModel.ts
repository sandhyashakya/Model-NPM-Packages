import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import InstituteModel from './instituteModel';
import UserModel from './userModel';
import BatchModel from './batchModel';
import InstituteEntityModel from './instituteEntityModel';
import { IBatchSubjectProjectAssessmentModelAttributes, TBatchSubjectProjectAssessmentModelCreationAttributes } from '@kipipackages/interfaces';

class BatchSubjectProjectAssessmentModel extends Model<
    IBatchSubjectProjectAssessmentModelAttributes,
    TBatchSubjectProjectAssessmentModelCreationAttributes
> {
    declare id: string;
    declare batchId: string;
    declare subjectId: string;
    declare standardId: string;
    declare optionSelectionDueDate: Date;
    declare submissionDate: Date;
    declare instituteId?: string;
    declare title: string;
    declare descriptions: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

BatchSubjectProjectAssessmentModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        batchId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'batch_id',
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'subject_id',
        },
        standardId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'standard_id',
        },
        optionSelectionDueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'option_selection_due_date',
        },
        submissionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'submission_date',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'institute_id',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        modelName: 'BatchSubjectProjectAssessmentModel',
        tableName: 'batch_subject_project_assessments',
        sequelize,
        // indexes: [
        //     {
        //         name: 'batch_subject_project_assessments_unique',
        //         unique: true,
        //         fields: ['batch_id', 'subject_id', 'standard_id', 'institute_id'],
        //         // eslint-disable-next-line camelcase
        //         where: { deleted_at: null },
        //     },
        // ],
    },
);

// Associations
BatchSubjectProjectAssessmentModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'subjectProjectAssessmentInstitute',
});

InstituteModel.hasMany(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteSubjectProjectAssessmentList',
});

BatchSubjectProjectAssessmentModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'subjectProjectAssessmentBatch',
});

BatchModel.hasMany(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'batchSubjectProjectAssessmentList',
});

InstituteEntityModel.hasMany(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectProjectAssessmentList',
});

BatchSubjectProjectAssessmentModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'projectAssessmentSubject',
});

InstituteEntityModel.hasMany(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'standardId',
        field: 'standard_id',
    },
    as: 'standardProjectAssessmentList',
});

BatchSubjectProjectAssessmentModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'standardId',
        field: 'standard_id',
    },
    as: 'projectAssessmentStandard',
});

BatchSubjectProjectAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

BatchSubjectProjectAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

BatchSubjectProjectAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default BatchSubjectProjectAssessmentModel;
