import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import BatchSubjectProjectAssessmentModel from './batchSubjectProjectAssessmentModel';
import { IProjectAssessmentOptionModelAttributes, TProjectAssessmentOptionModelCreationAttributes } from '@kipipackages/interfaces';

class ProjectAssessmentOptionModel extends Model<IProjectAssessmentOptionModelAttributes, TProjectAssessmentOptionModelCreationAttributes> {
    declare id: string;
    declare assessmentProjectId: string;
    declare title: string;
    declare subTitle: string;
    declare descriptions: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

ProjectAssessmentOptionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        assessmentProjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'assessment_project_id',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'sub_title',
        },
        descriptions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        modelName: 'ProjectAssessmentOptionModel',
        tableName: 'project_assessment_options',
        sequelize,
        indexes: [
            {
                name: 'project_assessments_unique_key',
                unique: true,
                fields: ['title', 'assessment_project_id'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
    },
);

// Associations

ProjectAssessmentOptionModel.belongsTo(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'assessmentProjectId',
        field: 'assessment_project_id',
    },
    as: 'assessmentProject',
});

BatchSubjectProjectAssessmentModel.hasMany(ProjectAssessmentOptionModel, {
    foreignKey: {
        name: 'assessmentProjectId',
        field: 'assessment_project_id',
    },
    as: 'assessmentProjectOptionList',
});

ProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default ProjectAssessmentOptionModel;
