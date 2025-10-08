const FileModule = {
    name: 'File',
    code: 'FILE',
    features: [
        {
            name: 'File Management',
            code: 'FILE.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'FILE.MANAGEMENT.ADD' },
                { name: 'Update', code: 'FILE.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'FILE.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'FILE.MANAGEMENT.DELETE' },
            ],
        },
        // {
        //     name: 'File Sharing',
        //     parent: 'File',
        //     code: 'FILE.SHARING',
        //     actions: [
        //         { name: 'Share', code: 'FILE.SHARING.SHARE' },
        //         { name: 'Unshare', code: 'FILE.SHARING.UNSHARE' },
        //         { name: 'View', code: 'FILE.SHARING.VIEW' },
        //     ],
        // },
        // {
        //     name: 'File Permissions',
        //     parent: 'File',
        //     code: 'FILE.PERMISSIONS',
        //     actions: [
        //         { name: 'Grant', code: 'FILE.PERMISSIONS.GRANT' },
        //         { name: 'Revoke', code: 'FILE.PERMISSIONS.REVOKE' },
        //         { name: 'View', code: 'FILE.PERMISSIONS.VIEW' },
        //     ],
        // },
    ],
};

module.exports = FileModule;
