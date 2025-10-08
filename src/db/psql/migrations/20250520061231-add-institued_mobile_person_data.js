'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'institutes',
            addFields: [
                {
                    fieldName: 'contactPerson',
                    type: {
                        type: Sequelize.STRING,
                        field: 'contact_person',
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'contactPerson2',
                    type: {
                        type: Sequelize.STRING,
                        field: 'contact_person_2',
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'mobile2',
                    type: {
                        type: Sequelize.STRING(10),
                        field: 'mobile_2',
                        allowNull: true,
                        defaultValue: null,
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
            tableName: 'institutes',
            addFields: [
                {
                    fieldName: 'contactPerson',
                    type: {
                        type: Sequelize.STRING,
                        field: 'contact_person',
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'contactPerson2',
                    type: {
                        type: Sequelize.STRING,
                        field: 'contact_person_2',
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'mobile2',
                    type: {
                        type: Sequelize.STRING(10),
                        field: 'mobile_2',
                        allowNull: true,
                        defaultValue: null,
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
