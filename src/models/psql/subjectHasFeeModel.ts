import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import InstituteEntityModel from './instituteEntityModel';
import { ISubjectHasFeeModelAttributes, TSubjectHasFeeModelCreationAttributes } from '@kipipackages/interfaces';

class SubjectHasFeeModel extends Model<ISubjectHasFeeModelAttributes, TSubjectHasFeeModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare subjectId: string;
    declare fee: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

SubjectHasFeeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'SubjectHasFeeModel',
        tableName: 'subject_has_fee',
        timestamps: true,
        sequelize,
    },
);

SubjectHasFeeModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'subjectHasFeeInstitute',
});
InstituteModel.hasMany(SubjectHasFeeModel, { foreignKey: 'instituteId', as: 'instituteHasSubjectHasFee' });

SubjectHasFeeModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectHasFeeSubject',
});
InstituteEntityModel.hasMany(SubjectHasFeeModel, { foreignKey: 'subjectId', as: 'subjectHasSubjectHasFee' });

SubjectHasFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SubjectHasFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SubjectHasFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default SubjectHasFeeModel;
