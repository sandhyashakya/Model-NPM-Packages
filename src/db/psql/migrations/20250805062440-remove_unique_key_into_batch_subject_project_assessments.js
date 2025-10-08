'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // Remove the index
        await queryInterface.removeIndex(
            'batch_subject_project_assessments', // Replace with your actual table name
            'batch_subject_project_assessments_unique',
        );
    },

    async down(queryInterface) {
        // Recreate the index in case of rollback
        await queryInterface.addIndex('batch_subject_project_assessments', {
            name: 'batch_subject_project_assessments_unique',
            unique: true,
            fields: ['batch_id', 'subject_id', 'standard_id', 'institute_id'],
            where: {
                // eslint-disable-next-line camelcase
                deleted_at: null, // Assuming you're using snake_case in DB
            },
        });
    },
};
