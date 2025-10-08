import { DataTypes, Model, Op, UpdateOptions } from 'sequelize';
import { sequelize } from './index';
import { COMMAN_STATUS, USER_INSTITUTE_META_STATUS, USER_TYPES } from '../../constants/app';
import UserModel from './userModel';
import InstituteModel from './instituteModel';
import { INSTITUTE_ERROR_MESSAGES, USER_ERROR_MESSAGES, USER_INSTITUTE_META_ERROR_MESSAGES } from '../../constants/errorMessages';
import { capitalizeFirst, fromSnakeCaseToNormalText } from '../../helpers/utils';
import { ITestimonialModelAttributes, IUserAttributes, TTestimonialModelCreationAttributes } from '@kipipackages/interfaces';
import UserInstituteMeta from '../mongodb/userInstituteMetaModel';
import InstituteEntityModel from './instituteEntityModel';



class TestimonialModel extends Model<ITestimonialModelAttributes, TTestimonialModelCreationAttributes> {
    declare id: string;
    declare instituteId: string;
    declare message: string;
    declare userId: string;
    declare status: COMMAN_STATUS;
    declare rating: number;
    declare userType: USER_TYPES;
    declare class?: string | null;

    declare createdBy: string;
    declare updatedBy: string;
    declare deletedBy: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt?: Date;
}

TestimonialModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(COMMAN_STATUS),
            defaultValue: COMMAN_STATUS.ACTIVE,
        },
        userType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(USER_TYPES),
            defaultValue: USER_TYPES.STUDENT,
        },
        instituteId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true,
        },
    },
    {
        modelName: 'TestimonialModel',
        tableName: 'testimonials',
        timestamps: true,
        sequelize,
    },
);

// Associations
TestimonialModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy',
        allowNull: true,
        field: 'created_by',
    },
    as: 'createdByUser',
});

TestimonialModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'updatedBy',
        allowNull: true,
        field: 'updated_by',
    },
    as: 'updatedByUser',
});

TestimonialModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'deletedBy',
        allowNull: true,
        field: 'deleted_by',
    },
    as: 'deletedByUser',
});

TestimonialModel.belongsTo(InstituteModel, {
    foreignKey: 'instituteId',
    as: 'testimonialInstitute',
});

InstituteModel.hasMany(TestimonialModel, {
    foreignKey: 'instituteId',
    as: 'instituteHasTestimonials',
});
TestimonialModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'testimonialUser',
});
UserModel.hasMany(TestimonialModel, {
    foreignKey: 'userId',
    as: 'userHasTestimonials',
});

const beforeCreateOrUpdateHook = async (testimonial: TestimonialModel) => {
    if (testimonial.instituteId) {
        const institute = await InstituteModel.findByPk(testimonial.instituteId);
        if (!institute) {
            throw new Error(INSTITUTE_ERROR_MESSAGES.NOT_FOUND);
        }
    }
    let user: IUserAttributes | null = null;
    if (testimonial.userId) {
        user = await UserModel.findByPk(testimonial.userId);
        if (!user) {
            throw new Error(USER_ERROR_MESSAGES.NOT_FOUND);
        }
        testimonial.userType = user.type;
    }
    testimonial.class = `${fromSnakeCaseToNormalText(testimonial.userType)}`;
    if (testimonial.userId && testimonial.instituteId && testimonial.userType !== USER_TYPES.PARENTS) {
        const meta = await UserInstituteMeta.findOne({
            userId: testimonial.userId,
            instituteId: testimonial.instituteId,
            status: USER_INSTITUTE_META_STATUS.ACCEPTED,
        });
        if (!meta) {
            throw new Error(USER_INSTITUTE_META_ERROR_MESSAGES.NOT_FOUND);
        }
        testimonial.userType = meta.userType;
        let stdDataList = await InstituteEntityModel.findAll({
            where: {
                id: { [Op.in]: meta.entities },
            },
            include: {
                association: 'entityType',
                required: true,
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: 'STANDARD' } },
                        { title: { [Op.iLike]: 'MEDIUM' } },
                        // { title: { [Op.iLike]: 'BOARD' } },
                        // { title: { [Op.iLike]: 'STREAM' } },
                        // { title: { [Op.iLike]: 'SUBJECT' } },
                    ],
                },
            },
        });
        stdDataList = JSON.parse(JSON.stringify(stdDataList));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const className = (stdDataList as any).find((item: any) => item.entityType?.title === 'STANDARD')?.title || null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mediumName = (stdDataList as any).find((item: any) => item.entityType?.title === 'MEDIUM')?.title || null;

        testimonial.class = `${capitalizeFirst(mediumName.substring(0, 3))} Medium ${capitalizeFirst(className)}`;
    }
};

TestimonialModel.beforeCreate(beforeCreateOrUpdateHook);

TestimonialModel.beforeBulkUpdate(async (options: UpdateOptions) => {
    await beforeCreateOrUpdateHook(options.attributes);
});

export default TestimonialModel;
