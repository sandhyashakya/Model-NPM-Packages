import { DataTypes, Model, Op, Sequelize, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { FEE_PAYMENT_STATUS, PAYMENT_TYPE } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode';
import ApiError from '../../helpers/apiError';
import { FEESCOLLECTION_ERROR_MESSAGES } from '../../constants/errorMessages';
import PaymentTermsModel from './paymentTermsModel';
import AcademicCalendarModel from './academicCalendarModel';
import { IFeesCollectionModelAttributes, TFeesCollectionModelCreationAttributes } from '@kipipackages/interfaces';

class FeesCollectionModel extends Model<IFeesCollectionModelAttributes, TFeesCollectionModelCreationAttributes> {
    declare id: string;
    declare date: Date;
    declare dueDate?: Date;
    declare feeAmount?: number;
    declare paidFee?: number;
    declare discount?: number;
    declare paymentType?: PAYMENT_TYPE;
    declare bankName?: string | null;
    declare chequeNo?: string | null;
    declare userId: string;
    declare instituteId: string;
    declare upiId?: string | null;
    declare status: FEE_PAYMENT_STATUS;
    declare academicCalendarId: string;
    declare isLeft?: boolean;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

FeesCollectionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        feeAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        paidFee: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        chequeNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        upiId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: FEE_PAYMENT_STATUS.PENDING,
        },
        paymentType: {
            type: DataTypes.ENUM,
            values: Object.values(PAYMENT_TYPE),
            allowNull: true,
            // defaultValue: PAYMENT_TYPE.CASH,
        },
        academicCalendarId: {
            type: DataTypes.UUID,
            field: 'academic_calendar_id',
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
        isLeft: {
            type: DataTypes.BOOLEAN,
            field: 'is_left',
            defaultValue: false,
            allowNull: true,
        },
    },
    {
        modelName: 'FeesCollectionModel',
        tableName: 'fees_collections',
        timestamps: true,
        sequelize,
    },
);
const beforeCreateOrUpdateHook = async (feeCollection: FeesCollectionModel): Promise<void> => {
    let existingRecord: FeesCollectionModel | null = null;

    if ((feeCollection.userId && feeCollection.instituteId) || feeCollection.id) {
        if (feeCollection.userId && feeCollection.instituteId) {
            existingRecord = await FeesCollectionModel.findOne({
                where: {
                    userId: feeCollection.userId,
                    instituteId: feeCollection.instituteId,
                },
            });
        } else {
            existingRecord = await FeesCollectionModel.findByPk(feeCollection.id);
        }
        if (existingRecord?.status === FEE_PAYMENT_STATUS.COMPLETED && feeCollection.paidFee) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, FEESCOLLECTION_ERROR_MESSAGES.FEE_PAID);
        }
    } else {
        existingRecord = await FeesCollectionModel.findOne({
            where: {
                userId: feeCollection.userId,
                instituteId: feeCollection.instituteId,
                status: { [Op.ne]: FEE_PAYMENT_STATUS.COMPLETED },
            },
        });
    }

    if (feeCollection.paymentType === PAYMENT_TYPE.CHEQUE) {
        feeCollection.upiId = null;
        if (!feeCollection.chequeNo || !feeCollection.bankName) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, FEESCOLLECTION_ERROR_MESSAGES.FEE_PAID_BY_CHQUE);
        }
    } else if (feeCollection.paymentType === PAYMENT_TYPE.UPI) {
        feeCollection.chequeNo = null;
        feeCollection.bankName = null;
        if (!feeCollection.upiId) {
            throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, FEESCOLLECTION_ERROR_MESSAGES.FEE_PAID_BY_UPI);
        }
    } else if (feeCollection.paymentType === PAYMENT_TYPE.CASH) {
        feeCollection.bankName = null;
        feeCollection.chequeNo = null;
        feeCollection.upiId = null;
    }

    const discount = feeCollection.discount ?? existingRecord?.discount ?? 0;
    const paidFee = feeCollection.paidFee ?? existingRecord?.paidFee ?? 0;
    const feeAmount = feeCollection.feeAmount ?? existingRecord?.feeAmount;
    if (feeAmount !== 0) {
        if (feeAmount === discount + paidFee) {
            feeCollection.status = FEE_PAYMENT_STATUS.COMPLETED;
        }
    }
};

FeesCollectionModel.beforeBulkCreate(async instances => {
    for (const instance of instances) {
        await beforeCreateOrUpdateHook(instance);
    }
});
FeesCollectionModel.beforeCreate(beforeCreateOrUpdateHook);

FeesCollectionModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

FeesCollectionModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'feeCollectionInstitute',
});

InstituteModel.hasMany(FeesCollectionModel, { foreignKey: 'instituteId', as: 'instituteHasFeeCollection' });
FeesCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'userId',
        field: 'user_id',
    },
    as: 'feeCollectionUser',
});

UserModel.hasMany(FeesCollectionModel, { foreignKey: 'userId', as: 'userHasFeeCollection' });

FeesCollectionModel.belongsTo(AcademicCalendarModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'CollectionCalendar',
});
AcademicCalendarModel.hasMany(FeesCollectionModel, {
    foreignKey: {
        name: 'academicCalendarId',
        field: 'academic_calendar_id',
        allowNull: true,
    },
    as: 'CollectionHasCalendar',
});

FeesCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeesCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeesCollectionModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

PaymentTermsModel.belongsTo(FeesCollectionModel, {
    foreignKey: {
        name: 'feeCollectionId',
        field: 'fee_collection_id',
    },
    as: 'feeCollection',
});
FeesCollectionModel.hasMany(PaymentTermsModel, { foreignKey: 'feeCollectionId', as: 'feeCollectionHasPaymentTerms' });

export default FeesCollectionModel;
