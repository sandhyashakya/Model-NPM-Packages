import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, OFFER_NAME, OFFER_TYPE } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IOffersModelAttributes, TOfferModelCreationAttributes } from '@kipipackages/interfaces';

// const instituteService = container.resolve<IInstituteService>(InstituteService);
// const userService = container.resolve<IUserService>(UserService);
class OfferModel extends Model<IOffersModelAttributes, TOfferModelCreationAttributes> {
    declare id: string;
    declare type: OFFER_TYPE;
    declare offerType: OFFER_NAME;
    declare status?: COMMAN_STATUS;
    declare userId?: string;
    declare instituteId: string;
    declare name?: string;
    declare description?: string;
    declare discount: number;
    declare maximumDiscount?: number;
    declare minimumFee?: number;
    declare startTime?: Date;
    declare endTime?: Date;
    declare userLimit?: number;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
OfferModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(OFFER_TYPE),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        offerType: {
            type: DataTypes.STRING,
            defaultValue: OFFER_NAME.FEE,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        maximumDiscount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        minimumFee: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        userLimit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            // defaultValue: 1,
        },
    },
    {
        modelName: 'OfferModel',
        tableName: 'offers',
        timestamps: true,
        sequelize,
    },
);

OfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'offerUser',
});

UserModel.hasMany(OfferModel, { foreignKey: 'userId', as: 'userHasOffers' });

OfferModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'offerInstitute',
});

InstituteModel.hasMany(OfferModel, { foreignKey: 'instituteId', as: 'instituteHasOffers' });

OfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

OfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

OfferModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

// const beforeCreateOrUpdateHook = async (offer: OfferModel) => {
//     if (offer.instituteId) {
//         const institute = await instituteService.findByPk(offer.instituteId);
//         if (!institute) {
//             throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
//         }
//     }
//     if (offer.userId) {
//         const user = await userService.findByPk(offer.userId);
//         if (!user) {
//             throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
//         }
//     }
// };
// OfferModel.beforeCreate(beforeCreateOrUpdateHook);
// OfferModel.beforeUpdate(beforeCreateOrUpdateHook);

export default OfferModel;
