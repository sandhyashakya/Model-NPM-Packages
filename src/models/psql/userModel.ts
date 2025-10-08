import { DataTypes, Model, Op, UpdateOptions } from "sequelize";
import { sequelize } from "./index";
import {
  APP_TYPE,
  EMAIL_VERIFICATION,
  MOBILE_VERIFICATION,
  TYPE_OF_USER,
  USER_TYPES,
} from "../../constants/app";
import CountryModel from "./countryModel";
import StateModel from "./stateModel";
import CityModel from "./cityModel";
import TokenModel from "./tokenModel";
import { v4 as uuidv4 } from "uuid";
import {
  IAreaModelAttributes,
  IUserAttributes,
  TAeraModelCreationAttributes,
  TUserCreationAttributes,
} from "@kipipackages/interfaces";
import AreaModel from "./areaModel";
import { getCityAreas } from "../../helpers/utils";
import UniqueNumberCounterModel from "../mongodb/uniqueNumberCounterModel";

class UserModel
  extends Model<IUserAttributes, TUserCreationAttributes>
  implements IUserAttributes
{
  declare id: string;
  declare uuid: string;
  declare firstName: string;
  declare lastName: string;
  declare middleName: string;
  declare email: string;
  declare globalId: string;
  declare password: string;
  declare emailVerification: EMAIL_VERIFICATION;
  declare mobileVerification: MOBILE_VERIFICATION;
  declare appType: APP_TYPE;
  declare type: USER_TYPES;
  declare address1: string;
  declare address2?: string;
  declare gender?: string;
  declare dob?: Date;
  declare bloodGroup?: string;
  declare motherTongue?: string;
  declare otherLanguages?: string;
  declare degree?: string;
  declare college?: string;
  declare passingYear?: string;
  declare pinCode: string;
  declare city: number;
  declare state: number;
  declare country: number;
  declare mobile: string;
  declare roleId: string;
  declare verificationOtp: string;
  declare schoolName?: string;
  declare board?: string;
  declare medium?: string;
  declare standard?: string;
  declare stream?: string;
  declare schoolAddress?: string;
  // declare medicalHistory?: string;
  declare relation?: string;
  declare medications?: string;
  declare knownAllergies?: string;
  declare district?: string;
  declare area?: string;
  // declare userProfileImage?: string;

  declare readonly createdAt: Date;
  declare readonly deletedAt: string;
  declare readonly updatedAt: Date;

  declare createdBy: string;
  declare updatedBy: string;
  declare deletedBy: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static updateById: any;
  // declare addParent: BelongsToManyAddAssociationMixin<UserModel, string>;
  // declare getParents: BelongsToManyGetAssociationsMixin<UserModel>;

  static associate() {}
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: "last_name",
    },
    middleName: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: "middle_name",
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // userProfileImage: {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     field: 'profile_image',
    // },
    mobile: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerification: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "email_varification",
      defaultValue: EMAIL_VERIFICATION.PENDING,
    },
    mobileVerification: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "mobile_varification",
      defaultValue: MOBILE_VERIFICATION.PENDING,
    },
    appType: {
      type: DataTypes.ENUM,
      values: Object.values(APP_TYPE),
      allowNull: true,
      field: "app_type",
      defaultValue: APP_TYPE.INSTITUTE_APP,
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    globalId: {
      type: DataTypes.STRING,
      field: "global_id",
      defaultValue: null,
      allowNull: true,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    motherTongue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otherLanguages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    college: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passingYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "pin_code",
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verificationOtp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "school_name",
    },
    board: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    standard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stream: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schoolAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "school_address",
    },
    knownAllergies: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "known_allergies",
    },
    medications: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "medications",
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    sequelize,
  }
);

UserModel.belongsTo(CountryModel, { foreignKey: "country" });
UserModel.belongsTo(StateModel, { foreignKey: "state" });
UserModel.belongsTo(CityModel, { foreignKey: "city" });
UserModel.hasMany(TokenModel, {
  foreignKey: {
    name: "userId",
    field: "user_id",
    allowNull: false,
  },
  sourceKey: "id",
  as: "tokens",
});

UserModel.belongsTo(UserModel, {
  foreignKey: {
    name: "createdBy",
    allowNull: true,
    field: "created_by",
  },
  as: "createdByUser",
});

UserModel.belongsTo(UserModel, {
  foreignKey: {
    name: "updatedBy",
    allowNull: true,
    field: "updated_by",
  },
  as: "updatedByUser",
});
// UserModel.belongsTo(FileStorageModel, { foreignKey: 'userProfileImage', as: 'userProfileImageDetails' });
UserModel.belongsTo(UserModel, {
  foreignKey: {
    name: "deletedBy",
    allowNull: true,
    field: "deleted_by",
  },
  as: "deletedByUser",
});
// areas for services function
async function upsertArea(city: number) {
  try {
    const exists = await AreaModel.findOne({ where: { city: city } });
    if (!exists) {
      const cityData = await CityModel.findOne({ where: { id: city } });
      if (cityData) {
        const areas: Partial<TAeraModelCreationAttributes>[] =
          await getCityAreas(cityData.name);
        const data = areas.map((name) => ({
          area: name,
          city,
        }));
        await AreaModel.bulkCreate(data as IAreaModelAttributes[]);
      }
    }
  } catch (err) {
    throw err;
  }
}

async function generateGlobalUniqueNumber(
  this: any,
  type: TYPE_OF_USER,
  userType?: USER_TYPES
) {
  const MAX_NUMBER = 99999999;
  let rollNumber = "";

  if (userType && type) {
    const USER_TYPE_PREFIXES: Record<USER_TYPES, string> = {
      [USER_TYPES.MASTER_ADMIN]: "K-MA",
      [USER_TYPES.ADMIN]: "K-ADM",
      [USER_TYPES.INSTITUTE_MASTER_ADMIN]: "K-IMA",
      [USER_TYPES.INSTITUTE_ADMIN]: "K-IA",
      [USER_TYPES.TEACHER]: "K-TEA",
      [USER_TYPES.STUDENT]: "K-STU",
      [USER_TYPES.PARENTS]: "K-PAR",
      [USER_TYPES.DRIVER]: "K-DRI",
    };

    const prefix =
      USER_TYPE_PREFIXES[userType] ||
      `K-${userType.substring(0, 3).toUpperCase()}`;

    let data = await UniqueNumberCounterModel.findOne({
      type: type,
      userType: userType,
      instituteId: null,
    });

    if (!data) {
      data = await UniqueNumberCounterModel.create({
        type: type,
        userType: userType,
        lastRollNumber: 1,
        letterCode: "A",
      });
    } else {
      data.letterCode = data.letterCode || "A";
      if (data.lastRollNumber >= MAX_NUMBER) {
        data.lastRollNumber = 1;
        data.letterCode = getNextLetter(data.letterCode);
      } else {
        data.lastRollNumber += 1;
      }
      await UniqueNumberCounterModel.updateOne(
        { id: data.id },
        {
          $set: {
            lastRollNumber: data.lastRollNumber,
            letterCode: data.letterCode,
          },
        }
      );
    }

    rollNumber = `${prefix}-${data.letterCode}-${String(
      data.lastRollNumber
    ).padStart(8, "0")}`;
  }

  if (type && !userType) {
    const prefix = `K-${type.substring(0, 3).toUpperCase()}`;

    let data = await UniqueNumberCounterModel.findOne({
      type: type,
      userType: null,
      instituteId: null,
    });

    if (!data) {
      data = await UniqueNumberCounterModel.create({
        type: type,
        lastRollNumber: 1,
        letterCode: "A",
      });
    } else {
      data.letterCode = data.letterCode || "A";
      if (data.lastRollNumber >= MAX_NUMBER) {
        data.lastRollNumber = 1;
        data.letterCode = getNextLetter(data.letterCode);
      } else {
        data.lastRollNumber += 1;
      }
      await UniqueNumberCounterModel.updateOne(
        { id: data.id },
        {
          $set: {
            lastRollNumber: data.lastRollNumber,
            letterCode: data.letterCode,
          },
        }
      );
    }

    rollNumber = `${prefix}-${data.letterCode}-${String(
      data.lastRollNumber
    ).padStart(8, "0")}`;
  }

  return rollNumber;
}

const getNextLetter = (current: string): string => {
  const code = current.charCodeAt(0);
  return code >= 90 ? "A" : String.fromCharCode(code + 1);
};

const beforeUpdateHook = async (user: UserModel): Promise<void> => {
  if (user.type === USER_TYPES.PARENTS || user.type === USER_TYPES.STUDENT) {
    user.appType = APP_TYPE.STUDENT_APP;
  }
  if (user.city) {
    upsertArea(user.city);
  }
};
const userBeforeCreateHook = async (user: UserModel): Promise<void> => {
  if (user.type === USER_TYPES.PARENTS || user.type === USER_TYPES.STUDENT) {
    user.appType = APP_TYPE.STUDENT_APP;
  }
  if (user.type) {
    user.globalId = await generateGlobalUniqueNumber(
      TYPE_OF_USER.USER,
      user.type
    );
  }

  user.uuid = uuidv4();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    email: user.email,
    uuid: { [Op.ne]: null }, // uuid must not be null
  };
  const existUuid = await UserModel.findOne({ where });
  if (existUuid) user.uuid = existUuid.uuid;

  if (user.city) {
    upsertArea(user.city);
    if (user.email) {
      user.email = user.email.toLowerCase().trim();
    }
  }
};

UserModel.beforeCreate(userBeforeCreateHook);
UserModel.beforeBulkCreate(async (instances) => {
  for (const instance of instances) {
    await userBeforeCreateHook(instance);
  }
});

UserModel.beforeBulkUpdate(async (options: UpdateOptions) => {
  await beforeUpdateHook(options.attributes);
});

// UserModel.belongsToMany(UserModel, {
//     through: 'user_parents', // The join table
//     as: 'parents',
//     foreignKey: 'userId',
//     otherKey: 'parentId',
// });
export default UserModel;
