/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const HomeworkModule = {
    name: 'Homework',
    code: 'HOMEWORK',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Homework Management',
            code: 'HOMEWORK.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'HOMEWORK.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'HOMEWORK.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'HOMEWORK.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'HOMEWORK.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Check Homework',
            code: 'HOMEWORK.ASSIGN',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                // { name: 'Add', code: 'HOMEWORK.ASSIGN.ADD' },
                { name: 'Update', code: 'HOMEWORK.ASSIGN.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'HOMEWORK.ASSIGN.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Delete', code: 'HOMEWORK.ASSIGN.DELETE' },
            ],
        },
        // {
        //     name: 'Homework Summary',
        //     code: 'HOMEWORK.SUMMARY',
        //     actions: [
        //         { name: 'View', code: 'HOMEWORK.SUMMARY.VIEW' },
        //         { name: 'Update', code: 'HOMEWORK.SUMMARY.UPDATE' },
        //         { name: 'Delete', code: 'HOMEWORK.SUMMARY.DELETE' },
        //     ],
        // },
    ],
};

module.exports = HomeworkModule;
