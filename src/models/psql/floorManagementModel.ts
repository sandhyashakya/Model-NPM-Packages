import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import UserModel from './userModel';
import { IFloorManagementModelAttributes, TFloorManagementCreationAttributs } from '@kipipackages/interfaces';

class FloorManagementModel extends Model<IFloorManagementModelAttributes, TFloorManagementCreationAttributs> {
    declare id: string;
    declare title: string;
    declare floorNumber: number;
    declare status: COMMAN_STATUS;
    declare instituteId: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
FloorManagementModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        floorNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'floor_number',
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
    },
    {
        modelName: 'FloorManagementModel',
        tableName: 'floor_management',
        indexes: [
            {
                name: 'institute_floor_id',
                unique: true,
                fields: ['institute_id', 'floor_number'],
                // eslint-disable-next-line camelcase
                where: { deleted_at: null },
            },
        ],
        timestamps: true,
        sequelize,
    },
);

FloorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

FloorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

FloorManagementModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

FloorManagementModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'floorInstitute',
});

InstituteModel.hasMany(FloorManagementModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'instituteFloorList',
});

export default FloorManagementModel;
