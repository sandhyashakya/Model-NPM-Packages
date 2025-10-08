/* eslint-disable camelcase */
'use strict';

module.exports = {
    up: async queryInterface => {
        // Check if index already exists
        const [results] = await queryInterface.sequelize.query(`
            SELECT indexname 
            FROM pg_indexes 
            WHERE tablename = 'slots' AND indexname = 'institute_id_name';
        `);

        if (results.length === 0) {
            await queryInterface.addIndex('slots', ['institute_id', 'name', 'type'], {
                name: 'institute_id_name',
                unique: true,
                where: {
                    deleted_at: null,
                },
            });
        }
    },

    down: async queryInterface => {
        await queryInterface.removeIndex('slots', 'institute_id_name');
    },
};
