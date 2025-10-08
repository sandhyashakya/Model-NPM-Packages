import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import ApiError from '../../helpers/apiError';
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode';
import { INSTITUTE_ERROR_MESSAGES, TYPE_MANAGEMENT_ERROR_MESSAGES } from '../../constants/errorMessages';
import TypeManagementModel from './typeManagementModel';
import { FACILITY_TYPE, TYPE_MANAGEMENT_TYPE } from '../../constants/app';
import { IFacilityAttributes, TFacilityCreationAttributes } from '@kipipackages/interfaces';

class FacilityModel extends Model<IFacilityAttributes, TFacilityCreationAttributes> {
    declare id: string;
    declare typeManagementId: string;
    declare type: FACILITY_TYPE;
    declare quantity: number;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: string;
}

FacilityModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        typeManagementId: {
            type: DataTypes.UUID,
            field: 'type_management_id',
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(FACILITY_TYPE),
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
    },
    {
        modelName: 'FacilityModel',
        tableName: 'facilities',
        timestamps: true,
        sequelize,
    },
);

const beforeCreateOrUpdateHook = async (facilities: FacilityModel): Promise<void> => {
    if (facilities.instituteId) {
        const institute = await InstituteModel.findByPk(facilities.instituteId);
        if (!institute) throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
    }
    if (facilities.typeManagementId) {
        const type = await TypeManagementModel.findOne({ where: { id: facilities.typeManagementId, type: TYPE_MANAGEMENT_TYPE.FACILITY } });
        if (!type) throw new ApiError(HTTP_STATUS_CODE.BAD_REQUEST, TYPE_MANAGEMENT_ERROR_MESSAGES.NOT_FOUND);
    }
};
FacilityModel.beforeCreate(beforeCreateOrUpdateHook);
FacilityModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});
FacilityModel.beforeBulkCreate(async instances => {
    for (const instance of instances) {
        await beforeCreateOrUpdateHook(instance);
    }
});
FacilityModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
        field: 'institute_id',
    },
    as: 'facilityInstitute',
});

InstituteModel.hasMany(FacilityModel, { foreignKey: 'instituteId', as: 'instituteHasFacilities' });
FacilityModel.belongsTo(TypeManagementModel, {
    foreignKey: {
        name: 'typeManagementId',
        field: 'type_management_id',
    },
    as: 'facilityType',
});

TypeManagementModel.hasMany(FacilityModel, { foreignKey: 'typeManagementId', as: 'instituteHasFacilitiesType' });

FacilityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FacilityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FacilityModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

export default FacilityModel;
