'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('lectures', 'descriptions', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('lectures', 'descriptions');
    },
};
