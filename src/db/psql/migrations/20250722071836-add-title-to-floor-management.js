'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('floor_management', 'title', {
            type: Sequelize.STRING,
            allowNull: true,
            default: null,
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('floor_management', 'title');
    },
};
