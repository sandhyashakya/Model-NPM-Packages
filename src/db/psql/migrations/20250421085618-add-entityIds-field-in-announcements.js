'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'announcementes',
            addFields: [
                {
                    fieldName: 'entity_ids',
                    type: {
                        type: Sequelize.ARRAY(Sequelize.UUID),
                        defaultValue: [],
                        allowNull: true,
                    },
                },
            ],
        },
        {
            tableName: 'institute_entities',
            addFields: [
                {
                    fieldName: 'code',
                    type: {
                        type: Sequelize.STRING,
                        defaultValue: null,
                        allowNull: true,
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
            tableName: 'announcementes',
            addFields: [
                {
                    fieldName: 'entity_ids',
                    type: {
                        type: Sequelize.ARRAY(Sequelize.UUID),
                        defaultValue: [],
                        allowNull: true,
                    },
                },
            ],
        },
        {
            tableName: 'institute_entities',
            addFields: [
                {
                    fieldName: 'code',
                    type: {
                        type: Sequelize.STRING,
                        defaultValue: null,
                        allowNull: true,
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
