/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const BookAssessmentsModule = {
    name: 'Book Assessments',
    code: 'BOOKASSESSMENTS',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Book Assessments',
            code: 'BOOKASSESSMENTS.BOOKASSESSMENTS',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'BOOKASSESSMENTS.BOOKASSESSMENTS.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'BOOKASSESSMENTS.BOOKASSESSMENTS.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'BOOKASSESSMENTS.BOOKASSESSMENTS.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'BOOKASSESSMENTS.BOOKASSESSMENTS.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Check Book Assessments', code: 'BOOKASSESSMENTS.BOOKASSESSMENTS.CHECK', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = BookAssessmentsModule;
