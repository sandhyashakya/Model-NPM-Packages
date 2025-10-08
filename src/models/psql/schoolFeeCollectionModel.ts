import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import AcademicCalendarModel from './academicCalendarModel';
import { ISchoolFeesCollectionModelAttributes, TSchoolFeeCollectionModelCreationAttributes } from '@kipipackages/interfaces';

class SchoolFeeCollectionModel extends Model<ISchoolFeesCollectionModelAttributes, TSchoolFeeCollectionModelCreationAttributes> {
    declare id: string;
    declare date?: Date;
    declare totalFeeAmount: number;
    declare userId: string;
    declare instituteId: string;
    declare discount: number;
    declare paidFee: number;
    declare dueDate?: Date;
    declare academicCalendarId: string;
    declare perviousFeeCollectionId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date;
}

SchoolFeeCollectionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        totalFeeAmount: {
            type: DataTypes.INTEGER,
            field: 'total_fee_amount',
            defaultValue: 0,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        paidFee: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            field: 'academic_calendar_id',
            allowNull: false,
        },
        perviousFeeCollectionId: {
            type: DataTypes.UUID,
            field: 'previous_fee_collection_id',
            allowNull: true,
        },
    },
    {
        modelName: 'SchoolFeeCollectionModel',
        tableName: 'school_fee_collection',
        timestamps: true,
        sequelize,
    },
);

SchoolFeeCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});
SchoolFeeCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});
SchoolFeeCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
SchoolFeeCollectionModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'schoolCollectionInstitute',
});
InstituteModel.hasMany(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
        allowNull: true,
    },
    as: 'instituteSchoolCollection',
});
SchoolFeeCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: true,
    },
    as: 'schoolCollectionUser',
});
UserModel.hasMany(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: true,
    },
    as: 'schoolCollectionHasUser',
});
SchoolFeeCollectionModel.belongsTo(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'perviousFeeCollectionId',
        field: 'previous_fee_collection_id',
        allowNull: true,
    },
    as: 'previousFeeCollection',
});
SchoolFeeCollectionModel.hasMany(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'perviousFeeCollectionId',
        field: 'previous_fee_collection_id',
        allowNull: true,
    },
    as: 'collectionPreviousCollection',
});
SchoolFeeCollectionModel.belongsTo(AcademicCalendarModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'schoolCollectionCalendar',
});
AcademicCalendarModel.hasMany(SchoolFeeCollectionModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'schoolCollectionHasCalendar',
});

export default SchoolFeeCollectionModel;
