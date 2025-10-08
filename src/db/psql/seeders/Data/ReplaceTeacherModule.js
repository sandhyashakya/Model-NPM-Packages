// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const ReplaceTeacherModule = {
    name: 'Replace Teacher',
    code: 'REPLACETEACHER',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Replace Teacher',
            code: 'REPLACETEACHER.REPLACETEACHER',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'REPLACETEACHER.REPLACETEACHER.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'REPLACETEACHER.REPLACETEACHER.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'View', code: 'REPLACETEACHER.REPLACETEACHER.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // { name: 'Delete', code: 'REPLACETEACHER.REPLACETEACHER.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = ReplaceTeacherModule;
