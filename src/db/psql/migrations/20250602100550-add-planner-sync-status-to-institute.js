'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'institutes',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
        {
            tableName: 'batches',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
        {
            tableName: 'lectures',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
    ];
    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        for (const field of table.addFields) {
            const columnName = field.type.field || field.fieldName;
            if (!tableDescription[columnName]) {
                await queryInterface.addColumn(table.tableName, columnName, field.type);
            }
        }
    }
};

const down = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'institutes',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
        {
            tableName: 'batches',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
        {
            tableName: 'lectures',
            addFields: [
                {
                    fieldName: 'plannerSyncStatus',
                    type: {
                        type: Sequelize.STRING,
                        field: 'planner_sync_status',
                        allowNull: true,
                        defaultValue: 'PENDING',
                    },
                },
            ],
        },
    ];
    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        for (const field of table.addFields) {
            const columnName = field.type.field || field.fieldName;
            if (tableDescription[columnName]) {
                await queryInterface.removeColumn(table.tableName, columnName);
            }
        }
    }
};

module.exports = { up, down };
