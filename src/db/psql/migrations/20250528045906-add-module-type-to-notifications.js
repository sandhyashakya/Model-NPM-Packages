'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('notifications', 'moduleType', {
            type: Sequelize.ENUM('ANNOUNCEMENT', 'INSTITUTE_JOINING_REQUEST'),
            allowNull: true,
        });
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('notifications', 'moduleType');
    },
};
