// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const UserModule = {
    name: 'User',
    code: 'USER',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Student Management',
            code: 'USER.STUDENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.STUDENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.STUDENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.STUDENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'USER.STUDENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'USER.STUDENT.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'USER.STUDENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail View', code: 'USER.STUDENT.BASICDETAILVIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail Update', code: 'USER.STUDENT.BASICDETAILUPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail Add', code: 'USER.STUDENT.BASICDETAILADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Action', code: 'USER.STUDENT.ACTION', appType: [appTypeEnum.SCHOOL_APP] },

                {
                    name: 'Primary Contact Detail View',
                    code: 'USER.STUDENT.PRIMARYDETAILVIEW',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Update',
                    code: 'USER.STUDENT.PRIMARYDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Add',
                    code: 'USER.STUDENT.PRIMARYDETAILADD',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Document Detail View',
                    code: 'USER.STUDENT.DOCUMENTDETAILVIEW',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Document Detail Update',
                    code: 'USER.STUDENT.DOCUMENTDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Document Detail Add', code: 'USER.STUDENT.DOCUMENTDETAILADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Document Detail Print',
                    code: 'USER.STUDENT.DOCUMENTDETAILPRINT',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
        {
            name: 'Teacher Management',
            code: 'USER.TEACHER',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.TEACHER.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.TEACHER.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.TEACHER.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'USER.TEACHER.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail View', code: 'USER.TEACHER.BASICDETAILVIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail Update', code: 'USER.TEACHER.BASICDETAILUPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail Add', code: 'USER.TEACHER.BASICDETAILADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Experience Detail View', code: 'USER.TEACHER.EXPERIENCEVIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Action', code: 'USER.TEACHER.ACTION', appType: [appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Experience Detail Update',
                    code: 'USER.TEACHER.EXPERIENCEUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Experience Detail Add',
                    code: 'USER.TEACHER.EXPERIENCEUPDATEADD',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail View',
                    code: 'USER.TEACHER.PRIMARYDETAILVIEW',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Update',
                    code: 'USER.TEACHER.PRIMARYDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Add',
                    code: 'USER.TEACHER.PRIMARYDETAILADD',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Document Detail View',
                    code: 'USER.TEACHER.DOCUMENTDETAILVIEW',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Document Detail Update',
                    code: 'USER.TEACHER.DOCUMENTDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Document Detail Add', code: 'USER.TEACHER.DOCUMENTDETAILADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Document Detail Print',
                    code: 'USER.TEACHER.DOCUMENTDETAILPRINT',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
        {
            name: 'Parent Management',
            code: 'USER.PARENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.PARENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.PARENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.PARENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'USER.PARENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'siblings',
            code: 'USER.SIBLINGS',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                // { name: 'Add', code: 'USER.SIBLINGS.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Update', code: 'USER.SIBLINGS.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.SIBLINGS.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Delete', code: 'USER.SIBLINGS.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Admin Staff Management',
            code: 'USER.ADMINSTAFF',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.ADMINSTAFF.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.ADMINSTAFF.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.ADMINSTAFF.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'USER.ADMINSTAFF.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Basic Detail View', code: 'USER.ADMINSTAFF.BASICDETAILVIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Basic Detail Update',
                    code: 'USER.ADMINSTAFF.BASICDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Basic Detail Add', code: 'USER.ADMINSTAFF.BASICDETAILADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Primary Contact Detail View',
                    code: 'USER.ADMINSTAFF.PRIMARYDETAILVIEW',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Update',
                    code: 'USER.ADMINSTAFF.PRIMARYDETAILUPDATE',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                {
                    name: 'Primary Contact Detail Add',
                    code: 'USER.ADMINSTAFF.PRIMARYDETAILADD',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
        // {
        //     name: 'Student Management',
        //     code: 'USER.STUDENT',
        //     actions: [
        //         { name: 'Add', code: 'USER.STUDENT.ADD' },
        //         { name: 'Update', code: 'USER.STUDENT.UPDATE' },
        //         { name: 'View', code: 'USER.STUDENT.VIEW' },
        //         { name: 'Delete', code: 'USER.STUDENT.DELETE' },
        //     ],
        // },
        // {
        //     name: 'Parent Registration',
        //     code: 'USER.PARENTREG',
        //     actions: [
        //         { name: 'Add', code: 'USER.PARENTREG.ADD' },
        //         { name: 'Update', code: 'USER.PARENTREG.UPDATE' },
        //         { name: 'View', code: 'USER.PARENTREG.VIEW' },
        //         { name: 'Delete', code: 'USER.PARENTREG.DELETE' },
        //     ],
        // },
        // {
        //     name: 'Teacher Registration',
        //     code: 'USER.TEACHERREG',
        //     actions: [
        //         { name: 'Add', code: 'USER.TEACHERREG.ADD' },
        //         { name: 'Update', code: 'USER.TEACHERREG.UPDATE' },
        //         { name: 'View', code: 'USER.TEACHERREG.VIEW' },
        //         { name: 'Delete', code: 'USER.TEACHERREG.DELETE' },
        //     ],
        // },
        // {
        //     name: 'Leave Management',
        //     code: 'USER.LEAVEMANAGEMENT',
        //     actions: [
        //         { name: 'Add', code: 'USER.LEAVEMANAGEMENT.ADD' },
        //         { name: 'Update', code: 'USER.LEAVEMANAGEMENT.UPDATE' },
        //         { name: 'View', code: 'USER.LEAVEMANAGEMENT.VIEW' },
        //         { name: 'Delete', code: 'USER.LEAVEMANAGEMENT.DELETE' },
        //     ],
        // },
        {
            name: 'Manage Leave ',
            code: 'USER.LEAVEMANAGEMENTMANAGE',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.LEAVEMANAGEMENTMANAGE.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.LEAVEMANAGEMENTMANAGE.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.LEAVEMANAGEMENTMANAGE.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'USER.LEAVEMANAGEMENTMANAGE.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'USER.LEAVEMANAGEMENTMANAGE.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'USER.LEAVEMANAGEMENTMANAGE.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Manage Leave Request',
            code: 'USER.LEAVEMANAGEMENTREQUEST',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'View', code: 'USER.LEAVEMANAGEMENTREQUEST.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'USER.LEAVEMANAGEMENTREQUEST.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'USER.LEAVEMANAGEMENTREQUEST.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Landing Dashboard',
            code: 'USER.LANDINGDASHBOARD',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [{ name: 'View', code: 'USER.LANDINGDASHBOARD.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] }],
        },
        {
            name: 'Landing Dashboard Special Utilities',
            code: 'USER.LANDINGDASHBOARDSPECIAL',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [{ name: 'View', code: 'USER.LANDINGDASHBOARDSPECIAL.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] }],
        },
        {
            name: 'User Joining Request',
            code: 'USER.JOININGREQUEST',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'USER.JOININGREQUEST.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'USER.JOININGREQUEST.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.JOININGREQUEST.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'User Joining Manage Request',
            code: 'USER.JOININGMANAGEREQUEST',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Update', code: 'USER.JOININGMANAGEREQUEST.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'USER.JOININGMANAGEREQUEST.ACTION', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'USER.JOININGMANAGEREQUEST.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = UserModule;
