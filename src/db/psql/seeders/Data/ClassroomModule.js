// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const ClassroomModule = {
    name: 'Classroom',
    code: 'CLASSROOM',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Classroom Management',
            code: 'CLASSROOM.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP],
            actions: [
                { name: 'Add', code: 'CLASSROOM.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Update', code: 'CLASSROOM.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'View', code: 'CLASSROOM.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Delete', code: 'CLASSROOM.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Active/InActive', code: 'CLASSROOM.MANAGEMENT.ACTION', appType: [appTypeEnum.INSTITUTE_APP] },
                { name: 'Approval', code: 'CLASSROOM.MANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP] },
            ],
        },
        {
            name: 'Classroom & Floor Management',
            code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT',
            appType: [appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.ADD', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.UPDATE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.VIEW', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.DELETE', appType: [appTypeEnum.SCHOOL_APP] },
                { name: 'Active/InActive', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.ACTION', appType: [appTypeEnum.SCHOOL_APP] },
                // { name: 'Approval', code: 'CLASSROOM.CLASSROOMFLOORMANAGEMENT.APPROVAL', appType: [appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = ClassroomModule;
