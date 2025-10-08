import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { BOOLEAN_STATUS, FEE_REMINDER_SETTING_STATUS } from '../../constants/app';
import { IFeeReminderSettingModelAttributes, TFeeReminderSettingModelCreationAttributes } from '@kipipackages/interfaces';

class FeeReminderSettingModel extends Model<IFeeReminderSettingModelAttributes, TFeeReminderSettingModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare templateData: string;
    declare status: FEE_REMINDER_SETTING_STATUS;
    declare typeId: string;
    declare default: BOOLEAN_STATUS;
    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

FeeReminderSettingModel.init(
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
        templateData: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(FEE_REMINDER_SETTING_STATUS)),
            allowNull: false,
            defaultValue: FEE_REMINDER_SETTING_STATUS.INACTIVE,
        },
        default: {
            type: DataTypes.ENUM(...Object.values(BOOLEAN_STATUS)),
            defaultValue: BOOLEAN_STATUS.NO,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        modelName: 'FeeReminderSettingModel',
        tableName: 'fee_reminder_settings',
        timestamps: true,
        sequelize,
    },
);

FeeReminderSettingModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'settingInstitute',
});

InstituteModel.hasMany(FeeReminderSettingModel, { foreignKey: 'instituteId', as: 'instituteReminderSettings' });

FeeReminderSettingModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FeeReminderSettingModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FeeReminderSettingModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default FeeReminderSettingModel;
