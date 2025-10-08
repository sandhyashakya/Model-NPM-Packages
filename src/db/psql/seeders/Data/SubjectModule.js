const SubjectModule = {
    name: 'Subject',
    code: 'SUBJECT',
    features: [
        {
            name: 'Subject Management',
            code: 'SUBJECT.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'SUBJECT.MANAGEMENT.ADD' },
                { name: 'Update', code: 'SUBJECT.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'SUBJECT.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'SUBJECT.MANAGEMENT.DELETE' },
            ],
        },
        {
            name: 'Subject Allocation',
            code: 'SUBJECT.ALLOCATION',
            actions: [
                { name: 'Add', code: 'SUBJECT.ALLOCATION.ADD' },
                { name: 'Update', code: 'SUBJECT.ALLOCATION.UPDATE' },
                { name: 'View', code: 'SUBJECT.ALLOCATION.VIEW' },
                { name: 'Delete', code: 'SUBJECT.ALLOCATION.DELETE' },
            ],
        },
        {
            name: 'Subject Summary',
            code: 'SUBJECT.SUMMARY',
            actions: [
                { name: 'View', code: 'SUBJECT.SUMMARY.VIEW' },
                { name: 'Update', code: 'SUBJECT.SUMMARY.UPDATE' },
                { name: 'Delete', code: 'SUBJECT.SUMMARY.DELETE' },
            ],
        },
    ],
};

module.exports = SubjectModule;
