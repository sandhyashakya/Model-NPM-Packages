import { DataTypes, Model, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { TO_DO_STATUS } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INSTITUTE_ERROR_MESSAGES, USER_ERROR_MESSAGES } from '../../constants/errorMessages';
import { IToDoModelAttributes, TToDoModelCreationAttributes } from '@kipipackages/interfaces';


class ToDoModel extends Model<IToDoModelAttributes, TToDoModelCreationAttributes> {
    declare id: string;
    declare instituteId?: string;
    declare task: string;
    declare userId: string;
    declare dueDate?: Date;
    declare remindMe?: Date;
    declare status: TO_DO_STATUS;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

ToDoModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        task: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        instituteId: {
            type: DataTypes.UUID,
            field: 'institute_id',
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            field: 'due_date',
            allowNull: true,
        },
        remindMe: {
            type: DataTypes.DATE,
            field: 'remind_me',
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(TO_DO_STATUS),
            defaultValue: TO_DO_STATUS.PENDING,
        },
    },
    {
        modelName: 'ToDoModel',
        tableName: 'toDos',
        timestamps: true,
        sequelize,
    },
);

// Associations
ToDoModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

ToDoModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

ToDoModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

ToDoModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'toDoInstitute',
});

InstituteModel.hasMany(ToDoModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasToDos',
});
ToDoModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'toDoUser',
});
UserModel.hasMany(ToDoModel, {
    foreignKey: 'userId',
    as: 'userHasToDos',
});

const beforeCreateOrUpdateHook = async (toDo: ToDoModel) => {
    if (toDo.instituteId) {
        const institute = await InstituteModel.findByPk(toDo.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
    if (toDo.userId) {
        const user = await UserModel.findByPk(toDo.userId);
        if (!user) {
            throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
        }
    }
};

ToDoModel.beforeCreate(beforeCreateOrUpdateHook);

ToDoModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

export default ToDoModel;
