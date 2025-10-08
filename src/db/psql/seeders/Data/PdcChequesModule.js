/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const PdcChequesModule = {
    name: 'Pdc Cheque Management',
    code: 'PDCCHEQUE',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Pdc Cheque',
            code: 'PDCCHEQUE.PDCCHEQUE',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'PDCCHEQUE.PDCCHEQUE.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'PDCCHEQUE.PDCCHEQUE.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'PDCCHEQUE.PDCCHEQUE.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'PDCCHEQUE.PDCCHEQUE.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                // {
                //     name: 'Active/InActive',
                //     code: 'PDCCHEQUE.PDCCHEQUE.ACTION',
                //     appType: [  appTypeEnum.SCHOOL_APP],
                // },
            ],
        },
    ],
};

module.exports = PdcChequesModule;
