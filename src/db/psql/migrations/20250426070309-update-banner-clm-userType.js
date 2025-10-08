'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'banners',
            addFields: [
                {
                    fieldName: 'user_type',
                    type: {
                        type: Sequelize.ENUM('MASTER_ADMIN', 'ADMIN', 'INSTITUTE_MASTER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER', 'STUDENT', 'PARENTS'),
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
            tableName: 'banners',
            addFields: [
                {
                    fieldName: 'user_type',
                    type: {
                        type: Sequelize.ENUM('MASTER_ADMIN', 'ADMIN', 'INSTITUTE_MASTER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER', 'STUDENT', 'PARENTS'),
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
