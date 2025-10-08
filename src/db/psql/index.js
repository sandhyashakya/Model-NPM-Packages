/* eslint-disable @typescript-eslint/no-require-imports */
const AcademicCalendarModule = require('./seeders/Data/AcademicCalendarModule');
// const AdministrativeStaffModule = require('./seeders/Data/AdministrativeStaffModule');
const AnnouncementsModule = require('./seeders/Data/AnnouncementsModule');
// // const AssetsModule = require('./seeders/Data/AssetsModule');
const AttendanceModule = require('./seeders/Data/AttendanceModule');
const BannerModule = require('./seeders/Data/BannerModule');
const BatchModule = require('./seeders/Data/BatchModule');
const DivisionModule = require('./seeders/Data/DivisionModule');
const SchoolRegistration = require('./seeders/Data/SchoolRegistration');
// // const BoardModule = require('./seeders/Data/BoardModule ');
const ClassroomModule = require('./seeders/Data/ClassroomModule');
// const EventModule = require('./seeders/Data/EventModule');
const ExamsAndResultsModule = require('./seeders/Data/ExamsAndResultsModule');
const FeeAndDiscountModule = require('./seeders/Data/FeeAndDiscountModule');
// // const FileModule = require('./seeders/Data/FileModule');
const InstituteModule = require('./seeders/Data/InstituteModule');
const InventoryModule = require('./seeders/Data/InventoryModule');
// // const ParentModule = require('./seeders/Data/ParentModule');
// // const SettingsModule = require('./seeders/Data/SettingsModule');
// // const StudentModule = require('./seeders/Data/StudentModule');
// // const SubjectModule = require('./seeders/Data/SubjectModule');
// // const TeacherModule = require('./seeders/Data/TeacherModule');
const TimetableModule = require('./seeders/Data/TimetableModule');
const TypeManagementModule = require('./seeders/Data/TypeManagementModule');
const UserModule = require('./seeders/Data/UserModule');
// const PlannerModule = require('./seeders/Data/PlannerModule');
const IndexModule = require('./seeders/Data/IndexModule');
// const LectureModule = require('./seeders/Data/LectureModule');
// // const SchoolFeeModule = require('./seeders/Data/SchoolFeeModule');
// // const FacilityModule = require('./seeders/Data/FacilityModule');
// // const CategoriesModule = require('./seeders/Data/CategoriesModule');
// const PayoutModule = require('./seeders/Data/PayoutModule');
const HolidayModule = require('./seeders/Data/HolidayModule');
const EventModule = require('./seeders/Data/EventModule');
const RoleModule = require('./seeders/Data/RoleModule');

const ToDoModule = require('./seeders/Data/To-doModule');
const HomeworkModule = require('./seeders/Data/HomeworkModule');
const TestimonialsModule = require('./seeders/Data/TestimonialsModule');
const PhotosGalleryModule = require('./seeders/Data/PhotosGalleryModule');
// const PdcChequesModule = require('./seeders/Data/PdcChequesModule');
const FeedBackModule = require('./seeders/Data/FeedBackModule');
const GenerateIdModule = require('./seeders/Data/GenerateIdModule');
const RollNumberModule = require('./seeders/Data/RollNumberModule');
const ProjectAssessmentsModule = require('./seeders/Data/ProjectAssessmentsModule');
const BookAssessmentsModule = require('./seeders/Data/BookAssessmentsModule');
const InquiryModule = require('./seeders/Data/InquiryModule');
const StaffTimingModule = require('./seeders/Data/StaffTimingModule');
const SchoolModule = require('./seeders/Data/SchoolModule');
const ReplaceTeacherModule = require('./seeders/Data/ReplaceTeacherModule');
const SyllabusManagementModule = require('./seeders/Data/SyllabusManagementModule');
const JobApplyModule = require('./seeders/Data/JobApplyModule');

const allModules = [
    AcademicCalendarModule,
    // AdministrativeStaffModule,
    // AssetsModule,
    AttendanceModule,
    BannerModule,
    BatchModule,
    DivisionModule,
    SchoolRegistration,
    // BoardModule,
    EventModule,
    ExamsAndResultsModule,
    FeeAndDiscountModule,
    TimetableModule,
    // FileModule,
    InstituteModule,
    InventoryModule,
    // ParentModule,
    RoleModule,
    // SettingsModule,
    // StudentModule,
    // SubjectModule,
    // TeacherModule,
    // TimetableModule,
    TypeManagementModule,
    UserModule,
    AnnouncementsModule,
    IndexModule,
    // SchoolFeeModule,
    // FacilityModule,
    // CategoriesModule,
    // PayoutModule,
    HolidayModule,

    ToDoModule,
    HomeworkModule,
    TestimonialsModule,
    PhotosGalleryModule,
    // PdcChequesModule,
    ClassroomModule, // add floor management
    FeedBackModule,
    GenerateIdModule,
    RollNumberModule,
    ProjectAssessmentsModule,
    BookAssessmentsModule,
    InquiryModule,
    StaffTimingModule,
    SchoolModule,
    ReplaceTeacherModule,
    SyllabusManagementModule,
    JobApplyModule,
];

module.exports = allModules;
