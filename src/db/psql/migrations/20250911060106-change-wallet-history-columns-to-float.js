'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallet_history', 'total_coin', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'coin', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'storage', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'total_storage', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallet_history', 'total_coin', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'coin', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'storage', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });

        await queryInterface.changeColumn('wallet_history', 'total_storage', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },
};
