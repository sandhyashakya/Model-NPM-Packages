// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const StaffTimingModule = {
    name: 'Staff Timing',
    code: 'STAFFTIMING',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Staff Timing Management',
            code: 'STAFFTIMING.MANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'STAFFTIMING.MANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'STAFFTIMING.MANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'STAFFTIMING.MANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'STAFFTIMING.MANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = StaffTimingModule;
