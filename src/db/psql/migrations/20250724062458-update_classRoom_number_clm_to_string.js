'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('class_rooms', 'title', {
        type: Sequelize.STRING,
        allowNull: true,
    });
    await queryInterface.changeColumn('class_rooms', 'classroom_number', {
        type: Sequelize.STRING,
        allowNull: true,
    });
};

const down = async () => {
    //
};

module.exports = { up, down };
