'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('batch_subject_project_assessments', 'title', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.addColumn('batch_subject_project_assessments', 'descriptions', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('batch_subject_project_assessments', 'title');
        await queryInterface.removeColumn('batch_subject_project_assessments', 'descriptions');
    },
};
