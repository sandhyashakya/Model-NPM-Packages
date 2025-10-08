// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const TimetableModule = {
    name: 'Timetable',
    code: 'TIMETABLE',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        // {
        //     name: 'Create Timetable',
        //     code: 'TIMETABLE.CREATETIMETABLE',
        //     actions: [
        //         { name: 'Add', code: 'TIMETABLE.CREATETIMETABLE.ADD' },
        //         { name: 'Update', code: 'TIMETABLE.CREATETIMETABLE.UPDATE' },
        //         { name: 'View', code: 'TIMETABLE.CREATETIMETABLE.VIEW' },
        //         { name: 'Delete', code: 'TIMETABLE.CREATETIMETABLE.DELETE' },
        //     ],
        // },
        // {
        //     name: 'View Timetable',
        //     code: 'TIMETABLE.VIEWTIMETABLE',
        //     actions: [
        //         { name: 'View', code: 'TIMETABLE.VIEWTIMETABLE.VIEW' },
        //         { name: 'Update', code: 'TIMETABLE.VIEWTIMETABLE.UPDATE' },
        //         { name: 'Delete', code: 'TIMETABLE.VIEWTIMETABLE.DELETE' },
        //     ],
        // },
        {
            name: 'Manage Timetable',
            code: 'TIMETABLE.MANAGETIMETABLE',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'TIMETABLE.MANAGETIMETABLE.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'TIMETABLE.MANAGETIMETABLE.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'TIMETABLE.MANAGETIMETABLE.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'TIMETABLE.MANAGETIMETABLE.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'TIMETABLE.MANAGETIMETABLE.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'TIMETABLE.MANAGETIMETABLE.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = TimetableModule;
