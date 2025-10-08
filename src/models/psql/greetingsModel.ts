import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, GREETING_TYPE } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INSTITUTE_ERROR_MESSAGES } from '../../constants/errorMessages';
import FileStorageModel from './fileStorageModel';
import { IGreetingsModelAttributes, TGreetingsModelCreationAttributes } from '@kipipackages/interfaces';

class GreetingsModel extends Model<IGreetingsModelAttributes, TGreetingsModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare greetingType: GREETING_TYPE;
    declare isDefault: boolean;
    declare templateData: string;
    declare status: COMMAN_STATUS;
    declare title: string;
    declare image: string;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

GreetingsModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        templateData: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        greetingType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
    },
    {
        modelName: 'GreetingsModel',
        tableName: 'greeting',
        timestamps: true,
        sequelize,
    },
);

// Associations
GreetingsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

GreetingsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

GreetingsModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

GreetingsModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'greetingsInstitute',
});

InstituteModel.hasMany(GreetingsModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasGreetings',
});

GreetingsModel.belongsTo(FileStorageModel, {
    foreignKey: {
        name: 'image',
        allowNull: true,
    },
    as: 'greetingsImage',
});

FileStorageModel.hasMany(GreetingsModel, {
    foreignKey: {
        name: 'image',
        allowNull: true,
    },
    as: 'imageHasGreetings',
});

const beforeCreateOrUpdateHook = async (greetings: GreetingsModel) => {
    if (greetings.instituteId) {
        const institute = await InstituteModel.findByPk(greetings.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
};

GreetingsModel.beforeCreate(beforeCreateOrUpdateHook);

GreetingsModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

export default GreetingsModel;
