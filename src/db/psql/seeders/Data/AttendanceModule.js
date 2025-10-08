/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const AttendanceModule = {
    name: 'Attendance',
    code: 'ATTENDANCE',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        // {
        //     name: 'Mark Attendance',
        //     code: 'ATTENDANCE.MARKATTENDANCE',
        //     actions: [
        //         { name: 'Add', code: 'ATTENDANCE.MARKATTENDANCE.ADD' },
        //         { name: 'Update', code: 'ATTENDANCE.MARKATTENDANCE.UPDATE' },
        //         { name: 'View', code: 'ATTENDANCE.MARKATTENDANCE.VIEW' },
        //         { name: 'Delete', code: 'ATTENDANCE.MARKATTENDANCE.DELETE' },
        //     ],
        // },
        {
            name: 'Attendance Management',
            code: 'ATTENDANCE.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ATTENDANCE.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ATTENDANCE.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ATTENDANCE.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ATTENDANCE.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'ATTENDANCE.MANAGEMENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Teacher Attendance Management',
            code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'ATTENDANCE.TEACHERATTENDANCEMANAGEMENT.PRINT', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Staff Attendance Management',
            code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'ATTENDANCE.STAFFATTENDANCEMANAGEMENT.PRINT', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = AttendanceModule;
