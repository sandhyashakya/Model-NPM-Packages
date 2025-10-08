import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

import { COMMAN_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import FloorManagementModel from './floorManagementModel';
import TypeManagementModel from './typeManagementModel';
import { IClassRoomModelAttributes, TClassRoomModelCreationAttributes } from '@kipipackages/interfaces';

class ClassRoomModel extends Model<IClassRoomModelAttributes, TClassRoomModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare classroomNumber: string;
    declare status: COMMAN_STATUS;
    declare capacity: number;
    declare color: string;
    declare instituteId: string;
    declare floorId: string;
    declare typeManagementId?: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
ClassRoomModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        classroomNumber: {
            type: DataTypes.STRING(),
            field: 'classroom_number',
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: false,
        },
        floorId: {
            type: DataTypes.UUID,
            field: 'floor_id',
            allowNull: true,
        },
        typeManagementId: {
            type: DataTypes.UUID,
            field: 'type_management_id',
            allowNull: true,
        },
    },
    {
        modelName: 'ClassRoomModel',
        tableName: 'class_rooms',
        timestamps: true,
        sequelize,
    },
);

ClassRoomModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ClassRoomModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ClassRoomModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
ClassRoomModel.belongsTo(TypeManagementModel, {
    foreignKey: {
        name: 'typeManagementId',
    },
    as: 'classType',
});

TypeManagementModel.hasMany(ClassRoomModel, {
    foreignKey: {
        name: 'typeManagementId',
    },
    as: 'typeHasClass',
});

ClassRoomModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

ClassRoomModel.belongsTo(FloorManagementModel, {
    foreignKey: {
        name: 'floorId',
    },
    as: 'floordetails',
});

InstituteModel.hasMany(ClassRoomModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'classrooms',
});

FloorManagementModel.hasMany(ClassRoomModel, {
    foreignKey: {
        name: 'floorId',
    },
    as: 'classrooms',
});

export default ClassRoomModel;
