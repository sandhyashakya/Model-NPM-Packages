'use strict';

module.exports = {
    up: async queryInterface => {
        return queryInterface.removeColumn('academic_calendars', 'batch_id');
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn('academic_calendars', 'batch_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });
    },
};
