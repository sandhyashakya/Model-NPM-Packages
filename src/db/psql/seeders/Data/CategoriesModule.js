const CategoriesModule = {
    name: 'Categories',
    code: 'CATEGORIES',
    features: [
        {
            name: 'Categories Management',
            code: 'CATEGORIES.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'CATEGORIES.MANAGEMENT.ADD' },
                { name: 'Update', code: 'CATEGORIES.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'CATEGORIES.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'CATEGORIES.MANAGEMENT.DELETE' },
            ],
        },
    ],
};

module.exports = CategoriesModule;
