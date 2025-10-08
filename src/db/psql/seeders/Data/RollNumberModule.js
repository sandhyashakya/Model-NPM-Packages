/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const RollNumberModule = {
    name: 'Roll Number Management',
    code: 'ROLLNUMBER',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Roll Number',
            code: 'ROLLNUMBER.ROLLNUMBER',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Assign Roll Number', code: 'ROLLNUMBER.ROLLNUMBER.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ROLLNUMBER.ROLLNUMBER.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ROLLNUMBER.ROLLNUMBER.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ROLLNUMBER.ROLLNUMBER.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = RollNumberModule;
