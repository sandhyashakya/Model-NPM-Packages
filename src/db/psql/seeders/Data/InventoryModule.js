// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const InventoryModule = {
    name: 'Inventory & Dead Stock Management',
    code: 'INVENTORYDEADSTOCK',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'Manage Inventory & Dead Stock',
            code: 'INVENTORYDEADSTOCK.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INVENTORYDEADSTOCK.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INVENTORYDEADSTOCK.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INVENTORYDEADSTOCK.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INVENTORYDEADSTOCK.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Active/InActive',
                    code: 'INVENTORYDEADSTOCK.MANAGEMENT.ACTION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
                { name: 'Approval', code: 'INVENTORYDEADSTOCK.MANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'INVENTORYDEADSTOCK.MANAGEMENT.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Assign Inventory',
            code: 'INVENTORYDEADSTOCK.ASSIGN',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'INVENTORYDEADSTOCK.ASSIGN.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'INVENTORYDEADSTOCK.ASSIGN.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'INVENTORYDEADSTOCK.ASSIGN.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'INVENTORYDEADSTOCK.ASSIGN.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'INVENTORYDEADSTOCK.ASSIGN.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Print', code: 'INVENTORYDEADSTOCK.ASSIGN.PRINT', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = InventoryModule;
