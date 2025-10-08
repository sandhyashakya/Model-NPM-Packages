const TeacherModule = {
    name: 'Teacher',
    code: 'TEACHER',
    features: [
        {
            name: 'Teacher Registration',
            code: 'TEACHER.REGISTRATION',
            actions: [
                { name: 'Add', code: 'TEACHER.REGISTRATION.ADD' },
                { name: 'Update', code: 'TEACHER.REGISTRATION.UPDATE' },
                { name: 'View', code: 'TEACHER.REGISTRATION.VIEW' },
                { name: 'Delete', code: 'TEACHER.REGISTRATION.DELETE' },
            ],
        },
        {
            name: 'Teacher Details',
            code: 'TEACHER.DETAILS',
            actions: [
                { name: 'Add', code: 'TEACHER.DETAILS.ADD' },
                { name: 'Update', code: 'TEACHER.DETAILS.UPDATE' },
                { name: 'View', code: 'TEACHER.DETAILS.VIEW' },
                { name: 'Delete', code: 'TEACHER.DETAILS.DELETE' },
            ],
        },
        {
            name: 'Teacher Schedule',
            code: 'TEACHER.SCHEDULE',
            actions: [
                { name: 'Add', code: 'TEACHER.SCHEDULE.ADD' },
                { name: 'Update', code: 'TEACHER.SCHEDULE.UPDATE' },
                { name: 'View', code: 'TEACHER.SCHEDULE.VIEW' },
                { name: 'Delete', code: 'TEACHER.SCHEDULE.DELETE' },
            ],
        },
        {
            name: 'Teacher Leave Management',
            code: 'TEACHER.LEAVE',
            actions: [
                { name: 'Apply', code: 'TEACHER.LEAVE.APPLY' },
                { name: 'Approve', code: 'TEACHER.LEAVE.APPROVE' },
                { name: 'Reject', code: 'TEACHER.LEAVE.REJECT' },
                { name: 'View', code: 'TEACHER.LEAVE.VIEW' },
            ],
        },
        {
            name: 'Assign',
            code: 'TEACHER.ASSIGN',
            actions: [
                { name: 'Add', code: 'TEACHER.ASSIGN.ADD' },
                { name: 'View', code: 'TEACHER.ASSIGN.VIEW' },
                { name: 'Update', code: 'TEACHER.ASSIGN.UPDATE' },
                { name: 'Delete', code: 'TEACHER.ASSIGN.DELETE' },
            ],
        },
        {
            name: 'Teacher Assets',
            code: 'TEACHER.ASSETS',
            actions: [
                { name: 'Add', code: 'TEACHER.ASSETS.ADD' },
                { name: 'Update', code: 'TEACHER.ASSETS.UPDATE' },
                { name: 'View', code: 'TEACHER.ASSETS.VIEW' },
                { name: 'Delete', code: 'TEACHER.ASSETS.DELETE' },
            ],
        },
    ],
};

module.exports = TeacherModule;
