'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('type_management', 'is_institute_default', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    });
};

const down = async queryInterface => {
    await queryInterface.removeColumn('type_management', 'is_institute_default');
};

module.exports = { up, down };
