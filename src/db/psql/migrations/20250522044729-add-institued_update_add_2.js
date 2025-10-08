'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('institutes', 'address_line_2', {
            type: Sequelize.STRING(1000),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('institutes', 'address_line_2', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
    },
};
