/* eslint-disable camelcase */
'use strict';

module.exports = {
    up: async queryInterface => {
        // Remove the old unique index
        await queryInterface.removeIndex('batch_subject_book_assessments', 'batch_subject_standard_institute');

        // Add the new unique index with `assessment_type`
        await queryInterface.addIndex('batch_subject_book_assessments', {
            name: 'batch_subject_standard_institute_assessment_type',
            unique: true,
            fields: ['batch_id', 'subject_id', 'standard_id', 'institute_id', 'assessment_type'],
            where: {
                deleted_at: null,
            },
        });
    },

    down: async queryInterface => {
        // Remove the updated unique index
        await queryInterface.removeIndex('batch_subject_book_assessments', 'batch_subject_standard_institute_assessment_type');

        // Recreate the old unique index
        await queryInterface.addIndex('batch_subject_book_assessments', {
            name: 'batch_subject_standard_institute',
            unique: true,
            fields: ['batch_id', 'subject_id', 'standard_id', 'institute_id'],
            where: {
                deleted_at: null,
            },
        });
    },
};
