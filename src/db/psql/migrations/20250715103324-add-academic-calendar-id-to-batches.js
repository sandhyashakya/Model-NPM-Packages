'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('batches', 'academic_calendar_id', {
            type: Sequelize.UUID,
            allowNull: true,
            defaultValue: null,
        });
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('batches', 'academic_calendar_id');
    },
};
