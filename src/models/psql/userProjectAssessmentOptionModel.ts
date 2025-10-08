import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import UserModel from './userModel';
import { PROJECT_ASSESSMENT_OPTION_STATUS } from '../../constants/app';
import BatchSubjectProjectAssessmentModel from './batchSubjectProjectAssessmentModel';
import ProjectAssessmentOptionModel from './projectAssessmentOptionModel';
import { IUserProjectAssessmentOptionModelAttributes, TUserProjectAssessmentOptionModelCreationAttributes } from '@kipipackages/interfaces';

class UserProjectAssessmentOptionModel extends Model<
    IUserProjectAssessmentOptionModelAttributes,
    TUserProjectAssessmentOptionModelCreationAttributes
> {
    declare id: string;
    declare assessmentProjectId: string;
    declare projectOptionId: string;
    declare userId: string;
    declare status: PROJECT_ASSESSMENT_OPTION_STATUS;
    declare note: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserProjectAssessmentOptionModel.init(
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
        projectOptionId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'project_option_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PROJECT_ASSESSMENT_OPTION_STATUS)),
            allowNull: false,
            defaultValue: PROJECT_ASSESSMENT_OPTION_STATUS.PENDING,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        modelName: 'UserProjectAssessmentOptionModel',
        tableName: 'user_project_assessment_options',
        sequelize,
        indexes: [
            {
                name: 'user_project_assessments_unique_key',
                unique: true,
                fields: ['user_id', 'assessment_project_id'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
    },
);

// Associations

UserProjectAssessmentOptionModel.belongsTo(BatchSubjectProjectAssessmentModel, {
    foreignKey: {
        name: 'assessmentProjectId',
        field: 'assessment_project_id',
    },
    as: 'assessmentProject',
});

BatchSubjectProjectAssessmentModel.hasMany(UserProjectAssessmentOptionModel, {
    foreignKey: {
        name: 'assessmentProjectId',
        field: 'assessment_project_id',
    },
    as: 'assessmentProjectUserList',
});

UserProjectAssessmentOptionModel.belongsTo(ProjectAssessmentOptionModel, {
    foreignKey: {
        name: 'projectOptionId',
        field: 'project_option_id',
    },
    as: 'assessmentProjectOption',
});

ProjectAssessmentOptionModel.hasMany(UserProjectAssessmentOptionModel, {
    foreignKey: {
        name: 'projectOptionId',
        field: 'project_option_id',
    },
    as: 'assessmentProjectOptionUserList',
});

UserProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'user',
});

UserModel.hasMany(UserProjectAssessmentOptionModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'userProjectAssessmentOptionList',
});

UserProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserProjectAssessmentOptionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default UserProjectAssessmentOptionModel;
