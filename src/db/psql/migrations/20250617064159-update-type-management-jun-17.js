'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('type_management', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
    });
};

const down = async () => {
    //
};

module.exports = { up, down };
