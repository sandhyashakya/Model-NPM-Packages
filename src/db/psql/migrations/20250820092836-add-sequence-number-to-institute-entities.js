'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableInfo = await queryInterface.describeTable('institute_entities');

        if (!tableInfo.sequence_number) {
            await queryInterface.addColumn('institute_entities', 'sequence_number', {
                type: Sequelize.INTEGER,
                allowNull: true,
            });
        }
    },

    down: async queryInterface => {
        await queryInterface.removeColumn('institute_entities', 'sequence_number');
    },
};
