import { DataTypes, Model } from 'sequelize';
import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteEntityModel from './instituteEntityModel';
import FileStorageModel from './fileStorageModel';
import { ISyllabusModelAttributes, TSyllabusCreationAttributes } from '@kipipackages/interfaces';

class SyllabusModel extends Model<ISyllabusModelAttributes, TSyllabusCreationAttributes> {
    declare status: COMMAN_STATUS;
    declare fileStorageId: string;
    declare instituteId: string;
    declare subjectId: string;
    declare id: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
SyllabusModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        fileStorageId: {
            type: DataTypes.UUID,
            field: 'filestorage_id',
            allowNull: true,
        },
        subjectId: {
            type: DataTypes.UUID,
            field: 'subject_id',
            allowNull: true,
        },
    },
    {
        modelName: 'SyllabusModel',
        tableName: 'syllabus',
        // indexes: [
        //     {
        //         name: 'institute_syllabus_id',
        //         unique: true,
        //         fields: ['institute_id', 'subject_id'],
        //         // eslint-disable-next-line camelcase
        //         where: { deleted_at: null },
        //     },
        // ],
        timestamps: true,
        sequelize,
    },
);

SyllabusModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SyllabusModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SyllabusModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

SyllabusModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteDetails',
});

InstituteModel.hasMany(SyllabusModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteSyllabusDetails',
});

SyllabusModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
        allowNull: true,
    },
    as: 'syllabusSubjectDetails',
});

InstituteEntityModel.hasMany(SyllabusModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
        allowNull: true,
    },
    as: 'subjectSyllabusDetails',
});

SyllabusModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'fileStorageId',
        field: 'filestorage_id',
        allowNull: true,
    },
    as: 'fileStorageDetails',
});

FileStorageModel.hasMany(SyllabusModel, {
    foreignKey: {
        name: 'fileStorageId',
        field: 'filestorage_id',
        allowNull: true,
    },
    as: 'syllabusFileStorageDetails',
});

export default SyllabusModel;
