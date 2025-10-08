'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('institutes', 'mobile', {
        type: Sequelize.STRING,
        allowNull: false, // make it required
    });
};

const down = async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('institutes', 'mobile', {
        type: Sequelize.STRING,
        allowNull: true, // revert to optional
    });
};

module.exports = { up, down };
