// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const AcademicCalendarModule = {
    name: 'Academic Calendar',
    code: 'ACADEMICCALENDAR',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Academic Year Management',
            code: 'ACADEMICCALENDAR.ACADEMICYEAR',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ACADEMICCALENDAR.ACADEMICYEAR.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ACADEMICCALENDAR.ACADEMICYEAR.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ACADEMICCALENDAR.ACADEMICYEAR.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ACADEMICCALENDAR.ACADEMICYEAR.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'ACADEMICCALENDAR.ACADEMICYEAR.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'ACADEMICCALENDAR.ACADEMICYEAR.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = AcademicCalendarModule;
