const StudentModule = {
    name: 'Student',
    code: 'STUDENT',
    features: [
        {
            name: 'Student Details',
            code: 'STUDENT.DETAILS',
            actions: [
                { name: 'Add', code: 'STUDENT.DETAILS.ADD' },
                { name: 'Update', code: 'STUDENT.DETAILS.UPDATE' },
                { name: 'View', code: 'STUDENT.DETAILS.VIEW' },
                { name: 'Delete', code: 'STUDENT.DETAILS.DELETE' },
            ],
        },
    ],
};

module.exports = StudentModule;
