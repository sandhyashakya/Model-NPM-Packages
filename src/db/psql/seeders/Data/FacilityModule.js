// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const FacilityModule = {
    name: 'Facility',
    code: 'FACILITY',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Facility Management',
            code: 'FACILITY.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'FACILITY.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'FACILITY.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'FACILITY.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'FACILITY.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = FacilityModule;
