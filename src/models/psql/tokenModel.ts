import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { TOKEN_TYPES } from '../../constants/app';
import { ITokenAttributes } from '@kipipackages/interfaces';

class TokenModel extends Model<ITokenAttributes> implements ITokenAttributes {
    declare id: string;
    declare token: string;
    declare userId: string;
    declare type: TOKEN_TYPES;
    declare expiresAt: Date;
    declare blacklisted: boolean;

    declare readonly createdAt: Date;
    declare readonly deletedAt: string;
    declare readonly updatedAt: Date;
}

TokenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expires_at',
        },
        blacklisted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'TokenModel',
        tableName: 'tokens',
        timestamps: true,
    },
);

export default TokenModel;
