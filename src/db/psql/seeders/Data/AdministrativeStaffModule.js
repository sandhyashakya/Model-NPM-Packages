const AdministrativeStaffModule = {
    name: 'AdministrativeStaff',
    code: 'ADMINISTRATIVESTAFF',
    features: [
        {
            name: 'Staff Registration',
            code: 'ADMINISTRATIVESTAFF.REGISTRATION',
            actions: [
                { name: 'Add', code: 'ADMINISTRATIVESTAFF.REGISTRATION.ADD' },
                { name: 'Update', code: 'ADMINISTRATIVESTAFF.REGISTRATION.UPDATE' },
                { name: 'View', code: 'ADMINISTRATIVESTAFF.REGISTRATION.VIEW' },
                { name: 'Delete', code: 'ADMINISTRATIVESTAFF.REGISTRATION.DELETE' },
            ],
        },
        {
            name: 'Staff Details',
            code: 'ADMINISTRATIVESTAFF.DETAILS',
            actions: [
                { name: 'Add', code: 'ADMINISTRATIVESTAFF.DETAILS.ADD' },
                { name: 'Update', code: 'ADMINISTRATIVESTAFF.DETAILS.UPDATE' },
                { name: 'View', code: 'ADMINISTRATIVESTAFF.DETAILS.VIEW' },
                { name: 'Delete', code: 'ADMINISTRATIVESTAFF.DETAILS.DELETE' },
            ],
        },
        {
            name: 'assign inventory',
            code: 'ADMINISTRATIVESTAFF.ASSIGNINVENTORY',
            actions: [
                { name: 'Add', code: 'ADMINISTRATIVESTAFF.ASSIGNINVENTORY.ADD' },
                { name: 'Update', code: 'ADMINISTRATIVESTAFF.ASSIGNINVENTORY.UPDATE' },
                { name: 'View', code: 'ADMINISTRATIVESTAFF.ASSIGNINVENTORY.VIEW' },
                { name: 'Delete', code: 'ADMINISTRATIVESTAFF.ASSIGNINVENTORY.DELETE' },
            ],
        },
    ],
};
module.exports = AdministrativeStaffModule;
