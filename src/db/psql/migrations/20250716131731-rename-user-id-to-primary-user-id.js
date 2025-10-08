'use strict';

module.exports = {
    up: async queryInterface => {
        await queryInterface.renameColumn('lectures', 'user_id', 'primary_user_id');
    },

    down: async queryInterface => {
        await queryInterface.renameColumn('lectures', 'primary_user_id', 'user_id');
    },
};
