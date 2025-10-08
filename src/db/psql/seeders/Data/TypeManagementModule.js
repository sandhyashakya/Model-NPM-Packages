/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const TypeManagementModule = {
    name: 'TypeManagement',
    code: 'TYPEMANAGEMENT',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Type Management',
            code: 'TYPEMANAGEMENT.TYPEMANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Active/InActive',
                    code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.ACTION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Approval', code: 'TYPEMANAGEMENT.TYPEMANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = TypeManagementModule;
