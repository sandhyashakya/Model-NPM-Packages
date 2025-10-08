/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const GenerateIdModule = {
    name: 'Generate Id Card',
    code: 'GENERATEIDCARD',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Generate Id Card',
            code: 'GENERATEIDCARD.GENERATEIDCARD',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Generate Id', code: 'GENERATEIDCARD.GENERATEIDCARD.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = GenerateIdModule;
