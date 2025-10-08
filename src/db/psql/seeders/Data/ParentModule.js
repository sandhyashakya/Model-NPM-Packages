const ParentModule = {
    name: 'Parent',
    code: 'PARENT',
    features: [
        {
            name: 'Parent Registration',
            code: 'PARENT.REGISTRATION',
            actions: [
                { name: 'Add', code: 'PARENT.REGISTRATION.ADD' },
                { name: 'Update', code: 'PARENT.REGISTRATION.UPDATE' },
                { name: 'View', code: 'PARENT.REGISTRATION.VIEW' },
                { name: 'Delete', code: 'PARENT.REGISTRATION.DELETE' },
            ],
        },
        {
            name: 'Parent Details',
            code: 'PARENT.DETAILS',
            actions: [
                { name: 'Add', code: 'PARENT.DETAILS.ADD' },
                { name: 'Update', code: 'PARENT.DETAILS.UPDATE' },
                { name: 'View', code: 'PARENT.DETAILS.VIEW' },
                { name: 'Delete', code: 'PARENT.DETAILS.DELETE' },
            ],
        },
        {
            name: 'Parent Leave Management',
            code: 'PARENT.LEAVE',
            actions: [
                { name: 'Add', code: 'PARENT.LEAVE.ADD' },
                { name: 'Update', code: 'PARENT.LEAVE.UPDATE' },
                { name: 'Delete', code: 'PARENT.LEAVE.DELETE' },
                { name: 'View', code: 'PARENT.LEAVE.VIEW' },
            ],
        },
    ],
};

module.exports = ParentModule;
