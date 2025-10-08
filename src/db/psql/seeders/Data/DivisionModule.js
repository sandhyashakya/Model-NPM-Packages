// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const BatchModule = {
    name: 'Division',
    code: 'BATCH',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Division Management',
            code: 'BATCH.MANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'BATCH.MANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'BATCH.MANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'BATCH.MANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'BATCH.MANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'BATCH.MANAGEMENT.PRINT', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'BATCH.MANAGEMENT.APPROVAL', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Assign Teacher', code: 'BATCH.MANAGEMENT.ASSIGN', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = BatchModule;
