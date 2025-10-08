'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallets', 'storage_in_bytes', {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('wallets', 'storage_in_bytes', {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0,
        });
    },
};
