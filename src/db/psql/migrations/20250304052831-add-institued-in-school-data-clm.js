'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'institutes',
            addFields: [
                {
                    fieldName: 'type',
                    type: {
                        type: Sequelize.ENUM(
                            'SAINIK_SCHOOL',
                            'OTHER_GOVERNMENT_DEPARTMENTS',
                            'GOVERNMENT',
                            'SELF_FINANCED',
                            'SALARY_AIDED',
                            'GRANT_AIDED_PARTIAL',
                            'GRANT_AIDED_FULL',
                            'OTHERS',
                        ),
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'subType',
                    type: {
                        type: Sequelize.ENUM(
                            'SAINIK_SCHOOL',
                            'OTHER_GOVERNMENT_DEPARTMENTS',
                            'GOVERNMENT',
                            'SELF_FINANCED',
                            'SALARY_AIDED',
                            'GRANT_AIDED_PARTIAL',
                            'GRANT_AIDED_FULL',
                            'OTHERS',
                        ),
                        allowNull: true,
                        field: 'sub_type',
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'area',
                    type: {
                        type: Sequelize.STRING,
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
            tableName: 'institutes', // Table name
            addFields: [
                {
                    fieldName: 'type',
                    type: {
                        type: Sequelize.ENUM(
                            'SAINIK_SCHOOL',
                            'OTHER_GOVERNMENT_DEPARTMENTS',
                            'GOVERNMENT',
                            'SELF_FINANCED',
                            'SALARY_AIDED',
                            'GRANT_AIDED_PARTIAL',
                            'GRANT_AIDED_FULL',
                            'OTHERS',
                        ),
                        allowNull: true,
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'subType',
                    type: {
                        type: Sequelize.ENUM(
                            'SAINIK_SCHOOL',
                            'OTHER_GOVERNMENT_DEPARTMENTS',
                            'GOVERNMENT',
                            'SELF_FINANCED',
                            'SALARY_AIDED',
                            'GRANT_AIDED_PARTIAL',
                            'GRANT_AIDED_FULL',
                            'OTHERS',
                        ),
                        allowNull: true,
                        field: 'sub_type',
                        defaultValue: null,
                    },
                },
                {
                    fieldName: 'area',
                    type: {
                        type: Sequelize.STRING,
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
