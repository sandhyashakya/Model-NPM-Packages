import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import InstituteEntityModel from './instituteEntityModel';
import { IUserHasSubjectFeeModelAttributes, TUserHasSubjectFeeModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasSubjectFeeModel extends Model<IUserHasSubjectFeeModelAttributes, TUserHasSubjectFeeModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare userId: string;
    declare academicYearId: string;
    declare subjectId: string;
    declare fee: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasSubjectFeeModel.init(
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        academicYearId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'userHasSubjectFee',
        tableName: 'user_has_subject_fee',
        timestamps: true,
        sequelize,
    },
);

UserHasSubjectFeeModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'userHasFeeInstitute',
});
InstituteModel.hasMany(UserHasSubjectFeeModel, { foreignKey: 'instituteId', as: 'instituteHasUserSubject' });

UserHasSubjectFeeModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectHasUserFee',
});
InstituteEntityModel.hasMany(UserHasSubjectFeeModel, { foreignKey: 'subjectId', as: 'userFeeHasSubject' });

UserHasSubjectFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasSubjectFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasSubjectFeeModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
export default UserHasSubjectFeeModel;
