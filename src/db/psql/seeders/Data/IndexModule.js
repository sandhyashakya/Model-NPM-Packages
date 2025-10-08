// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const IndexModule = {
    name: 'Teaching Management',
    code: 'INDEX',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Institute Index',
            code: 'INDEX.INSTITUTE',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INDEX.INSTITUTE.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INDEX.INSTITUTE.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INDEX.INSTITUTE.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INDEX.INSTITUTE.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Assign', code: 'INDEX.INSTITUTE.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'INDEX.INSTITUTE.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        // {
        //     name: 'Homework',
        //     code: 'INDEX.HOMEWORK',
        //     appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
        //     actions: [
        //         { name: 'Add', code: 'INDEX.HOMEWORK.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'Update', code: 'INDEX.HOMEWORK.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'View', code: 'INDEX.HOMEWORK.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'Delete', code: 'INDEX.HOMEWORK.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'Print', code: 'INDEX.HOMEWORK.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'Assign', code: 'INDEX.HOMEWORK.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //         { name: 'Active/InActive', code: 'INDEX.HOMEWORK.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
        //     ],
        // },
        // {
        //     name: 'Master Index',
        //     code: 'INDEX.MASTER',
        //     actions: [
        //         { name: 'Add', code: 'INDEX.MASTER.ADD' },
        //         { name: 'Update', code: 'INDEX.MASTER.UPDATE' },
        //         { name: 'View', code: 'INDEX.MASTER.VIEW' },
        //         { name: 'Delete', code: 'INDEX.MASTER.DELETE' },
        //     ],
        // },
        {
            name: 'Batch Index',
            code: 'INDEX.BATCH',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INDEX.BATCH.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INDEX.BATCH.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INDEX.BATCH.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INDEX.BATCH.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Assign', code: 'INDEX.BATCH.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'INDEX.BATCH.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Teacher Chapter Assign',
            code: 'INDEX.ASSIGN',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INDEX.ASSIGN.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INDEX.ASSIGN.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INDEX.ASSIGN.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INDEX.ASSIGN.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Assign', code: 'INDEX.BATCH.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Teacher Index',
            code: 'INDEX.TEACHER',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INDEX.TEACHER.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INDEX.TEACHER.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INDEX.TEACHER.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INDEX.TEACHER.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Assign', code: 'INDEX.TEACHER.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Share Index',
            code: 'INDEX.SHARE',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INDEX.SHARE.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INDEX.SHARE.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INDEX.SHARE.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INDEX.SHARE.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Assign', code: 'INDEX.SHARE.ASSIGN', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = IndexModule;
