const BoardModule = {
    name: 'Board',
    code: 'BOARD',
    features: [
        {
            name: 'Board Management',
            code: 'BOARD.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'BOARD.MANAGEMENT.ADD' },
                { name: 'Update', code: 'BOARD.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'BOARD.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'BOARD.MANAGEMENT.DELETE' },
            ],
        },
    ],
};

module.exports = BoardModule;
