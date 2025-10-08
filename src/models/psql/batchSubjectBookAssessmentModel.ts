import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import InstituteModel from './instituteModel';
import UserModel from './userModel';
import BatchModel from './batchModel';
import TypeManagementModel from './typeManagementModel';
import InstituteEntityModel from './instituteEntityModel';
import { IBatchSubjectBookAssessmentModelAttributes, TBatchSubjectBookAssessmentModelCreationAttributes } from '@kipipackages/interfaces';

class BatchSubjectBookAssessmentModel extends Model<IBatchSubjectBookAssessmentModelAttributes, TBatchSubjectBookAssessmentModelCreationAttributes> {
    declare id: string;
    declare batchId: string;
    declare subjectId: string;
    declare standardId: string;
    declare assessmentType: string;
    declare instituteId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

BatchSubjectBookAssessmentModel.init(
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
        assessmentType: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'assessment_type',
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
    },
    {
        modelName: 'BatchSubjectBookAssessmentModel',
        tableName: 'batch_subject_book_assessments',
        sequelize,
        indexes: [
            {
                name: 'batch_subject_standard_institute',
                unique: true,
                fields: ['batch_id', 'subject_id', 'standard_id', 'institute_id', 'assessment_type'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
    },
);

// Associations
BatchSubjectBookAssessmentModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'subjectBookAssessmentInstitute',
});

InstituteModel.hasMany(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'instituteSubjectBookAssessmentList',
});

BatchSubjectBookAssessmentModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'subjectBookAssessmentBatch',
});

BatchModel.hasMany(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'batchId',
        field: 'batch_id',
    },
    as: 'batchSubjectBookAssessmentList',
});

BatchSubjectBookAssessmentModel.belongsTo(TypeManagementModel, {
    foreignKey: {
        name: 'assessmentType',
        field: 'assessment_type',
    },
    as: 'subjectBookAssessmentType',
});

TypeManagementModel.hasMany(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'assessmentType',
        field: 'assessment_type',
    },
    as: 'bookAssessmentTypeAssessmentList',
});

InstituteEntityModel.hasMany(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectBookAssessmentList',
});

BatchSubjectBookAssessmentModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'bookAssessmentSubject',
});

InstituteEntityModel.hasMany(BatchSubjectBookAssessmentModel, {
    foreignKey: {
        name: 'standardId',
        field: 'standard_id',
    },
    as: 'standardBookAssessmentList',
});

BatchSubjectBookAssessmentModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'standardId',
        field: 'standard_id',
    },
    as: 'bookAssessmentStandard',
});

BatchSubjectBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

BatchSubjectBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

BatchSubjectBookAssessmentModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default BatchSubjectBookAssessmentModel;
