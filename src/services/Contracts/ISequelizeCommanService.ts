import {
    FindOptions,
    WhereOptions,
    UpdateOptions,
    BulkCreateOptions,
    DestroyOptions,
    CreateOptions,
    Identifier,
    Model,
    UpsertOptions,
    CountOptions,
} from 'sequelize';
// import { TPaginastionOptions } from '../../types/commanType';
import { TPaginastionOptions } from '@kipipackages/interfaces';


export interface IReadService<T extends Model> {
    findAll(where: WhereOptions<T['_attributes']>, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'][]>;
    findOne(where: WhereOptions<T['_attributes']>, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'] | null>;
    findByPk(identifier: Identifier, options?: FindOptions<T['_attributes']>): Promise<T['_attributes'] | null>;
    findAllWithPagiation(
        where: WhereOptions<T['_attributes']>,
        options?: FindOptions<T['_attributes']>,
    ): Promise<TPaginastionOptions<T['_attributes']>>;
    count(where: WhereOptions<T['_attributes']>, options?: CountOptions<T['_attributes']>): Promise<number>;
}

export interface IWriteService<T extends Model> {
    update(where: WhereOptions<T['_attributes']>, updateData: Partial<T['_attributes']>, options?: Partial<UpdateOptions>): Promise<[number]>;
    upsert(
        conflictWhere: WhereOptions<T['_attributes']>,
        updateData: T['_creationAttributes'],
        options?: Partial<UpsertOptions>,
    ): Promise<[T['_attributes'], boolean | null]>;
    create(createData: T['_creationAttributes'], options?: CreateOptions): Promise<T['_attributes']>;
    bulkCreate(createData: T['_creationAttributes'][], options?: BulkCreateOptions<T['_attributes']>): Promise<T['_attributes'][]>;
}

export interface IDeleteService<T extends Model> {
    delete(where: WhereOptions<T['_attributes']>, options?: DestroyOptions<T['_attributes']>): Promise<number>;
}
export interface ISequelizeCommanService<T extends Model> extends IReadService<T>, IWriteService<T>, IDeleteService<T> {}
