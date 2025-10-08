// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const JobApplyModule = {
    name: 'Job Apply',
    code: 'JOBAPPLY',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Job Apply Management',
            code: 'JOBAPPLY.MANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'JOBAPPLY.MANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'JOBAPPLY.MANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'JOBAPPLY.MANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'JOBAPPLY.MANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = JobApplyModule;
