'use strict';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface) {
        const tables = await queryInterface.showAllTables();

        for (const table of tables) {
            const columns = await queryInterface.describeTable(table);

            // Add `deleted_by` if it exists
            if (!columns.deleted_by) {
                await queryInterface.addColumn(table, 'deleted_by', {
                    type: DataTypes.UUID,
                    allowNull: true,
                    references: {
                        model: 'users', // 'users' is the table for your User model
                        key: 'id',
                    },
                });
            }

            if (!columns.created_by) {
                await queryInterface.addColumn(table, 'created_by', {
                    type: DataTypes.UUID,
                    allowNull: true,
                    references: {
                        model: 'users', // 'users' is the table for your User model
                        key: 'id',
                    },
                });
            }

            if (!columns.updated_by) {
                await queryInterface.addColumn(table, 'updated_by', {
                    type: DataTypes.UUID,
                    allowNull: true,
                    references: {
                        model: 'users', // 'users' is the table for your User model
                        key: 'id',
                    },
                });
            }

            // Add `deleted_at` if it exists
            if (!columns.deleted_at) {
                await queryInterface.addColumn(table, 'deleted_at', {
                    type: DataTypes.DATE,
                    allowNull: true,
                });
            }
        }
    },

    async down(queryInterface) {
        const tables = await queryInterface.showAllTables();

        for (const table of tables) {
            const columns = await queryInterface.describeTable(table);

            // Remove `deleted_at` if it exists
            if (columns.deleted_at) {
                await queryInterface.removeColumn(table, 'deleted_at');
            }

            // Remove `deleted_by` if it exists
            if (columns.deleted_by) {
                await queryInterface.removeColumn(table, 'deleted_by');
            }

            if (columns.created_by) {
                await queryInterface.removeColumn(table, 'created_by');
            }

            // Remove `deleted_by` if it exists
            if (columns.updated_by) {
                await queryInterface.removeColumn(table, 'updated_by');
            }
        }
    },
};
