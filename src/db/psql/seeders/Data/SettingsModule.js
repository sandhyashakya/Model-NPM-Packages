const SettingsModule = {
    name: 'Settings',
    code: 'SETTINGS',
    features: [
        {
            name: 'General Settings',
            code: 'SETTINGS.GENERAL',
            actions: [
                { name: 'Update', code: 'SETTINGS.GENERAL.UPDATE' },
                { name: 'View', code: 'SETTINGS.GENERAL.VIEW' },
                { name: 'Add', code: 'SETTINGS.GENERAL.ADD' },
                { name: 'Delete', code: 'SETTINGS.GENERAL.DELETE' },
            ],
        },
        {
            name: 'Privacy Settings',
            code: 'SETTINGS.PRIVACY',
            actions: [
                { name: 'Update', code: 'SETTINGS.PRIVACY.UPDATE' },
                { name: 'View', code: 'SETTINGS.PRIVACY.VIEW' },
                { name: 'Add', code: 'SETTINGS.PRIVACY.ADD' },
                { name: 'Delete', code: 'SETTINGS.PRIVACY.DELETE' },
            ],
        },
    ],
};

module.exports = SettingsModule;
