import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { CONTACT_FEED_BACK_TYPE } from '../../constants/app';
// import { IContactFeedBackAttributes } from '../../interfaces/contactFeedBackInterface';
// import { TContactFeedBackModelCreationAttributes } from '../../types/contactFeedBackType';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import AcademicCalendarModel from './academicCalendarModel';
import { IContactFeedBackAttributes, TContactFeedBackModelCreationAttributes } from '@kipipackages/interfaces';

class ContactFeedBackModel extends Model<IContactFeedBackAttributes, TContactFeedBackModelCreationAttributes> implements IContactFeedBackAttributes {
    declare id: number;
    declare subject: string;
    declare discraption: string;
    declare files: string[];
    declare type: CONTACT_FEED_BACK_TYPE;
    declare instituteId: string;
    declare academicCalendarId: string;
    declare userId: string;
    declare givenInstitutedId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

ContactFeedBackModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discraption: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        files: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'institute_id',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'user_id',
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'academic_calendar_id',
        },
        givenInstitutedId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'given_instituted_id',
        },
    },
    {
        sequelize,
        tableName: 'contact_feed_back',
        modelName: 'ContactFeedBackModel',
        timestamps: true,
        underscored: true,
    },
);

ContactFeedBackModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ContactFeedBackModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ContactFeedBackModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

ContactFeedBackModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'contactFeedBackInstitute',
});
ContactFeedBackModel.belongsTo(InstituteModel, {
    foreignKey: 'givenInstitutedId',
    as: 'contactFeedBackGivenInstitute',
});
ContactFeedBackModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'contactFeedBackUser',
});

UserModel.hasMany(ContactFeedBackModel, {
    foreignKey: 'userId',
    as: 'userHasContactFeedBack',
});
InstituteModel.hasMany(ContactFeedBackModel, {
    foreignKey: 'instituteId',
    as: 'instituteHascontactFeedBack',
});
InstituteModel.hasMany(ContactFeedBackModel, {
    foreignKey: 'givenInstitutedId',
    as: 'givenInstituteHasFeedBack',
});

ContactFeedBackModel.belongsTo(AcademicCalendarModel, {
    foreignKey: 'academicCalendarId',
    as: 'contactFeedBackAcCalendar',
});

UserModel.hasMany(ContactFeedBackModel, {
    foreignKey: 'academicCalendarId',
    as: 'calendarHascontactFeedBack',
});
export default ContactFeedBackModel;
