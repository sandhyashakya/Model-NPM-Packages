'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableUpdates = [
    {
        tableName: 'type_management', // Table name
        fieldName: 'type',
        newEnumValues: [
            'BATCH',
            'LECTURE',
            'EXAM',
            'PAYMENT',
            'VIDEO',
            'NOTE',
            'LEAVE',
            'ASSIGNMENT',
            'CATEGORY',
            'HOLIDAY',
            'FEES',
            'LESSON',
            'FACILITY',
            'SERVICE_FEE',
            'GENERAL_FEE',
        ],
        oldEnumValues: [
            'BATCH',
            'LECTURE',
            'EXAM',
            'PAYMENT',
            'VIDEO',
            'NOTE',
            'LEAVE',
            'ASSIGNMENT',
            'CATEGORY',
            'HOLIDAY',
            'FEES',
            'LESSON',
            'FACILITY',
        ],
    },
];
const up = async (queryInterface, Sequelize) => {
    for (const table of tableUpdates) {
        const tableDescription = await queryInterface.describeTable(table.tableName);

        if (tableDescription[table.fieldName]) {
            // Step 1: Change column to a neutral type (TEXT)
            await queryInterface.changeColumn(table.tableName, table.fieldName, {
                type: Sequelize.STRING, // Temporary type
                allowNull: true,
            });

            // Step 2: Forcefully drop the ENUM type
            await queryInterface.sequelize.query(
                `ALTER TABLE "${table.tableName}" ALTER COLUMN "${table.fieldName}" TYPE TEXT USING "${table.fieldName}"::text;`,
            );
            await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_${table.tableName}_${table.fieldName}" CASCADE;`);
        }

        // Step 3: Recreate ENUM column with new values
        await queryInterface.changeColumn(table.tableName, table.fieldName, {
            type: Sequelize.ENUM(
                'BATCH',
                'LECTURE',
                'EXAM',
                'PAYMENT',
                'VIDEO',
                'NOTE',
                'LEAVE',
                'ASSIGNMENT',
                'CATEGORY',
                'HOLIDAY',
                'FEES',
                'LESSON',
                'FACILITY',
                'SERVICE_FEE',
                'GENERAL_FEE',
            ),
            allowNull: true,
        });
    }
};

const down = async () => {
    //
};

module.exports = { up, down };
