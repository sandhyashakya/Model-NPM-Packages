// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const RoleModule = {
    name: 'Role & Permission Assignment',
    code: 'ROLEPERMISSION',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Role & Permission',
            code: 'ROLEPERMISSION.ROLEPERMISSION',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ROLEPERMISSION.ROLEPERMISSION.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ROLEPERMISSION.ROLEPERMISSION.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ROLEPERMISSION.ROLEPERMISSION.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ROLEPERMISSION.ROLEPERMISSION.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Active/InActive',
                    code: 'ROLEPERMISSION.ROLEPERMISSION.ACTION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Approval', code: 'ROLEPERMISSION.ROLEPERMISSION.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Assign Permission',
                    code: 'ROLEPERMISSION.ROLEPERMISSION.ASSIGNPERMISSION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
        // {
        //     name: ' Permission',
        //     code: 'ROLEPERMISSION.PERMISSION',
        //     actions: [
        //         { name: 'Add', code: 'ROLEPERMISSION.PERMISSION.ADD' },
        //         { name: 'Update', code: 'ROLEPERMISSION.PERMISSION.UPDATE' },
        //         { name: 'View', code: 'ROLEPERMISSION.PERMISSION.VIEW' },
        //         { name: 'Delete', code: 'ROLEPERMISSION.PERMISSION.DELETE' },
        //     ],
        // },
        // {
        //     name: ' Role Assignment',
        //     code: 'ROLEPERMISSION.ROLEASSIGNMENT',
        //     actions: [
        //         { name: 'Add', code: 'ROLEPERMISSION.ROLEASSIGNMENT.ADD' },
        //         { name: 'Update', code: 'ROLEPERMISSION.ROLEASSIGNMENT.UPDATE' },
        //         { name: 'View', code: 'ROLEPERMISSION.ROLEASSIGNMENT.VIEW' },
        //         { name: 'Delete', code: 'ROLEPERMISSION.ROLEASSIGNMENT.DELETE' },
        //     ],
        // },
    ],
};

module.exports = RoleModule;
