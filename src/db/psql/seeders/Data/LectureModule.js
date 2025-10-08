const LectureModule = {
    name: 'Lecture',
    code: 'LECTURE',
    features: [
        {
            name: 'Lecture Management',
            code: 'LECTURE.MANAGEMENT',
            actions: [
                { name: 'Add', code: 'LECTURE.MANAGEMENT.ADD' },
                { name: 'Update', code: 'LECTURE.MANAGEMENT.UPDATE' },
                { name: 'View', code: 'LECTURE.MANAGEMENT.VIEW' },
                { name: 'Delete', code: 'LECTURE.MANAGEMENT.DELETE' },
            ],
        },
        {
            name: 'Weekly Lecture Management',
            code: 'LECTURE.WEEKLYLECTUREMANAGEMENT',
            actions: [
                { name: 'Add', code: 'LECTURE.WEEKLYLECTUREMANAGEMENT.ADD' },
                { name: 'Update', code: 'LECTURE.WEEKLYLECTUREMANAGEMENT.UPDATE' },
                { name: 'View', code: 'LECTURE.WEEKLYLECTUREMANAGEMENT.VIEW' },
                { name: 'Delete', code: 'LECTURE.WEEKLYLECTUREMANAGEMENT.DELETE' },
            ],
        },
    ],
};

module.exports = LectureModule;
