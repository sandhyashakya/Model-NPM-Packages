/* eslint-disable @typescript-eslint/no-explicit-any */
import { BulkCreateOptions, CreateOptions, DestroyOptions, Dialect, Sequelize, UpdateOptions } from 'sequelize';
import postgresConfig from '../../configs/postgresConfig';
import fs from 'fs';
import path from 'path';

const { database, username, password, host, port, dbLogging, dialectOptions } = postgresConfig;
const db: any = {};
const sequelize = new Sequelize(database as string, username as string, password, {
    query: { raw: true },
    host,
    port,
    logging: dbLogging,
    dialect: 'postgres' as Dialect,
    define: {
        timestamps: true,
        underscored: true,
        paranoid: true,
    },
    dialectOptions,
});

// add all models
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.ts')
    .forEach(async file => {
        const model: any = await import(path.join(__dirname, file));
        db[model?.default?.name] = model;
    });

// add all associations
// Object.keys(db).forEach(modelName => {
//     if ('associate' in db[modelName]) {
//         db[modelName].associate(db);
//     }
// });

sequelize.addHook('beforeBulkDestroy', async (options: DestroyOptions) => {
    const userId = options.userId; // Pass the user ID through options
    if (userId) {
        // Fetch all instances matching the delete condition
        const modelName = options.model.name; // Replace 'YourModel' with your model name
        const instances: any[] = await sequelize.models[modelName].findAll({
            where: options.where,
            raw: false,
        });
        for (const instance of instances) {
            if ('deletedBy' in instance || 'deleted_by' in instance) {
                instance.deletedBy = userId;
                // Save the updated instance without triggering additional hooks
                await instance.save({ hooks: false });
            }
        }
    }
});

sequelize.addHook('beforeCreate', async (instance, options: CreateOptions) => {
    const userId = options.userId; // Extract user ID
    if (userId && ('createdBy' in instance || 'created_by' in instance)) {
        (instance as any).createdBy = userId;
    }
});

sequelize.addHook('beforeBulkCreate', async (instances, options: BulkCreateOptions) => {
    const userId = options.userId; // Extract user ID
    if (userId) {
        for (const instance of instances) {
            if ('createdBy' in instance || 'created_by' in instance) {
                (instance as any).createdBy = userId;
            }
        }
    }
});

sequelize.addHook('beforeBulkUpdate', async (options: UpdateOptions) => {
    const userId = options.userId; // Extract user ID from options
    if (userId && options.attributes) {
        // Update the 'updatedBy' or 'updated_by' attribute
        options.attributes['updatedBy'] = userId; // Adjust as per your column name
    }
});

sequelize.addHook('beforeFind', async (options: any) => {
    if (options.include) {
        options.raw = false;
    }
});

export { sequelize, db, Sequelize };
