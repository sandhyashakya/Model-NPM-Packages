// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const ExamsAndResultsModule = {
    name: 'Exams and Results',
    code: 'EXAMSRESULTS',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        // {
        //     name: 'Exam Management',
        //     code: 'EXAMSRESULTS.EXAMMANAGEMENT',
        //     appType: [appTypeEnum.INSTITUTE_APP],
        //     actions: [
        //         { name: 'Add', code: 'EXAMSRESULTS.EXAMMANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP] },
        //         { name: 'Update', code: 'EXAMSRESULTS.EXAMMANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP] },
        //         { name: 'View', code: 'EXAMSRESULTS.EXAMMANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP] },
        //         { name: 'Delete', code: 'EXAMSRESULTS.EXAMMANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP] },
        //         { name: 'Print', code: 'EXAMSRESULTS.EXAMMANAGEMENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP] },
        //         { name: 'Approval', code: 'EXAMSRESULTS.EXAMMANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP] },
        //     ],
        // },
        {
            name: 'Online Bulk Exam Management',
            code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                // { name: 'Print', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.PRINT', appType: [appTypeEnum.SCHOOL_APP] },
                // { name: 'Approval', code: 'EXAMSRESULTS.ONLINEBULKEXAMMANAGEMENT.APPROVAL', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Offline Bulk Exam Management',
            code: 'EXAMSRESULTS.OFFLINEBULKEXAMMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.OFFLINEBULKEXAMMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.OFFLINEBULKEXAMMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'EXAMSRESULTS.OFFLINEBULKEXAMMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.OFFLINEBULKEXAMMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Offline Exam Management',
            code: 'EXAMSRESULTS.OFFLINEEXAMMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.OFFLINEEXAMMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.OFFLINEEXAMMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'EXAMSRESULTS.OFFLINEEXAMMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.OFFLINEEXAMMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
            ],
        },
        {
            name: 'Online Exam Management',
            code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP] },
                {
                    name: 'Attend Exam',
                    code: 'EXAMSRESULTS.ONLINEEXAMMANAGEMENT.ATTENDEXAM',
                    appType: [appTypeEnum.SCHOOL_APP, appTypeEnum.INSTITUTE_APP],
                },
            ],
        },
        {
            name: 'Result Management',
            code: 'EXAMSRESULTS.RESULTMANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.RESULTMANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.RESULTMANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'EXAMSRESULTS.RESULTMANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.RESULTMANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'EXAMSRESULTS.RESULTMANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'EXAMSRESULTS.RESULTMANAGEMENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Publish', code: 'EXAMSRESULTS.RESULTMANAGEMENT.PUBLISH', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'syllabus Management',
            code: 'EXAMSRESULTS.SYLLABUS',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'EXAMSRESULTS.SYLLABUS.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'EXAMSRESULTS.SYLLABUS.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'EXAMSRESULTS.SYLLABUS.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'EXAMSRESULTS.SYLLABUS.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Approval', code: 'EXAMSRESULTS.SYLLABUS.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Print', code: 'EXAMSRESULTS.SYLLABUS.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Publish', code: 'EXAMSRESULTS.SYLLABUS.PUBLISH', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        // {
        //     name: 'Group Exam',
        //     code: 'EXAMSRESULTS.GROUPEXAM',
        //     actions: [
        //         { name: 'View', code: 'EXAMSRESULTS.GROUPEXAM.VIEW' },
        //         { name: 'Update', code: 'EXAMSRESULTS.GROUPEXAM.UPDATE' },
        //         { name: 'Delete', code: 'EXAMSRESULTS.GROUPEXAM.DELETE' },
        //         { name: 'Add', code: 'EXAMSRESULTS.GROUPEXAM.ADD' },
        //     ],
        // },
    ],
};

module.exports = ExamsAndResultsModule;
