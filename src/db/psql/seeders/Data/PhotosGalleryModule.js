/* eslint-disable @typescript-eslint/no-require-imports */
const appTypeEnum = require('./appType');

const PhotosGalleryModule = {
    name: 'PhotosGallery Management',
    code: 'PHOTOSGALLERY',
    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
    features: [
        {
            name: 'PhotosGallery',
            code: 'PHOTOSGALLERY.PHOTOSGALLERY',
            appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
            actions: [
                { name: 'Add', code: 'PHOTOSGALLERY.PHOTOSGALLERY.ADD', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Update', code: 'PHOTOSGALLERY.PHOTOSGALLERY.UPDATE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'View', code: 'PHOTOSGALLERY.PHOTOSGALLERY.VIEW', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                { name: 'Delete', code: 'PHOTOSGALLERY.PHOTOSGALLERY.DELETE', appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP] },
                {
                    name: 'Active/InActive',
                    code: 'PHOTOSGALLERY.PHOTOSGALLERY.ACTION',
                    appType: [appTypeEnum.INSTITUTE_APP, appTypeEnum.SCHOOL_APP],
                },
            ],
        },
    ],
};

module.exports = PhotosGalleryModule;
