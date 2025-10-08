module.exports = {
    up: async queryInterface => {
        // Drop existing index if it exists
        await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS unique_invoice_institute;
    `);

        // Create partial unique index
        await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX unique_invoice_institute
      ON fee_history (institute_id, invoice_id)
      WHERE invoice_id IS NOT NULL;
    `);
    },

    down: async queryInterface => {
        // Rollback: Drop the custom index
        await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS unique_invoice_institute;
    `);
    },

    //     CREATE UNIQUE INDEX fee_history_institute_id_invoice_id
    // ON fee_history (institute_id, invoice_id);

    // npx sequelize-cli migration:generate --name recreate-old-full-index

    // module.exports = {
    //   up: async (queryInterface, Sequelize) => {
    //     await queryInterface.addIndex('fee_history', ['institute_id', 'invoice_id'], {
    //       unique: true,
    //       name: 'fee_history_institute_id_invoice_id',
    //     });
    //   },

    //   down: async (queryInterface, Sequelize) => {
    //     await queryInterface.removeIndex('fee_history', 'fee_history_institute_id_invoice_id');
    //   }
    // };
};
