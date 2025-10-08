const AssetsModule = {
    name: 'Assets',
    code: 'ASSETS',
    features: [
        {
            name: 'Asset Management',
            code: 'ASSETS.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'ASSETS.MANAGEMENT.ADD' },
                { name: 'Update', code: 'ASSETS.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'ASSETS.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'ASSETS.MANAGEMENT.DELETE' },
            ],
        },
        {
            name: 'Asset Allocation',
            code: 'ASSETS.ALLOCATION',
            actions: [
                { name: 'Add', code: 'ASSETS.ALLOCATION.ADD' },
                { name: 'Update', code: 'ASSETS.ALLOCATION.UPDATE' },
                { name: 'View', code: 'ASSETS.ALLOCATION.VIEW' },
                { name: 'Delete', code: 'ASSETS.ALLOCATION.DELETE' },
            ],
        },
        {
            name: 'Asset Summary',
            code: 'ASSETS.SUMMARY',
            actions: [
                { name: 'View', code: 'ASSETS.SUMMARY.VIEW' },
                { name: 'Update', code: 'ASSETS.SUMMARY.UPDATE' },
                { name: 'Delete', code: 'ASSETS.SUMMARY.DELETE' },
            ],
        },
    ],
};

module.exports = AssetsModule;
