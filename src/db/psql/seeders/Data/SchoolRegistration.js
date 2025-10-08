// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const TimetableModule = {
    name: 'School',
    code: 'SCHOOL',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'School Registration',
            code: 'SCHOOL.REGISTRATION',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'SCHOOL.REGISTRATION.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'SCHOOL.REGISTRATION.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'SCHOOL.REGISTRATION.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'SCHOOL.REGISTRATION.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = TimetableModule;
