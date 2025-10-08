// eslint-disable-next-line @typescript-eslint/no-require-imports
const appTypeEnum = require('./appType');

const AnnouncementsModule = {
    name: 'Announcements',
    code: 'ANNOUNCEMENTS',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        // {
        //     name: 'Create Announcement',
        //     code: 'ANNOUNCEMENTS.CREATE',
        //     actions: [
        //         { name: 'Add', code: 'ANNOUNCEMENTS.CREATE.ADD' },
        //         { name: 'Update', code: 'ANNOUNCEMENTS.CREATE.UPDATE' },
        //         { name: 'View', code: 'ANNOUNCEMENTS.CREATE.VIEW' },
        //         { name: 'Delete', code: 'ANNOUNCEMENTS.CREATE.DELETE' },
        //     ],
        // },
        {
            name: 'Announcements management',
            code: 'ANNOUNCEMENTS.MANAGEMENT',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ANNOUNCEMENTS.MANAGEMENT.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ANNOUNCEMENTS.MANAGEMENT.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ANNOUNCEMENTS.MANAGEMENT.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ANNOUNCEMENTS.MANAGEMENT.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Approval', code: 'ANNOUNCEMENTS.MANAGEMENT.APPROVAL', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
        {
            name: 'Announcement log History',
            code: 'ANNOUNCEMENTS.LOGHISTORY',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [{ name: 'View', code: 'ANNOUNCEMENTS.LOGHISTORY.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] }],
        },
        {
            name: 'General announcement',
            code: 'ANNOUNCEMENTS.GENERAL',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'ANNOUNCEMENTS.GENERAL.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'ANNOUNCEMENTS.GENERAL.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'ANNOUNCEMENTS.GENERAL.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'ANNOUNCEMENTS.GENERAL.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
            ],
        },
    ],
};

module.exports = AnnouncementsModule;
