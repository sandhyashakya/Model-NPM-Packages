const SchoolFeeModule = {
    name: 'SchoolFee',
    code: 'SCHOOLFEE',
    features: [
        {
            name: 'Bank Account',
            code: 'BANK.ACCOUNT',
            actions: [
                { name: 'Add', code: 'SCHOOLFEE.BANKACCOUNT.ADD' },
                { name: 'Update', code: 'SCHOOLFEE.BANKACCOUNT.UPDATE' },
                { name: 'View', code: 'SCHOOLFEE.BANKACCOUNT.VIEW' },
                { name: 'Delete', code: 'SCHOOLFEE.BANKACCOUNT.DELETE' },
            ],
        },
        {
            name: 'Fee Type',
            code: 'FEE.TYPE',
            actions: [
                { name: 'Add', code: 'SCHOOLFEE.FEETYPE.ADD' },
                { name: 'Update', code: 'SCHOOLFEE.FEETYPE.UPDATE' },
                { name: 'View', code: 'SCHOOLFEE.FEETYPE.VIEW' },
                { name: 'Delete', code: 'SCHOOLFEE.FEETYPE.DELETE' },
            ],
        },
        {
            name: 'School Fee',
            code: 'SCHOOL.FEE',
            actions: [
                { name: 'Add', code: 'SCHOOLFEE.SCHOOLFEE.ADD' },
                { name: 'Update', code: 'SCHOOLFEE.SCHOOLFEE.UPDATE' },
                { name: 'View', code: 'SCHOOLFEE.SCHOOLFEE.VIEW' },
                { name: 'Delete', code: 'SCHOOLFEE.SCHOOLFEE.DELETE' },
            ],
        },
    ],
};

module.exports = SchoolFeeModule;
