/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const ProjectAssessmentsModule = {
    name: 'Project Assessments',
    code: 'PROJECTASSESSMENTS',
    appType: [appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Project Assessments',
            code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Check Project Assessments', code: 'PROJECTASSESSMENTS.PROJECTASSESSMENTS.CHECK', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = ProjectAssessmentsModule;
