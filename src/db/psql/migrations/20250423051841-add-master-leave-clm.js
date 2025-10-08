'use strict';

/** @type {import('sequelize-cli').Migration} */
const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'master_leaves',
            addFields: [
                {
                    fieldName: 'status',
                    type: {
                        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
                        defaultValue: 'ACTIVE',
                        allowNull: true,
                    },
                },
                {
                    fieldName: 'leave',
                    type: {
                        type: Sequelize.ENUM('PAID', 'UN_PAID'),
                        defaultValue: 'PAID',
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
            tableName: 'master_leaves',
            addFields: [
                {
                    fieldName: 'status',
                    type: {
                        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
                        defaultValue: 'ACTIVE',
                        allowNull: true,
                    },
                },
                {
                    fieldName: 'leave',
                    type: {
                        type: Sequelize.ENUM('PAID', 'UN_PAID'),
                        defaultValue: 'PAID',
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
