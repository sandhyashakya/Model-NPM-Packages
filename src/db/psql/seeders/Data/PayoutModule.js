const PayoutModule = {
    name: 'Payout',
    code: 'PAYOUT',
    features: [
        {
            name: 'Payout Management',
            code: 'PAYOUT.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'PAYOUT.MANAGEMENT.ADD' },
                { name: 'Update', code: 'PAYOUT.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'PAYOUT.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'PAYOUT.MANAGEMENT.DELETE' },
            ],
        },
    ],
};

module.exports = PayoutModule;
