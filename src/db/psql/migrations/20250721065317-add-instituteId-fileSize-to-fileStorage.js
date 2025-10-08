'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('file_storage', 'institute_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });

        await queryInterface.addColumn('file_storage', 'file_size', {
            type: Sequelize.FLOAT,
            allowNull: true,
        });

        await queryInterface.addColumn('file_storage', 'storage_user_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('file_storage', 'institute_id');
        await queryInterface.removeColumn('file_storage', 'file_size');
        await queryInterface.removeColumn('file_storage', 'storage_user_id');
    },
};
