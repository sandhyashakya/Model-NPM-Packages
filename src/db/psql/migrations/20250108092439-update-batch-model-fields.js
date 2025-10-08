'use strict';

/** @type {import('sequelize-cli').Migration} */
const dataTables = [
    {
        tableName: 'batches', // Table name
        updateFields: [
            {
                fieldName: 'start_time',
                oldFieldName: 'start_date',
            },
            {
                fieldName: 'end_time',
                oldFieldName: 'end_date',
            },
        ],
    },
];
const up = async queryInterface => {
    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);
        for (const field of table.updateFields) {
            if (tableDescription[field.oldFieldName]) {
                await queryInterface.renameColumn(table.tableName, field.oldFieldName, field.fieldName);
            }
        }
    }
};

const down = async queryInterface => {
    for (const table of dataTables) {
        const tableDescription = await queryInterface.describeTable(table.tableName);
        for (const field of table.updateFields) {
            if (tableDescription[field.fieldName]) {
                await queryInterface.renameColumn(table.tableName, field.fieldName, field.oldFieldName);
            }
        }
    }
};

module.exports = { up, down };
