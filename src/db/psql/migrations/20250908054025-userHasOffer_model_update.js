'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'user_has_offers',
            addFields: [
                {
                    fieldName: 'courseId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'course_id',
                        ref: {
                            model: 'courses',
                            key: 'id',
                        },
                    },
                },
            ],
            updateFields: [
                {
                    fieldName: 'feeCollectionId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true, // 👈 set allowNull true here
                        field: 'fee_collection_id',
                        references: {
                            model: 'fees_collections', // change if table name different
                            key: 'id',
                        },
                    },
                },
            ],
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
            tableName: 'user_has_offers',
            addFields: [
                {
                    fieldName: 'courseId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: true,
                        field: 'course_id',
                        ref: {
                            model: 'courses',
                            key: 'id',
                        },
                    },
                },
            ],
            updateFields: [
                {
                    fieldName: 'feeCollectionId',
                    type: {
                        type: Sequelize.UUID,
                        allowNull: false, // rollback to original state (NOT NULL)
                        field: 'fee_collection_id',
                        references: {
                            model: 'fee_collections',
                            key: 'id',
                        },
                    },
                },
            ],
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
