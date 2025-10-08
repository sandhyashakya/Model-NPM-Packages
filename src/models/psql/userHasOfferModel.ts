import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import FeesCollectionModel from './feesCollectionModel';
import OfferModel from './offerModel';
import CourseModel from './courseModel';
import { IUserHasOfferModelAttributes, TUserHasOfferModelCreationAttributes } from '@kipipackages/interfaces';

class UserHasOfferModel extends Model<IUserHasOfferModelAttributes, TUserHasOfferModelCreationAttributes> {
    declare id: string;
    declare userId: string;
    declare instituteId: string;
    declare feeCollectionId: string;
    declare courseId: string;
    declare offerId: string;
    declare discountAmount: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

UserHasOfferModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        offerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        feeCollectionId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        discountAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    },
    {
        modelName: 'UserHasOfferModel',
        tableName: 'user_has_offers',
        timestamps: true,
        sequelize,
    },
);

UserHasOfferModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'userHasOfferInstitute',
});

InstituteModel.hasMany(UserHasOfferModel, { foreignKey: 'instituteId' });

UserHasOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

UserHasOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

UserHasOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

UserHasOfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'offerUser',
});

UserModel.hasMany(UserHasOfferModel, { foreignKey: 'userId', as: 'userHasOffer' });

UserHasOfferModel.belongsTo(FeesCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'offerFeeCollection',
});

FeesCollectionModel.hasMany(UserHasOfferModel, { foreignKey: 'feeCollectionId', as: 'feeCollectionUserHasOffer' });

UserHasOfferModel.belongsTo(OfferModel, {
    foreignKey: {
        name: 'offerId',
        field: 'offer_id',
    },
    as: 'offerHasUserHasOffer',
});

OfferModel.hasMany(UserHasOfferModel, { foreignKey: 'offerId', as: 'userHasOfferOffer' });

UserHasOfferModel.belongsTo(CourseModel, {
    foreignKey: {
        name: 'courseId',
        field: 'course_id',
    },
    as: 'courseHasUserHasOffer',
});

CourseModel.hasMany(UserHasOfferModel, { foreignKey: 'courseId', as: 'userOfferHasCourse' });

export default UserHasOfferModel;
