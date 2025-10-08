import { DataTypes, Model } from 'sequelize';
import { COMMAN_STATUS } from '../../constants/app';
import InstituteModel from './instituteModel';
import BatchModel from './batchModel';
import { sequelize } from './index';
import UserModel from './userModel';
import InstituteEntityModel from './instituteEntityModel';
import { IHomeWorkModelAttributes, THomeWorkModelCreationAttributes } from '@kipipackages/interfaces';

class HomeWorkModel extends Model<IHomeWorkModelAttributes, THomeWorkModelCreationAttributes> {
    declare id: string;
    declare title: string;
    declare description: string;
    declare status: COMMAN_STATUS;
    declare instituteId: string;
    declare batchId: string;
    declare subjectId: string;
    declare fileStorageId: string[];
    declare submissionDate: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}
HomeWorkModel.init(
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
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        batchId: {
            type: DataTypes.UUID,
            field: 'batch_id',
            allowNull: true,
        },
        subjectId: {
            type: DataTypes.UUID,
            field: 'subject_id',
            allowNull: true,
        },
        fileStorageId: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'filestorage_id',
            allowNull: true,
        },
        submissionDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            values: Object.values(COMMAN_STATUS),
            allowNull: false,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
    },
    {
        modelName: 'HomeWorkModel',
        tableName: 'home_work',
        timestamps: true,
        sequelize,
    },
);

HomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

HomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

HomeWorkModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});
HomeWorkModel.belongsTo(BatchModel, {
    foreignKey: {
        name: 'batchId',
    },
    as: 'batch',
});

BatchModel.hasMany(HomeWorkModel, {
    foreignKey: {
        name: 'batchId',
    },
    as: 'homework',
});

HomeWorkModel.belongsTo(InstituteModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'institute',
});

InstituteModel.hasMany(HomeWorkModel, {
    foreignKey: {
        name: 'instituteId',
    },
    as: 'homework_institute',
});
InstituteEntityModel.hasMany(HomeWorkModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'subjectHomeWorkList',
});

HomeWorkModel.belongsTo(InstituteEntityModel, {
    foreignKey: {
        name: 'subjectId',
        field: 'subject_id',
    },
    as: 'homeWorkSubject',
});

export default HomeWorkModel;
