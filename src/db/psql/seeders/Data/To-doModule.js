/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const ToDoModule = {
    name: 'To-do Management',
    code: 'TODO',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'To Do List',
            code: 'TODO.TODOLIST',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'TODO.TODOLIST.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'TODO.TODOLIST.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'TODO.TODOLIST.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'TODO.TODOLIST.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                // {
                //     name: 'Active/InActive',
                //     code: 'TODO.TODO.ACTION',
                //     appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                // },
            ],
        },
    ],
};

module.exports = ToDoModule;
