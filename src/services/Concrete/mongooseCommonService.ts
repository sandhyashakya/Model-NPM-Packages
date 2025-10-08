import {
    FilterQuery,
    UpdateQuery,
    Document,
    QueryOptions,
    Model as MongooseModel,
    PopulateOptions,
    MongooseUpdateQueryOptions,
    UpdateWriteOpResult,
    ClientSession,
    CreateOptions,
} from 'mongoose';

// import { TPaginastionOptions } from '../../types/commanType';
import { TPaginastionOptions } from '@kipipackages/interfaces';

import { IMongooseCommonService } from '../Contracts/IMongooseCommonService';
import { PAGINATION, PAGINATION_ORDER } from '../../constants/app';
import { PipelineStage } from 'mongoose';

export class MongooseCommonService<T extends Document> implements IMongooseCommonService<T> {
    private model: MongooseModel<T>;

    constructor(model: MongooseModel<T>) {
        this.model = model;
    }

    async findAll(filter: FilterQuery<T>, options: QueryOptions = {}, populate?: PopulateOptions | PopulateOptions[]): Promise<T[]> {
        const query = this.model.find(filter, null, options);
        if (populate) query.populate(populate);
        return query.exec();
    }

    async findOne(filter: FilterQuery<T>, options: QueryOptions = {}, populate?: PopulateOptions | PopulateOptions[]): Promise<T | null> {
        const query = this.model.findOne(filter, null, options);
        if (populate) query.populate(populate);
        return query.exec();
    }

    async findById(id: string, options: QueryOptions = {}, populate?: PopulateOptions | PopulateOptions[]): Promise<T | null> {
        const query = this.model.findById(id, null, options);
        if (populate) query.populate(populate);
        return query.exec();
    }

    findAllWithPagination = async (
        filter: FilterQuery<T>,
        options: QueryOptions = {},
        populate?: PopulateOptions | PopulateOptions[],
    ): Promise<TPaginastionOptions<T>> => {
        try {
            const convertOrderToSort = (order: [string, string][]): Record<string, 1 | -1> => {
                const sort: Record<string, 1 | -1> = {};
                for (const [key, direction] of order) {
                    sort[key] = direction.toUpperCase() === 'DESC' ? -1 : 1;
                }
                return sort;
            };

            const { order, projection, ...restOptions } = options;

            let { page, limit } = options;

            const sort = convertOrderToSort(order || PAGINATION_ORDER);

            // Ensure page and limit are positive integers
            page = Math.max(1, page || PAGINATION.PAGE);
            limit = Math.max(1, limit || PAGINATION.LIMIT);

            // Calculate offset
            const skip = (page - 1) * limit;

            // Count total records
            const totalRecords = await this.model.countDocuments(filter).exec();
            const totalPages = Math.ceil(totalRecords / limit);

            // Query the records
            const query = this.model.find(filter, projection, {
                ...restOptions,
                limit,
                skip,
                sort,
            });

            // Apply populate if necessary
            if (populate) {
                query.populate(populate);
            }

            const recordList = await query.exec();

            // Construct the pagination result
            const paginationOptions: TPaginastionOptions<T> = {
                limit,
                totalRecords,
                totalPages,
                hasPreviousPage: page > 1,
                currentPage: Math.min(page, totalPages),
                hasNextPage: page < totalPages,
                recordList,
            };

            return paginationOptions;
        } catch (err) {
            throw err;
        }
    };

    async count(filter: FilterQuery<T>): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }

    async update(
        filter: FilterQuery<T>,
        updateData: UpdateQuery<T>,
        options: MongooseUpdateQueryOptions<T> & { userId?: string; session?: ClientSession } = { new: true },
    ): Promise<UpdateWriteOpResult | null> {
        return this.model.updateMany(filter, updateData, options).exec();
    }

    async upsert(
        filter: FilterQuery<T>,
        updateData: UpdateQuery<T>,
        options: QueryOptions & { userId?: string; session?: ClientSession } = { upsert: true, new: true },
    ): Promise<T | null> {
        return this.model.findOneAndUpdate(filter, updateData, options).exec();
    }

    async create(createData: Partial<T>, options: CreateOptions & { userId?: string; session?: ClientSession } = {}): Promise<T> {
        const [createdDoc] = await this.model.create([{ ...createData, createdBy: options.userId }], options);
        return createdDoc as T;
    }

    async bulkCreate(createData: Partial<T>[], options: CreateOptions & { userId?: string; session?: ClientSession } = {}): Promise<T[]> {
        return this.model.create(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createData.map((data: any) => {
                data.createdBy = options.userId;
                return data;
            }),
            options,
        );
    }

    async delete(
        filter: FilterQuery<T>,
        options: MongooseUpdateQueryOptions<T> & { userId?: string; session?: ClientSession } = { new: true },
    ): Promise<UpdateWriteOpResult | null> {
        return this.model.updateMany(filter, { deletedBy: options.userId, deletedAt: new Date() }, options).exec();
    }

    async aggregate(pipeline: PipelineStage[]): Promise<{ [key: string]: string | number | object }[]> {
        return this.model.aggregate(pipeline).exec();
    }
}
