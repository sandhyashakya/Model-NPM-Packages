'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('entity_group', 'institute_id', {
        type: Sequelize.UUID,
        allowNull: true,
    });

    await queryInterface.addColumn('entity_group', 'is_default', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    });
};

const down = async queryInterface => {
    await queryInterface.removeColumn('entity_group', 'institute_id');
    await queryInterface.removeColumn('entity_group', 'is_default');
};

module.exports = { up, down };
