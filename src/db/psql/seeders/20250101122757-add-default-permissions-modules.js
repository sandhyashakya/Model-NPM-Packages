/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable camelcase */
'use strict';

const uuidv4 = require('uuid').v4;
const allModules = require('./../index');

module.exports = {
    async up(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const existingModules = (
                await queryInterface.sequelize.query(`SELECT * FROM modules WHERE is_default=true;`, { raw: true, transaction })
            )[0];
            const existingFeatures = (
                await queryInterface.sequelize.query(`SELECT * FROM module_features WHERE is_default=true;`, { raw: true, transaction })
            )[0];
            const existingActions = (
                await queryInterface.sequelize.query(`SELECT * FROM feature_actions WHERE is_default=true;`, { raw: true, transaction })
            )[0];

            const newModules = [];
            const newFeatures = [];
            const newActions = [];
            const allModulesListCode = {
                modules: new Set(),
                features: new Set(),
                actions: new Set(),
            };

            for (const module of allModules) {
                if (!module.name || !module.code) {
                    console.error(`Invalid module detected:`, module.name);
                    continue;
                }
                allModulesListCode.modules.add(module.code);
                const moduleAppTypes = module.appType && Array.isArray(module.appType) ? module.appType : [null];

                for (const appType of moduleAppTypes) {
                    // const moduleUniqueKey = `${module.code}-${appType}`;
                    let moduleId = existingModules.find(m => m.code === module.code && m.app_type === appType)?.id;

                    if (!moduleId) {
                        const newModule = {
                            id: uuidv4(),
                            name: module.name,
                            code: module.code,
                            app_type: appType,
                            status: 'ACTIVE',
                            is_default: true,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                        await queryInterface.bulkInsert('modules', [newModule], { transaction });
                        newModules.push(newModule);
                        moduleId = newModule.id;
                    }

                    const features = Array.isArray(module.features) ? module.features : [];
                    for (const feature of features) {
                        if (!feature.name || !feature.code) {
                            console.error(`Invalid feature detected in module ${module.name}:`, feature.name);
                            continue;
                        }
                        allModulesListCode.features.add(feature.code);

                        const featureAppTypes = feature.appType && Array.isArray(feature.appType) ? feature.appType : [appType];

                        for (const fAppType of featureAppTypes) {
                            const featureId = existingFeatures.find(
                                f => f.code === feature.code && f.module_id === moduleId && f.app_type === fAppType,
                            )?.id;
                            let currentFeatureId = featureId;

                            if (!featureId) {
                                const newFeature = {
                                    id: uuidv4(),
                                    name: feature.name,
                                    code: feature.code,
                                    app_type: fAppType,
                                    status: 'ACTIVE',
                                    is_default: true,
                                    module_id: moduleId,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                };
                                await queryInterface.bulkInsert('module_features', [newFeature], { transaction });
                                newFeatures.push(newFeature);
                                currentFeatureId = newFeature.id;
                            }

                            const actions = Array.isArray(feature.actions) ? feature.actions : [];
                            for (const action of actions) {
                                if (!action.name || !action.code) {
                                    console.error(`Invalid action in feature ${feature.name}:`, action);
                                    continue;
                                }
                                allModulesListCode.actions.add(action.code);
                                const actionAppTypes = action.appType && Array.isArray(action.appType) ? action.appType : [fAppType];

                                for (const aAppType of actionAppTypes) {
                                    const alreadyExists = existingActions.some(
                                        a => a.code === action.code && a.feature_id === currentFeatureId && a.app_type === aAppType,
                                    );

                                    if (!alreadyExists) {
                                        const newAction = {
                                            id: uuidv4(),
                                            name: action.name,
                                            code: action.code,
                                            app_type: aAppType,
                                            status: 'ACTIVE',
                                            is_default: true,
                                            module_id: moduleId,
                                            feature_id: currentFeatureId,
                                            created_at: new Date(),
                                            updated_at: new Date(),
                                        };
                                        newActions.push(newAction);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (newActions.length > 0) {
                await queryInterface.bulkInsert('feature_actions', newActions, { transaction });
            }
            // async function findOldCodes(queryInterface, table, validCodes) {
            //     if (validCodes.length === 0) {
            //         // If no codes in the new list, return all old ones
            //         return (await queryInterface.sequelize.query(`SELECT code FROM ${table} WHERE is_default=true`, { raw: true ,transaction }))[0];
            //     }

            //     return (
            //         await queryInterface.sequelize.query(`SELECT code FROM ${table} WHERE is_default=true AND code NOT IN (:codes)`, {
            //             replacements: { codes: validCodes },
            //             raw: true,
            //         })
            //     )[0];
            // }

            // ✅ Delete old entries not in allModulesListCode
            await queryInterface.sequelize.query(`DELETE FROM feature_actions WHERE code NOT IN (:codes)`, {
                replacements: { codes: [...allModulesListCode.actions] },
                transaction,
            });

            await queryInterface.sequelize.query(`DELETE FROM module_features WHERE code NOT IN (:codes)`, {
                replacements: { codes: [...allModulesListCode.features] },
                transaction,
            });

            await queryInterface.sequelize.query(`DELETE FROM modules WHERE code NOT IN (:codes)`, {
                replacements: { codes: [...allModulesListCode.modules] },
                transaction,
            });

            // const oldActionsNotInNew = await findOldCodes(queryInterface, 'feature_actions', [...allModulesListCode.actions]);
            // const oldFeaturesNotInNew = await findOldCodes(queryInterface, 'module_features', [...allModulesListCode.features]);
            // const oldModulesNotInNew = await findOldCodes(queryInterface, 'modules', [...allModulesListCode.modules]);

            // 2️⃣ Log them (or handle however you want)
            // console.log('🚨 Old Actions not in new list:', oldActionsNotInNew);
            // console.log('🚨 Old Features not in new list:', oldFeaturesNotInNew);
            // console.log('🚨 Old Modules not in new list:', oldModulesNotInNew);
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkDelete('feature_actions', { is_default: true }, { transaction });
            await queryInterface.bulkDelete('module_features', { is_default: true }, { transaction });
            await queryInterface.bulkDelete('modules', { is_default: true }, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
};
