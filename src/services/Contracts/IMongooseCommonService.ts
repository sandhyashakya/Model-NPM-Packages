import {
    FilterQuery,
    UpdateQuery,
    Document,
    QueryOptions,
    PopulateOptions,
    MongooseUpdateQueryOptions,
    UpdateWriteOpResult,
    ClientSession,
    CreateOptions,
} from 'mongoose';
// import * as Interfaces from '@kipipackages/interfaces';
import { TPaginastionOptions } from '@kipipackages/interfaces';

export interface IReadService<T extends Document> {
    findAll(filter: FilterQuery<T>, options?: QueryOptions, populate?: PopulateOptions | PopulateOptions[]): Promise<T[]>;
    findOne(filter: FilterQuery<T>, options?: QueryOptions, populate?: PopulateOptions | PopulateOptions[]): Promise<T | null>;
    findById(id: string, options?: QueryOptions, populate?: PopulateOptions | PopulateOptions[]): Promise<T | null>;
    findAllWithPagination(
        filter: FilterQuery<T>,
        options: QueryOptions,
        populate?: PopulateOptions | PopulateOptions[],
    ): Promise<TPaginastionOptions<T>>;
    count(filter: FilterQuery<T>): Promise<number>;
}

export interface IWriteService<T extends Document> {
    update(
        filter: FilterQuery<T>,
        updateData: UpdateQuery<T>,
        options?: MongooseUpdateQueryOptions<T> & { userId?: string; session?: ClientSession },
    ): Promise<UpdateWriteOpResult | null>;
    upsert(
        filter: FilterQuery<T>,
        updateData: UpdateQuery<T>,
        options?: QueryOptions & { userId?: string; session?: ClientSession },
    ): Promise<T | null>;
    create(createData: Partial<T>, options?: CreateOptions & { userId?: string; session?: ClientSession }): Promise<T>;
    bulkCreate(createData: Partial<T>[], options?: CreateOptions & { userId?: string; session?: ClientSession }): Promise<T[]>;
}

export interface IDeleteService<T extends Document> {
    delete(
        filter: FilterQuery<T>,
        options?: MongooseUpdateQueryOptions<T> & { userId?: string; session?: ClientSession },
    ): Promise<UpdateWriteOpResult | null>;
}

export interface IMongooseCommonService<T extends Document> extends IReadService<T>, IWriteService<T>, IDeleteService<T> {}
