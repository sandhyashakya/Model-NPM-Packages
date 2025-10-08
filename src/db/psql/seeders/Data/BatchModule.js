// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const BatchModule = {
    name: 'Batch',
    code: 'BATCH',
    appType: [appTypeEnum.INSTITUTE_APP],
    features: [
        {
            name: 'Batch Management',
            code: 'BATCH.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'BATCH.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'BATCH.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'BATCH.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'BATCH.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Print', code: 'BATCH.MANAGEMENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Approval', code: 'BATCH.MANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP] },
            ],
        },
        // {
        //     name: 'Batch Assignment',
        //     code: 'BATCH.ASSIGNMENT',
        //     actions: [
        //         { name: 'Add', code: 'BATCH.ASSIGNMENT.ADD' },
        //         { name: 'Update', code: 'BATCH.ASSIGNMENT.UPDATE' },
        //         { name: 'View', code: 'BATCH.ASSIGNMENT.VIEW' },
        //         { name: 'Delete', code: 'BATCH.ASSIGNMENT.DELETE' },
        //     ],
        // },
    ],
};

module.exports = BatchModule;
