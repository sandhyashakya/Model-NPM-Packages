// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const InstituteModule = {
    name: 'Institute',
    code: 'INSTITUTE',
    appType: [appTypeEnum.INSTITUTE_APP],
    features: [
        // {
        //     name: 'Working Days',
        //     code: 'INSTITUTE.WORKINGDAY',
        //     actions: [
        //         { name: 'Add', code: 'INSTITUTE.WORKINGDAY.ADD' },
        //         { name: 'Update', code: 'INSTITUTE.WORKINGDAY.UPDATE' },
        //         { name: 'View', code: 'INSTITUTE.WORKINGDAY.VIEW' },
        //         { name: 'Delete', code: 'INSTITUTE.WORKINGDAY.DELETE' },
        //     ],
        // },
        // {
        //     name: 'Board of Education',
        //     code: 'INSTITUTE.ENTITIES',
        //     actions: [
        //         { name: 'Add', code: 'INSTITUTE.ENTITIES.ADD' },
        //         { name: 'Update', code: 'INSTITUTE.ENTITIES.UPDATE' },
        //         { name: 'View', code: 'INSTITUTE.ENTITIES.VIEW' },
        //         { name: 'Delete', code: 'INSTITUTE.ENTITIES.DELETE' },
        //     ],
        // },
        {
            name: 'Institute Management',
            code: 'INSTITUTE.INSTITUTE',
            appType: [appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'INSTITUTE.INSTITUTE.ADD', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'INSTITUTE.INSTITUTE.UPDATE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'INSTITUTE.INSTITUTE.VIEW', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'INSTITUTE.INSTITUTE.DELETE', appType: [appTypeEnum.INSTITUTE_APP] },
            ],
        },
        {
            name: 'Institute Registration',
            code: 'INSTITUTE.REGISTRATION',
            appType: [appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'INSTITUTE.REGISTRATION.ADD', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'INSTITUTE.REGISTRATION.UPDATE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'INSTITUTE.REGISTRATION.VIEW', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'INSTITUTE.REGISTRATION.DELETE', appType: [appTypeEnum.INSTITUTE_APP] },
            ],
        },
        // {
        //     name: 'Institute Registration Basic Details',
        //     code: 'INSTITUTE.REGISTRATIONBASIC',
        //     actions: [
        //         { name: 'Add', code: 'INSTITUTE.REGISTRATIONBASIC.ADD' },
        //         { name: 'Update', code: 'INSTITUTE.REGISTRATIONBASIC.UPDATE' },
        //         { name: 'View', code: 'INSTITUTE.REGISTRATIONBASIC.VIEW' },
        //         { name: 'Delete', code: 'INSTITUTE.REGISTRATIONBASIC.DELETE' },
        //     ],
        // },
    ],
};

module.exports = InstituteModule;
