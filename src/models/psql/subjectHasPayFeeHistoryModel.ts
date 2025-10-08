import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import InstituteEntityModel from './instituteEntityModel';
import FeesCollectionModel from './feesCollectionModel';
import { ISubjectHasPayFeeHistoryModelAttributes, TSubjectHasPayFeeHistoryModelCreationAttributes } from '@kipipackages/interfaces';

class SubjectHasPayFeeHistory extends Model<ISubjectHasPayFeeHistoryModelAttributes, TSubjectHasPayFeeHistoryModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare userId: string;
    declare subjectId: string;
    declare feeCollectionId: string;
    declare amount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

SubjectHasPayFeeHistory.init(
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
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        feeCollectionId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        modelName: 'SubjectHasPayFeeHistory',
        tableName: 'subject_has_pay_fee_history',
        timestamps: true,
        sequelize,
    },
);

SubjectHasPayFeeHistory.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'subjectHasPayFeeHistoryInstitute',
});
InstituteModel.hasMany(SubjectHasPayFeeHistory, { foreignKey: 'instituteId', as: 'instituteHasSubjectHasPayFeeHistory' });

FeesCollectionModel.hasMany(SubjectHasPayFeeHistory, { foreignKey: 'feeCollectionId', as: 'feesCollectionHasSubjectHasPayFeeHistory' });
SubjectHasPayFeeHistory.belongsTo(FeesCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'subjectHasPayFeeHistoryFeesCollection',
});

SubjectHasPayFeeHistory.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'subjectHasPayFeeHistoryUser',
});
UserModel.hasMany(SubjectHasPayFeeHistory, { foreignKey: 'userId', as: 'userHasSubjectHasPayFeeHistory' });

SubjectHasPayFeeHistory.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectHasPayFeeHistorySubject',
});
InstituteEntityModel.hasMany(SubjectHasPayFeeHistory, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectHasSubjectHasPayFeeHistory',
});

SubjectHasPayFeeHistory.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

SubjectHasPayFeeHistory.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

SubjectHasPayFeeHistory.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default SubjectHasPayFeeHistory;
