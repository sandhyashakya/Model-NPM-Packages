'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'roles',
            addFields: [
                {
                    fieldName: 'isInstituteDefault',
                    type: {
                        type: Sequelize.BOOLEAN,
                        allowNull: false,
                        field: 'is_institute_default',
                        defaultValue: false,
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
            tableName: 'roles',
            addFields: [
                {
                    fieldName: 'isInstituteDefault',
                    type: {
                        type: Sequelize.BOOLEAN,
                        allowNull: false,
                        field: 'is_institute_default',
                        defaultValue: false,
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
