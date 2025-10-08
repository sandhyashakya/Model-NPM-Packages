'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'users',
            addFields: [
                {
                    fieldName: 'known_allergies',
                    type: {
                        type: Sequelize.STRING,
                        allowNull: true,
                        defaultValue: null,
                    },
                },
            ],
            // updateFields: [
            //     {
            //         fieldName: 'medications',
            //         oldFieldName: 'medical_history',
            //         type: {
            //             type: Sequelize.STRING, // Adjust to your actual type
            //             allowNull: true,
            //         },
            //     },
            // ],
            deleteFields: [],
        },
    ];

    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        // Add new columns
        for (const field of table.addFields) {
            if (!tableDescription[field.fieldName]) {
                await queryInterface.addColumn(table.tableName, field.fieldName, field.type);
            }
        }

        // Update (change type or rename)
        // for (const field of table.updateFields) {
        //     if (tableDescription[field.oldFieldName]) {
        //         // Rename column
        //         await queryInterface.renameColumn(table.tableName, field.oldFieldName, field.fieldName);
        //         // Update type
        //         await queryInterface.changeColumn(table.tableName, field.fieldName, field.type);
        //     }
        // }

        // Remove columns if needed
        for (const field of table.deleteFields) {
            if (tableDescription[field.fieldName]) {
                await queryInterface.removeColumn(table.tableName, field.fieldName);
            }
        }
    }
};

const down = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'users',
            addFields: [
                {
                    fieldName: 'known_allergies',
                    type: {
                        type: Sequelize.STRING,
                        allowNull: true,
                        defaultValue: null,
                    },
                },
            ],
            updateFields: [
                {
                    fieldName: 'medications',
                    oldFieldName: 'medical_history',
                    type: {
                        type: Sequelize.STRING, // Original type of `medical_history`
                        allowNull: true,
                    },
                },
            ],
            deleteFields: [],
        },
    ];

    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        // Remove added columns
        for (const field of table.addFields) {
            if (tableDescription[field.fieldName]) {
                await queryInterface.removeColumn(table.tableName, field.fieldName);
            }
        }

        // Revert renamed and type-changed columns
        for (const field of table.updateFields) {
            if (tableDescription[field.fieldName]) {
                // Revert type
                await queryInterface.changeColumn(table.tableName, field.fieldName, field.type);
                // Revert column name
                await queryInterface.renameColumn(table.tableName, field.fieldName, field.oldFieldName);
            }
        }

        // Restore deleted columns if needed
        for (const field of table.deleteFields) {
            if (!tableDescription[field.fieldName]) {
                await queryInterface.addColumn(table.tableName, field.fieldName, field.type);
            }
        }
    }
};

module.exports = { up, down };
