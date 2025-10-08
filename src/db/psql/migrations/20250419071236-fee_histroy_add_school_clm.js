'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'fee_history',
            addFields: [
                {
                    fieldName: 'parentHistoryId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'parent_history_id',
                        ref: {
                            model: 'fee_history',
                            key: 'id',
                        },
                    },
                },
                {
                    fieldName: 'bankAccountId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'bank_account_id',
                        ref: {
                            model: 'bank_account_details',
                            key: 'id',
                        },
                    },
                },
                {
                    fieldName: 'feeTypeId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'fee_type_id',
                        ref: {
                            model: 'fee_type',
                            key: 'id',
                        },
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
            tableName: 'fee_history', // Table name
            addFields: [
                {
                    fieldName: 'parentHistoryId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'parent_history_id',
                        ref: {
                            model: 'fee_history',
                            key: 'id',
                        },
                    },
                },
                {
                    fieldName: 'bankAccountId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'bank_account_id',
                        ref: {
                            model: 'bank_account_details',
                            key: 'id',
                        },
                    },
                },
                {
                    fieldName: 'feeTypeId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'fee_type_id',
                        ref: {
                            model: 'fee_type',
                            key: 'id',
                        },
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
