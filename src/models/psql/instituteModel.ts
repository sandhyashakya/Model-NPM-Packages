import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { INSTITUTE_STATUS, PLANNER_SYNC_STATUS, SCHOOL_SUB_TYPE, SCHOOL_TYPE } from '../../constants/app';
import UserModel from './userModel';
import RoleModel from './roleModel';
import WorkingDayModel from './workingDayModel';
import CountryModel from './countryModel';
import StateModel from './stateModel';
import CityModel from './cityModel';
import FileStorageModel from './fileStorageModel';
import RulesRegilationModel from './rulesRegulationModel';
import { IInstituteAttributes, TInstituteCreationAttributes } from '@kipipackages/interfaces';

class InstituteModel extends Model<IInstituteAttributes, TInstituteCreationAttributes> {
    declare id: string;
    declare name: string;
    declare status: INSTITUTE_STATUS;
    declare defaultDataCreate: boolean;
    declare email: string;
    declare globalId: string;
    declare addressLine1: string;
    declare addressLine2: string;
    declare pinCode: string;
    declare city: number;
    declare state: number;
    declare country: number;
    declare mobile: string;
    declare contactPerson: string;
    declare mobile2?: string;
    declare contactPerson2?: string;
    declare aboutInstitute?: string;
    declare websiteUrl?: string;
    declare youtubeUrl?: string;
    declare instagramUrl?: string;
    declare facebookUrl?: string;
    declare whatsappUrl?: string;
    declare profileImage?: string;
    declare coverImage?: string;
    declare brochure?: string;
    declare area?: string;
    declare type?: SCHOOL_TYPE;
    declare subType?: SCHOOL_SUB_TYPE;
    declare district?: string;
    declare plannerSyncStatus: PLANNER_SYNC_STATUS;
    declare pdfId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

InstituteModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: INSTITUTE_STATUS.ACTIVE,
            values: Object.values(INSTITUTE_STATUS),
        },
        type: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: Object.values(SCHOOL_TYPE),
        },
        subType: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: Object.values(SCHOOL_SUB_TYPE),
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        defaultDataCreate: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'default_data_create',
            defaultValue: false,
        },
        globalId: {
            type: DataTypes.STRING,
            field: 'global_id',
            defaultValue: null,
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        contactPerson: {
            type: DataTypes.STRING(100),
            field: 'contact_person',
            allowNull: true,
        },
        contactPerson2: {
            type: DataTypes.STRING(100),
            field: 'contact_person_2',
            allowNull: true,
        },
        mobile2: {
            type: DataTypes.STRING(10),
            field: 'mobile_2',
            allowNull: true,
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'address_line_1',
        },
        addressLine2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'address_line_2',
        },
        pinCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'pin_code',
        },
        aboutInstitute: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'about_institute',
        },
        websiteUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'website_url',
        },
        whatsappUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'whatsapp_url',
        },
        facebookUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'facebook_url',
        },
        instagramUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'instagram_url',
        },
        profileImage: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'profile_image',
        },
        brochure: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'cover_image',
        },
        youtubeUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'youtube_url',
        },
        country: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plannerSyncStatus: {
            type: DataTypes.STRING,
            field: 'planner_sync_status',
            allowNull: true,
            defaultValue: PLANNER_SYNC_STATUS.PENDING,
        },
        pdfId: {
            type: DataTypes.UUID,
            field: 'pdf_id',
            allowNull: true,
        },
    },
    {
        modelName: 'InstituteModel',
        tableName: 'institutes',
        timestamps: true,
        sequelize,
    },
);

InstituteModel.belongsTo(CountryModel, { foreignKey: 'country', as: 'countryDetails' });
InstituteModel.belongsTo(StateModel, { foreignKey: 'state', as: 'stateDetails' });
InstituteModel.belongsTo(CityModel, { foreignKey: 'city', as: 'cityDetails' });

InstituteModel.belongsTo(FileStorageModel, { foreignKey: 'coverImage', as: 'coverImageDetails' });
InstituteModel.belongsTo(FileStorageModel, { foreignKey: 'brochure', as: 'brochureDetails' });
InstituteModel.belongsTo(FileStorageModel, { foreignKey: 'profileImage', as: 'profileImageDetails' });
InstituteModel.belongsTo(FileStorageModel, { foreignKey: 'pdfId', as: 'pdfDetails' });

InstituteModel.hasMany(RulesRegilationModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    sourceKey: 'id',
    as: 'rulesRegulations',
});

InstituteModel.hasMany(RoleModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    sourceKey: 'id',
    as: 'roles',
});

RoleModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    targetKey: 'id',
    as: 'institute',
});

InstituteModel.hasMany(WorkingDayModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    sourceKey: 'id',
    as: 'workingDays',
});

InstituteModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

InstituteModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

InstituteModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default InstituteModel;
