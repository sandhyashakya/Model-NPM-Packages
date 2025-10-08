import {
    FindOptions,
    WhereOptions,
    Model,
    ModelStatic,
    UpdateOptions,
    BulkCreateOptions,
    DestroyOptions,
    CreateOptions,
    Identifier,
    UpsertOptions,
    CountOptions,
} from 'sequelize';
import { ISequelizeCommanService } from '../Contracts/ISequelizeCommanService';

// import { TPaginastionOptions } from '../../types/commanType';
import { TPaginastionOptions } from '@kipipackages/interfaces';

import { PAGINATION, PAGINATION_ORDER } from '../../constants/app';

export default class SequelizeCommanService<T extends Model> implements ISequelizeCommanService<T> {
    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }
    findByPk(identifier: Identifier, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'] | null> {
        try {
            return this.model.findByPk(identifier, options);
        } catch (err) {
            throw err;
        }
    }
    findAll = (where: WhereOptions<T['_attributes']>, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'][]> => {
        try {
            const finalOptions: FindOptions<T['_attributes']> = {
                ...(options || {}),
                order: options?.order || PAGINATION_ORDER,
            };
            return this.model.findAll({ where, ...finalOptions });
        } catch (err) {
            throw err;
        }
    };
    findAllWithPagiation = async (
        where: WhereOptions<T['_attributes']>,
        options?: FindOptions<T['_attributes']>,
    ): Promise<TPaginastionOptions<T['_attributes']>> => {
        try {
            if (!options) options = {};
            const limit = options.limit || PAGINATION.LIMIT;
            const currentPage = options.page || PAGINATION.PAGE;

            // Clean options for count()
            const countOptions = { ...options };
            // options.subQuery = false;
            delete countOptions.order;
            delete countOptions.limit;
            delete countOptions.offset;

            const totalRecords = await this.model.count({
                where,
                include: options.include,
                distinct: true,
            });
            const totalPages = Math.ceil(totalRecords / limit);

            // Apply pagination + order for findAll
            options.limit = limit;
            options.offset = (currentPage - 1) * limit;
            options.order = options.order || PAGINATION_ORDER;

            const listOfRecords = await this.findAll(where, options);

            const paginationOptions = {
                limit,
                totalRecords,
                totalPages,
                hasPreviousPage: currentPage - 1 > 0 ? true : false,
                currentPage: currentPage > totalPages ? totalPages : currentPage,
                hasNextPage: currentPage < totalPages,
                recordList: listOfRecords,
            };
            return paginationOptions;
        } catch (err) {
            throw err;
        }
    };
    findOne = async (where: WhereOptions<T['_attributes']>, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'] | null> => {
        try {
            return this.model.findOne({ where, ...options });
        } catch (err) {
            throw err;
        }
    };

    update = async (
        where: WhereOptions<T['_attributes']>,
        updateData: Partial<T['_attributes']>,
        options?: Omit<UpdateOptions, 'where'>,
    ): Promise<[number]> => {
        try {
            return this.model.update(updateData, { where, ...options });
        } catch (err) {
            throw err;
        }
    };

    upsert = async (
        conflictWhere: WhereOptions<T['_attributes']>,
        updateData: T['_creationAttributes'],
        options?: Partial<UpsertOptions>,
    ): Promise<[T['_attributes'], boolean | null]> => {
        try {
            return this.model.upsert(updateData, { conflictWhere, ...options });
        } catch (err) {
            throw err;
        }
    };

    create = async (createData: T['_creationAttributes'], options?: CreateOptions): Promise<T['_attributes']> => {
        try {
            return this.model.create(createData, options);
        } catch (err) {
            throw err;
        }
    };

    bulkCreate = async (createData: T['_creationAttributes'][], options?: BulkCreateOptions<T['_attributes']>): Promise<T['_attributes'][]> => {
        try {
            return this.model.bulkCreate(createData, options);
        } catch (err) {
            throw err;
        }
    };

    delete = async (where: WhereOptions<T['_attributes']>, options?: DestroyOptions<T['_attributes']>): Promise<number> => {
        try {
            return this.model.destroy({ where, ...options });
        } catch (err) {
            throw err;
        }
    };

    count = (where: WhereOptions<T['_attributes']>, options?: CountOptions<T['_attributes']>): Promise<number> => {
        try {
            return this.model.count({ where, ...options });
        } catch (err) {
            throw err;
        }
    };
}
