/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-require-imports */
const country = require('country-state-city').Country.getCountryByCode('IN');
const state = require('country-state-city').State.getStatesOfCountry('IN');
const city = require('country-state-city').City.getCitiesOfCountry('IN');

module.exports = {
    up: async queryInterface => {
        try {
            let countryList = await queryInterface.sequelize.query(`SELECT * FROM countries WHERE country_code IN ('IN');`);

            if (!countryList[0].length) {
                await queryInterface.bulkInsert('countries', [
                    {
                        country_code: country.isoCode,
                        name: country.name,
                        phone_code: country.phonecode,
                        currency: country.currency,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                ]);
            }
            countryList = await queryInterface.sequelize.query(`SELECT * FROM countries WHERE country_code IN ('IN');`);
            countryList = countryList[0];

            let stateList = await queryInterface.sequelize.query(`SELECT * FROM states WHERE country_code IN ('IN');`);
            if (!stateList[0].length) {
                await queryInterface.bulkInsert(
                    'states',
                    state.map(s => {
                        return {
                            country_code: s.countryCode,
                            name: s.name,
                            state_code: s.isoCode,
                            country_id: countryList.find(c => c.country_code == s.countryCode).id,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                    }),
                );
            }
            stateList = await queryInterface.sequelize.query(`SELECT * FROM states WHERE country_code IN ('IN');`);
            stateList = stateList[0];

            const cityList = await queryInterface.sequelize.query(`SELECT * FROM cities WHERE country_code IN ('IN');`);
            if (!cityList[0].length) {
                await queryInterface.bulkInsert(
                    'cities',
                    city.map(c => {
                        return {
                            country_code: c.countryCode,
                            name: c.name,
                            state_code: c.stateCode,
                            country_id: countryList.find(cs => cs.country_code == c.countryCode).id,
                            state_id: stateList.find(s => s.state_code == c.stateCode).id,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                    }),
                );
            }
        } catch (err) {
            console.log('error while seeding data', err);
        }
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('cities', null, {});
        await queryInterface.bulkDelete('states', null, {});
        await queryInterface.bulkDelete('countries', null, {});
    },
};
