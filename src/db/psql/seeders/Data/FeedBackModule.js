/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const FeedBackModule = {
    name: 'FeedBack Management',
    code: 'FEEDBACK',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'FeedBack',
            code: 'FEEDBACK.FEEDBACK',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'FEEDBACK.FEEDBACK.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'FEEDBACK.FEEDBACK.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'FEEDBACK.FEEDBACK.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'FEEDBACK.FEEDBACK.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // {
                //     name: 'Active/InActive',
                //     code: 'FEEDBACK.FEEDBACK.ACTION',
                //     appType: [  appTypeEnum.SCHOOL_APP],
                // },
            ],
        },
    ],
};

module.exports = FeedBackModule;
