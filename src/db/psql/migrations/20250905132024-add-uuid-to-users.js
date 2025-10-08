'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'uuid', {
            type: Sequelize.UUID,
            allowNull: true,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'uuid');
    },
};
