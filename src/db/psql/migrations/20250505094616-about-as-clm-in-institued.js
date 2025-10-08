'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('institutes', 'about_institute', {
            type: Sequelize.STRING(1000),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('institutes', 'about_institute', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
    },
};
