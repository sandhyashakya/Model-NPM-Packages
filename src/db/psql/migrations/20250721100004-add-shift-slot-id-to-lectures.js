'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('lectures', 'shift_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });

        await queryInterface.addColumn('lectures', 'slot_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('lectures', 'shift_id');
        await queryInterface.removeColumn('lectures', 'slot_id');
    },
};
