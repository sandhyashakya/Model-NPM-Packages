'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'user_has_inventory_history',
            addFields: [
                {
                    fieldName: 'remainingQuantity',
                    type: {
                        type: Sequelize.INTEGER,
                        field: 'remaining_quantity',
                        allowNull: true,
                        defaultValue: 0,
                    },
                },
                {
                    fieldName: 'totalQuantity',
                    type: {
                        type: Sequelize.INTEGER,
                        field: 'total_quantity',
                        allowNull: true,
                        defaultValue: 0,
                    },
                },
            ],
            updateFields: [],
            deleteFields: [],
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

        for (const field of table.updateFields) {
            const columnName = field.type.field || field.fieldName;
            if (tableDescription[columnName]) {
                await queryInterface.changeColumn(table.tableName, columnName, field.type);
            }
        }
        for (const field of table.deleteFields) {
            const columnName = field.type.field || field.fieldName;
            if (tableDescription[columnName]) {
                await queryInterface.removeColumn(table.tableName, columnName);
            }
        }
    }
};

const down = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'user_has_inventory_history',
            addFields: [
                {
                    fieldName: 'remainingQuantity',
                    type: {
                        type: Sequelize.INTEGER,
                        field: 'remaining_quantity',
                        allowNull: true,
                        defaultValue: 0,
                    },
                },
                {
                    fieldName: 'totalQuantity',
                    type: {
                        type: Sequelize.INTEGER,
                        field: 'total_quantity',
                        allowNull: true,
                        defaultValue: 0,
                    },
                },
            ],
            updateFields: [],
            deleteFields: [],
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

        // Add deleted fields back (if necessary)
        for (const field of table.deleteFields) {
            const columnName = field.type.field || field.fieldName;

            if (!tableDescription[columnName]) {
                await queryInterface.addColumn(table.tableName, columnName, field.type);
            }
        }
    }
};

module.exports = { up, down };
