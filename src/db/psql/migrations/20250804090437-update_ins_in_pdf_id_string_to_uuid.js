'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async queryInterface => {
    const dataTables = [
        {
            tableName: 'institutes',
            changeFields: [
                {
                    fieldName: 'pdfId',
                    columnName: 'pdf_id',
                    newType: 'UUID',
                },
            ],
        },
    ];

    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        for (const field of table.changeFields) {
            const { columnName, newType } = field;

            if (tableDescription[columnName]) {
                // Step 1: Drop the default value (important!)
                await queryInterface.sequelize.query(`
          ALTER TABLE "${table.tableName}"
          ALTER COLUMN "${columnName}" DROP DEFAULT;
        `);

                // Step 2: Alter the type to UUID
                await queryInterface.sequelize.query(`
          ALTER TABLE "${table.tableName}"
          ALTER COLUMN "${columnName}" TYPE ${newType} USING "${columnName}"::${newType};
        `);
            }
        }
    }
};

const down = async (queryInterface, Sequelize) => {
    const dataTables = [
        {
            tableName: 'institutes',
            changeFields: [
                {
                    fieldName: 'pdfId',
                    columnName: 'pdf_id',
                    revertType: Sequelize.STRING,
                },
            ],
        },
    ];

    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        for (const field of table.changeFields) {
            const { columnName, revertType } = field;

            if (tableDescription[columnName]) {
                await queryInterface.changeColumn(table.tableName, columnName, {
                    type: revertType,
                    allowNull: true,
                    defaultValue: null,
                });
            }
        }
    }
};

module.exports = { up, down };
