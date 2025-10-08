'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const tableName = 'fee_history';
    const columnName = 'fee_type_id';

    const tableDescription = await queryInterface.describeTable(tableName);

    // Remove the old column if it exists
    if (tableDescription[columnName]) {
        await queryInterface.removeColumn(tableName, columnName);
    }

    // Add the new column with ARRAY(UUID)
    await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: true,
        defaultValue: Sequelize.literal('ARRAY[]::UUID[]'),
        field: columnName,
    });
};

const down = async (queryInterface, Sequelize) => {
    const tableName = 'fee_history';
    const columnName = 'fee_type_id';

    const tableDescription = await queryInterface.describeTable(tableName);

    // Remove the ARRAY column if it exists
    if (tableDescription[columnName]) {
        await queryInterface.removeColumn(tableName, columnName);
    }

    // Add the original UUID column back
    await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.UUID,
        allowNull: true,
        field: columnName,
    });
};

module.exports = { up, down };
