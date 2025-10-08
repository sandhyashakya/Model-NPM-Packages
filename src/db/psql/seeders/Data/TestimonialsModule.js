/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const TestimonialsModule = {
    name: 'Testimonials Management',
    code: 'TESTIMONIALS',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Testimonials',
            code: 'TESTIMONIALS.TESTIMONIALS',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'TESTIMONIALS.TESTIMONIALS.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'TESTIMONIALS.TESTIMONIALS.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'TESTIMONIALS.TESTIMONIALS.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'TESTIMONIALS.TESTIMONIALS.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Active/InActive',
                    code: 'TESTIMONIALS.TESTIMONIALS.ACTION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
    ],
};

module.exports = TestimonialsModule;
