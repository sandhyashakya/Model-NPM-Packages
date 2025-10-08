'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallets', 'coin', {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallets', 'coin', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        });
    },
};
