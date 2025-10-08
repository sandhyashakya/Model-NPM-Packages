'use strict';

const up = async queryInterface => {
    await queryInterface.removeIndex('syllabus', 'institute_syllabus_id');
};

const down = async queryInterface => {
    await queryInterface.addIndex('syllabus', ['institute_id', 'subject_id'], {
        name: 'institute_syllabus_id',
        unique: true,
        where: {
            // eslint-disable-next-line camelcase
            deleted_at: null,
        },
    });
};

module.exports = { up, down };
