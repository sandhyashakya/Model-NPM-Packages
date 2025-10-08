'use strict';

/** @type {import('sequelize-cli').Migration} */

const up = async (queryInterface, Sequelize) => {
    // 1. Alter the existing column to allow null
    await queryInterface.changeColumn('banners', 'user_type', {
        type: Sequelize.ENUM('MASTER_ADMIN', 'ADMIN', 'INSTITUTE_MASTER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER', 'STUDENT', 'PARENTS'),
        allowNull: true,
        defaultValue: null,
    });
};

const down = async (queryInterface, Sequelize) => {
    // 1. Revert back to NOT NULL if needed
    await queryInterface.changeColumn('banners', 'user_type', {
        type: Sequelize.ENUM('MASTER_ADMIN', 'ADMIN', 'INSTITUTE_MASTER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER', 'STUDENT', 'PARENTS'),
        allowNull: false,
    });
};

module.exports = { up, down };
