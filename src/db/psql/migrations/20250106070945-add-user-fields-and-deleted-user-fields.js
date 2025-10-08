'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    const columns = [
        { name: 'school_name', type: Sequelize.STRING },
        { name: 'board', type: Sequelize.STRING },
        { name: 'medium', type: Sequelize.STRING },
        { name: 'standard', type: Sequelize.STRING },
        { name: 'stream', type: Sequelize.STRING },
        { name: 'school_address', type: Sequelize.STRING },
        { name: 'medical_history', type: Sequelize.STRING },
        { name: 'relation', type: Sequelize.STRING },
    ];

    const tableDescription = await queryInterface.describeTable('users');

    for (const column of columns) {
        if (!tableDescription[column.name]) {
            await queryInterface.addColumn('users', column.name, {
                type: column.type,
                allowNull: true,
            });
        }
    }
};

const down = async queryInterface => {
    const columns = ['school_name', 'board', 'medium', 'standard', 'stream', 'school_address', 'medical_history', 'relation'];

    const tableDescription = await queryInterface.describeTable('users');

    for (const column of columns) {
        if (tableDescription[column]) {
            await queryInterface.removeColumn('users', column);
        }
    }
};

module.exports = { up, down };
