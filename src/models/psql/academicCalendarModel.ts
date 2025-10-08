import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';


import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { ACADEMIC_CALENDARS_STATUS } from '../../constants/app';
import { IAcademicCalendarModelAttributes, TAcademicCalendarModelCreationAttributes } from '@kipipackages/interfaces';

class AcademicCalendarModel extends Model<IAcademicCalendarModelAttributes, TAcademicCalendarModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare startDate: Date;
    declare endDate: Date;
    declare status: ACADEMIC_CALENDARS_STATUS;
    // declare batchId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

AcademicCalendarModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date',
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            field: 'end_date',
            allowNull: false,
        },
        // batchId: {
        //     type: DataTypes.UUID,
        //     field: 'batch_id',
        //     allowNull: true,
        // },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(ACADEMIC_CALENDARS_STATUS),
            allowNull: false,
            defaultValue: ACADEMIC_CALENDARS_STATUS.FUTURE_ACADEMIC_CALENDAR,
        },
    },
    {
        modelName: 'AcademicCalendarModel',
        tableName: 'academic_calendars',
        timestamps: true,
        sequelize,
    },
);

AcademicCalendarModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'academicCalendarInstitute',
});

// AcademicCalendarModel.belongsTo(BatchModel, {
//     foreignKey: {
//         name: 'batchId',
//         field: 'batch_id',
//         allowNull: true,
//     },
//     as: 'academicCalendarBatch',
// });

// BatchModel.hasMany(AcademicCalendarModel, { foreignKey: 'batchId', as: 'batchHasAcademicCalendars' });

InstituteModel.hasMany(AcademicCalendarModel, { foreignKey: 'instituteId', as: 'instituteHasAcademicCalendars' });

AcademicCalendarModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

AcademicCalendarModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

AcademicCalendarModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default AcademicCalendarModel;
