/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const SyllabusManagementModule = {
    name: 'Syllabus Management',
    code: 'SYLLABUS',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Syllabus management',
            code: 'SYLLABUS.SYLLABUS',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'SYLLABUS.SYLLABUS.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'SYLLABUS.SYLLABUS.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'SYLLABUS.SYLLABUS.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'SYLLABUS.SYLLABUS.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Approval', code: 'SYLLABUS.SYLLABUS.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Print', code: 'SYLLABUS.SYLLABUS.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Publish', code: 'SYLLABUS.SYLLABUS.PUBLISH', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = SyllabusManagementModule;
