import { Order } from 'sequelize';
import { ENV_VARIABLE } from '../configs/env';

export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export const USER_INSTITUTE_META_STATUS_REJECTED_COUNT = 2 as const;

export enum PAGINATION {
    LIMIT = 10,
    PAGE = 1,
}
export const DEFAULT_CLASS_ROOM_TITLE = 'Default Class Room' as const;
export const DEFAULT_BATCH_TITLE = 'Batch A' as const;
export const PAGINATION_ORDER: Order = [['createdAt', 'DESC']];
export const PAGINATION_UPDATE_ORDER: Order = [['updatedAt', 'DESC']];
export enum EMAIL_VERIFICATION {
    PENDING = 'PENDING',
    ACEEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum MOBILE_VERIFICATION {
    PENDING = 'PENDING',
    ACEEPTED = 'ACEEPTED',
}
export enum PDF_MICRO_SERVICE_END_POINT {
    PDF_API_URL = 'pdf/generate',
    RESULT_API_URL = 'result/generate',
}
export enum USER_STATUS {
    OTP_VERIFICATION_PENDING = 'OTP_VERIFICATION_PENDING',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
export enum INVENTORY_TYPE {
    INVENTORY = 'INVENTORY',
    DEAD_STOCK = 'DEAD_STOCK',
}
export enum USER_INVENTORY_ACTION {
    BOTH = 'BOTH',
    DAMAGE = 'DAMAGE',
    LOST = 'LOST',
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
}
export enum ATTENDANCE_STATUS {
    NONE = 'NONE',
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
    EARLY_LEFT = 'EARLY_LEFT',
}
export enum ATTENDANCE_TYPE {
    BATCH = 'BATCH',
    LECTURE = 'LECTURE',
    FULL_DAY = 'FULL_DAY',
}
export enum SCHOOL_TYPE {
    GRANT_AIDED_FULL = 'GRANT-IN-AID (100%)',
    GRANT_AIDED_PARTIAL = 'GRANT-IN-AID (60-40)',
    SALARY_AIDED = 'AIDED ONLY FOR SALARY',
    SELF_FINANCED = 'SELF-FINANCED',
    GOVERNMENT = 'GOVERNMENT',
    OTHER_GOVERNMENT_DEPARTMENTS = 'GOVERNED BY OTHER GOVERNMENT DEPARTMENTS',
    SAINIK_SCHOOL = 'SAINIK SCHOOL',
    OTHERS = 'OTHERS',
}
export enum SCHOOL_SUB_TYPE {
    BOYS = 'BOYS',
    GIRLS = 'GIRLS',
    BOTH = 'BOTH',
}
export enum GENDER {
    // Male = 'Male',
    // Female = 'Female',
    // Other = 'Other',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum ASSIGN_TYPE {
    RETURNABLE = 'RETURNABLE',
    NOT_RETURNABLE = 'NOT_RETURNABLE',
}
export enum RETURN_STATUS {
    RETURN = 'RETURN',
    NOT_RETURN = 'NOT_RETURN',
    PENDING = 'PENDING',
}
export enum ACADEMIC_CALENDARS_TYPE {
    BATCH = 'BATCH',
    GLOBAL = 'GLOBAL',
    INSTITUTE = 'INSTITUTE',
}
export enum USER_TYPES {
    MASTER_ADMIN = 'MASTER_ADMIN',
    ADMIN = 'ADMIN',
    INSTITUTE_MASTER_ADMIN = 'INSTITUTE_MASTER_ADMIN',
    INSTITUTE_ADMIN = 'INSTITUTE_ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    PARENTS = 'PARENTS',
    DRIVER = 'DRIVER',
}

export enum TOKEN_TYPES {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    OTP_VERIFICATION_TOKEN = 'OTP_VERIFICATION_TOKEN',
    EMAIL_VERIFICATION_TOKEN = 'EMAIL_VERIFICATION_TOKEN',
}

export enum COMMAN_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
export enum USER_COURSE_STATUS {
    RUNNING = 'RUNNING',
    EXPIRED = 'EXPIRED',
    SUSPENDED = 'SUSPENDED',
}
export enum TRIP_TYPE {
    PICK_UP = 'PICK_UP',
    DROP = 'DROP',
}
export enum GREETING_TYPE {
    HIGHEST_MARKS = 'HIGHEST_MARKS',
    BIRTHDAY = 'BIRTHDAY', //
    ANNIVERSARY = 'ANNIVERSARY', //
    HIGHEST_ATTENDANCE = 'HIGHEST_ATTENDANCE',
    PUNCTUAL = 'PUNCTUAL',
    FESTIVAL = 'FESTIVAL',
}
export enum FEE_REMINDER_SETTING_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    // DEFAULT = 'DEFAULT',
}
export enum TERM_DURATION {
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY',
    HALF_YEARLY = 'HALF_YEARLY',
}
export enum FEE_REMINDER_SETTING_TYPE {
    DUE_SOON = 'DUE_SOON',
    DUE_TODAY = 'DUE_TODAY',
    LATE_PAYMENT = 'LATE_PAYMENT',
    OVER_DUE = 'OVER_DUE',
}
export enum FEE_REMINDER_SETTING_FREQUENCY {
    ONCE_A_DAY = 'ONCE_A_DAY',
    TWICE_A_DAY = 'TWICE_A_DAY',
    THREE_A_DAY = 'THREE_A_DAY',
    FOUR_A_DAY = 'FOUR_A_DAY',
}
export enum FEE_TYPE_FREQUENCY {
    ONCE_IN_A_LIFE = 'ONCE_IN_LIFE',
    MULTIPlE_TIME_IN_YEAR = 'MULTIPlE_TIME_IN_YEAR',
}
export enum PAYMENT_TYPE {
    CASH = 'CASH',
    CHEQUE = 'CHEQUE',
    UPI = 'UPI',
}
export enum FEE_PAYMENT_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    SEND_REQUEST = 'SEND_REQUEST',
}
export enum INSTITUTE_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
export enum OFFER_TYPE {
    AMOUNT = 'AMOUNT',
    PERCENTAGE = 'PERCENTAGE',
}
export enum OFFER_NAME {
    FEE = 'FEE',
    COURSE = 'COURSE',
}
export enum LEAVE_TYPE {
    FULL_DAY = 'FULL_DAY',
    FIRST_HALF = 'FIRST_HALF',
    SECOND_HALF = 'SECOND_HALF',
}
export enum LEAVE {
    PAID = 'PAID',
    UN_PAID = 'UN_PAID',
}
export enum LEAVE_STATUS {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
}

export enum WORKIN_DAY_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
export enum SCHOOL_SHIFT {
    MORNING = 'MORNING',
    NOON = 'NOON',
    // BOTH = 'BOTH',
}

export enum INSTITUTE_ENTITY_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum INSTITUTE_ENTITY_TYPE_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum INSTITUTE_ENTITY_TYPE_SEQUENCE {
    FIRST = 'FIRST',
    LAST = 'LAST',
}
export enum ADMISSION_TYPE {
    REGULAR = 'REGULAR',
    RTE = 'RTE',
}
export enum NO_TYPE {
    GPF_NO = 'GPF_NO',
    EPF_NO = 'EPF_NO',
    NA = 'NA',
}
export enum USER_DETAILS {
    FORMAL_SOLDIER = 'FORMAL_SOLDIER',
    PHYSICALLY_HANDICAP = 'PHYSICALLY_HANDICAP',
}
export enum WORK_TYPE {
    JOB = 'JOB',
    BUSINESS = 'BUSINESS',
    SELF_EMPLOYED = 'SELF_EMPLOYED',
}
export enum BLOG_STATUS {
    ACCEPTED = 'ACCEPTED',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
}
export enum WORK_CATEGORY {
    GOVERNMENT = 'GOVERNMENT',
    PRIVATE = 'PRIVATE',
    SELF_EMPLOYED = 'SELF_EMPLOYED',
    OTHER = 'OTHER',
}
export enum DISABILITY_TYPE {
    VISUALLY_HANDICAP = 'VISUALLY_HANDICAP',
    VISUALLY_HANDIL = 'VISUALLY_HANDIL',
    MENTALLY_CHALLENGED = 'MENTALLY_CHALLENGED',
    ORTHOPEDIC_HANDICAP = 'ORTHOPEDIC_HANDICAP',
    OTHER = 'OTHER',
}

export enum GUARDIANS_USER_META_MODEL_STATUS {
    PENDING = 'PENDING',
    ACEEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum USER_HAS_PARENT_STATUS {
    PENDING = 'PENDING',
    ACEEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum USER_INSTITUTE_META_STATUS {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    LEFT = 'LEFT',
    BLOCKED = 'BLOCKED',
    SUBSCRIPTION_PLAN_EXPIRED = 'SUBSCRIPTION_PLAN_EXPIRED',
}

export enum EMPLOYMENT_TYPE {
    PART_TIME = 'PART_TIME',
    FULL_TIME = 'FULL_TIME',
}
export enum FACILITY_TYPE {
    BUILDING = 'BUILDING',
    CO_INFRA = 'CO_INFRA',
}
export enum FEED_BACK_TYPE {
    SUGGESTION = 'SUGGESTION',
    COMPLAINT = 'COMPLAINT',
    REQUEST = 'REQUEST',
}
export enum FEED_BACK_STATUS {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    WORKING = 'WORKING',
    POST_ON_FEED = 'POST_ON_FEED',
}
export enum APP_TYPE {
    INSTITUTE_APP = 'INSTITUTE_APP',
    SCHOOL_APP = 'SCHOOL_APP',
    GLOBAL_APP = 'GLOBAL_APP',
    STUDENT_APP = 'STUDENT_APP',
}
export enum BANNER_TYPE {
    BANNER_IMAGE = 'BANNER_IMAGE',
    BANNER_VIDEO = 'BANNER_VIDEO',
}
export enum ACADEMIC_CALENDARS_STATUS {
    CURRENT_ACADEMIC_CALENDAR = 'CURRENT_ACADEMIC_CALENDAR',
    FUTURE_ACADEMIC_CALENDAR = 'FUTURE_ACADEMIC_CALENDAR',
    PAST_ACADEMIC_CALENDAR = 'PAST_ACADEMIC_CALENDAR',
}
export enum FILE_TYPE {
    FILE_IMAGE = 'FILE_IMAGE',
    FILE_VIDEO = 'FILE_VIDEO',
    FILE_DOCUMENT = 'FILE_DOCUMENT',
}

export enum TYPE_MANAGEMENT_TYPE {
    BATCH = 'BATCH',
    LECTURE = 'LECTURE',
    EXAM = 'EXAM',
    PAYMENT = 'PAYMENT',
    VIDEO = 'VIDEO', //not used
    NOTE = 'NOTE', //not used
    LEAVE = 'LEAVE',
    ASSIGNMENT = 'ASSIGNMENT', //not used
    CATEGORY = 'CATEGORY', //not used
    HOLIDAY = 'HOLIDAY',
    FEES = 'FEES', //not used
    MATERIAL = 'MATERIAL', // subject index file category materials(categoryId)
    FACILITY = 'FACILITY',
    // FEE_TYPE = 'FEE_TYPE',
    SERVICE_FEE = 'SERVICE_FEE',
    GENERAL_FEE = 'GENERAL_FEE',
    BOOK_ASSESSMENT = 'BOOK_ASSESSMENT',
    PROJECT_ASSESSMENT = 'PROJECT_ASSESSMENT',
    ROOM_TYPE = 'ROOM_TYPE',
}

export enum TYPE_MANAGEMENT_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}
export enum APPROVE_REQUEST_TYPE {
    BLOG = 'BLOG',
}
export enum APPROVE_REQUEST_STATUS {
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED',
    REJECTED = 'REJECTED',
}

export enum ANNOUCEMENT_SCHEDULE_TYPE {
    INSTANT = 'INSTANT',
    SCHEDULE = 'SCHEDULE',
}
export enum TYPE_OF_USER {
    USER = 'USER',
    INSTITUTE = 'INSTITUTE',
    SCHOOL = 'SCHOOL',
}

export enum ANNOUCEMENT_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    CREATED = 'CREATED',
}

export enum USER_HAS_ANNOUCEMENT_STATUS {
    SENT = 'SENT',
    VIEW = 'VIEW',
}
export enum GREETING_STATUS {
    SENT = 'SENT',
    PENDING = 'PENDING',
}

export enum EXAM_MODE {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}
export enum COURSE_STATUS {
    SAVE_AS_DRAFT = 'SAVE_AS_DRAFT',
    PUBLISH = 'PUBLISH',
}

export enum EXAM_STATUS {
    PENDING = 'PENDING',
    PARTIAL_PROCESSING = 'PARTIAL_PROCESSING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    PARTIAL_COMPLETED = 'PARTIAL_COMPLETED',
    RESULT_OUT = 'RESULT_OUT',
    CANCELED = 'CANCELED',
}

export enum EXAM_ANSWER_SELECTION_TYPE {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE',
}

export enum EXAM_VALID_ANSWER_TYPE {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE',
    ALL = 'ALL',
}

export enum EXAM_ANSWER_SHEET_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SUBMITED = 'SUBMITED',
}

export enum EXAM_ANSWER_SHEET_RESULT_STATUS {
    PENDING = 'PENDING',
    PASS = 'PASS',
    FAILED = 'FAILED',
    ABSENT = 'ABSENT',
}

export enum EXAM_ANSWER_SHEET_RESULT_TYPE {
    MASTER = 'MASTER',
    ANSWERS = 'ANSWERS',
}
export enum PAYMENT_TERMS_STATUS {
    DUE = 'DUE',
    PAID = 'PAID',
}
export enum PAYMENT_TERMS_TYPE {
    YEARLY = 'YEARLY',
    MONTHLY = 'MONTHLY',
    HALF_YEARLY = 'HALF_YEARLY',
    QUARTERLY = 'QUARTERLY',
    FULL_PAYMENT = 'FULL_PAYMENT',
}

export enum EXAM_ANSWER_SHEET_QUESTION_RESULT {
    INVALID = 'INVALID',
    VALID = 'VALID',
    NOT_ATTENDED = 'NOT_ATTENDED',
}

export enum LECTURE_SLOT_DURATION {
    HOUR = 60,
    HALF_HOUR = 30,
}

export enum SUBJECT_INDEX_TYPE {
    INSTITUTE = 'INSTITUTE',
    PRIVATE = 'PRIVATE',
    BATCH = 'BATCH',
    MASTER = 'MASTER',
}

export enum EXAM_GROUP_STATUS {
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED',
    CANCELED = 'CANCELED',
}

export enum EXAM_GROUP_STANDARD_RESULT {
    PENDING = 'PENDING',
    RESULT_OUT = 'RESULT_OUT',
}

export enum INQUIRY_REFERRED_BY {
    WALK_IN = 'WALK_IN',
    CALL_RECEIVED_FROM_INSTITUTE = 'CALL_RECEIVED_FROM_INSTITUTE',
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',
    ADVERTISEMENT = 'ADVERTISEMENT',
    NONE_OF_THIS = 'NONE_OF_THIS',
}
export enum INQUIRY_STATUS {
    // REGISTERED = 'REGISTERED',
    // REGISTER = 'REGISTER',
    // REGISTRATION = 'REGISTRATION',
    ENROLL = 'ENROLL',
    NOT_ENROLL = 'NOT_ENROLL',
}

export enum IMAGE__NAME {
    PROFILE_PICTURE = 'PROFILE_PICTURE',
    SIGNATURE = 'SIGNATURE',
    AADHAR_CARD = 'AADHAR_CARD',
    PAN_CARD = 'PAN_CARD',
    PASSPORT_CARD = 'PASSPORT_CARD',
    VOTER_ID_CARD = 'VOTER_ID_CARD',
    DRIVING_LICENSE_CARD = 'DRIVING_LICENSE_CARD',
    LEAVING_CERTIFICATE = 'LEAVING_CERTIFICATE',
    RATION_CARD = 'RATION_CARD',
    BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
    ADDRESS_PROOF = 'ADDRESS_PROOF',
    INCOME_CERTIFICATE = 'INCOME_CERTIFICATE',
    CASTE_CERTIFICATE = 'CASTE_CERTIFICATE',
    EDUCATIONAL_CERTIFICATE = 'EDUCATIONAL_CERTIFICATE',
    EXPERIENCE_CERTIFICATE = 'EXPERIENCE_CERTIFICATE',
    APPOINTMENT_LETTER = 'APPOINTMENT_LETTER',
    SALARY_SLIP = 'SALARY_SLIP',
    OTHER_DOCUMENT = 'OTHER_DOCUMENT',
    SCHOOL_LEAVING_CERTIFICATE = 'SCHOOL_LEAVING_CERTIFICATE',
    MEDICAL_REPORT = 'MEDICAL_REPORT',
    RESUME = 'RESUME',
}

export enum CHAPTER_INDEX_TYPE {
    CHAPTER = 'CHAPTER',
    TOPIC = 'TOPIC',
    SUB_TOPIC = 'SUB_TOPIC',
}
export enum USER_CHAPTER_INDEX_STATUS {
    COMPLETED = 'COMPLETED',
    RUNNING = 'RUNNING',
    NOT_COMPLETED = 'NOT_COMPLETED',
}
export enum FEE_HISTORY_STATUS {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
}
export enum CHAPTER_INDEX_FILE_TYPE {
    VIDEO = 'VIDEO',
    PDF_NOTE = 'PDF_NOTE',
    HOME_WORK = 'HOME_WORK',
    CLASS_WORK = 'CLASS_WORK',
}

export enum PARENTS_CHILDREN_CURRENT {
    PARENTS = 'PARENTS',
    CHILDREN = 'CHILDREN',
    CURRENT = 'CURRENT',
}

export enum USER_PAYOUT_TYPE {
    PERCENTAGE = 'PERCENTAGE',
    HOURLY = 'HOURLY',
    MONTHLY = 'MONTHLY',
}
export enum QDC_NAME {
    LAKSHMI_VIKAS_SANKUL_ANR02 = 'LAKSHMI_VIKAS_SANKUL_ANR02',
}
export enum SVA_NAME {
    LAKSHMI_VIKAS_SANKUL_ANR02 = 'LAKSHMI_VIKAS_SANKUL_ANR02',
}
export enum TRUST_TYPE {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
    RELIGIOUS = 'RELIGIOUS',
    CHARITABLE = 'CHARITABLE',
    SOCIETY = 'SOCIETY',
    GOVERNMENT = 'GOVERNMENT',
    FAMILY = 'FAMILY',
}
export enum TRUST_REGISTERED_UNDER {
    // INDIAN_TRUST_ACT = 'INDIAN_TRUST_ACT',
    // SOCIETY_REGISTRATION_ACT = 'SOCIETY_REGISTRATION_ACT',
    // COMPANIES_ACT = 'COMPANIES_ACT',
    // RELIGIOUS_ENDOWMENTS_ACT = 'RELIGIOUS_ENDOWMENTS_ACT',
    // CHARITABLE_ENDOWMENTS_ACT = 'CHARITABLE_ENDOWMENTS_ACT',
    THE_SOCIETIES_REGISTRATION_ACT_1860 = 'THE_SOCIETIES_REGISTRATION_ACT_1860',
    THE_BOMBAY_PUBLIC_ACT_1950 = 'THE_BOMBAY_PUBLIC_TRUSTS_ACT_1950',
    OTHER = 'OTHER',
}
export enum DESIGNATION_OF_PERSON {
    TRUSTEE = 'TRUSTEE',
    MANAGING_TRUSTEE = 'MANAGING_TRUSTEE',
    DIRECTOR = 'DIRECTOR',
    MANAGING_DIRECTOR = 'MANAGING_DIRECTOR',
}

export enum PROPERTY_STATUS {
    RENTED = 'RENTED',
    OWNED = 'OWNED',
}
export enum BOOLEAN_STATUS {
    YES = 'YES',
    NO = 'NO',
}
export enum FEE_TYPE {
    'GENERAL_FEE' = 'GENERAL_FEE',
    'SERVICE_FEE' = 'SERVICE_FEE',
}
export enum IS_PRINCIPAL {
    NO = 'NO',
    PERMANENT = 'PERMANENT',
    IN_CHARGE = 'IN_CHARGE',
}
export enum CATEGORY {
    ST = 'ST',
    OBC = 'OBC',
    SC = 'SC',
    GENERAL = 'GENERAL',
    EWS = 'EWS',
}

export enum NATIONALITY {
    INDIAN = 'INDIAN',
    AMERICAN = 'AMERICAN',
    BRITISH = 'BRITISH',
    CANADIAN = 'CANADIAN',
    AUSTRALIAN = 'AUSTRALIAN',
    CHINESE = 'CHINESE',
    JAPANESE = 'JAPANESE',
    FRENCH = 'FRENCH',
    GERMAN = 'GERMAN',
    ITALIAN = 'ITALIAN',
    SPANISH = 'SPANISH',
    RUSSIAN = 'RUSSIAN',
    BRAZILIAN = 'BRAZILIAN',
    SOUTH_AFRICAN = 'SOUTH_AFRICAN',
    SAUDI = 'SAUDI',
    UAE = 'UAE',
    BANGLADESHI = 'BANGLADESHI',
    PAKISTANI = 'PAKISTANI',
    SRI_LANKAN = 'SRI_LANKAN',
    NEPALESE = 'NEPALESE',
    BHUTANESE = 'BHUTANESE',
}

export enum RELIGION_CASTE {
    HINDU = 'HINDU',
    MUSLIM = 'MUSLIM',
    CHRISTIAN = 'CHRISTIAN',
    SIKH = 'SIKH',
    BUDDHIST = 'BUDDHIST',
    JAIN = 'JAIN',
    JEWISH = 'JEWISH',
    PARSI = 'PARSI',
}

export enum CASTE {
    GENERAL = 'GENERAL',
    OBC = 'OBC',
    SC = 'SC',
    ST = 'ST',
    BRAHMIN = 'BRAHMIN',
    KSHATRIYA = 'KSHATRIYA',
    VAISHYA = 'VAISHYA',
    SHUDRA = 'SHUDRA',
    MARATHA = 'MARATHA',
    RAJPUT = 'RAJPUT',
    PANDIT = 'PANDIT',
    KAYASTHA = 'KAYASTHA',
    REDDY = 'REDDY',
    NAIR = 'NAIR',
    GOUNDAR = 'GOUNDAR',
    IYENGAR = 'IYENGAR',
    IYER = 'IYER',
    YADAV = 'YADAV',
    BHUMIHAR = 'BHUMIHAR',
    KOLI = 'KOLI',
}

export const SCHOOL_INFORMATION_STEP = 7 as const;
// SCHOOL_INFORMATION = 'SCHOOL_INFORMATION',
// TRUST_INFORMATION = 'TRUST_INFORMATION',
// TRUSTIES_INFORMATION = 'TRUSTIES_INFORMATION',
// BUILDING_INFORMATION = 'BUILDING_INFORMATION',
// TEACHER_INFORMATION = 'TEACHER_INFORMATION',
// PRINCIPLE_INFORMATION = 'PRINCIPLE_INFORMATION',
// OTHER_INFORMATION = 'OTHER_INFORMATION',

export enum LECTURE_STATUS {
    COMPLETED = 'COMPLETED',
    RUNNING = 'RUNNING',
    NOT_STARTED = 'NOT_STARTED',
}

export enum LECTURE_TITLE {
    LECTURE = 'LECTURE',
    BREAK = 'BREAK',
    PRAYER = 'PRAYER',
    PREPARATION_TIME = 'PREPARATION_TIME',
    ACTIVITY = 'ACTIVITY',
}

export enum TO_DO_STATUS {
    COMPLETED = 'COMPLETED',
    RUNNING = 'RUNNING',
    PENDING = 'PENDING',
}

export const SVG_URL_PATH = 'public/svg';
export const UPLOAD_PATH = 'public/uploads';

export const DEFAULT_INSTITUTED_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqqjmZohb-t9cT5vqbD1HgMUfSA8bzoKdjg&s';

export const API_URL = ENV_VARIABLE.SERVER_URL + '/api/v1';

export const GOOGLE_AUTH = {
    CLIENT_ID: ENV_VARIABLE.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: ENV_VARIABLE.GOOGLE_CLIENT_SECRET,
    REDIRECT_URL: API_URL + '/auth/google/callback',
    SCOPE: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    OAUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    TOKEN_URL: 'https://oauth2.googleapis.com/token',
    USER_PROFILE_URL: 'https://openidconnect.googleapis.com/v1/userinfo',
};

export const META_AUTH = {
    CLIENT_ID: ENV_VARIABLE.META_CLIENT_ID,
    CLIENT_SECRET: ENV_VARIABLE.META_CLIENT_SECRET,
    REDIRECT_URL: API_URL + '/auth/meta/callback',
    SCOPE: 'public_profile,email',
    OAUTH_URL: 'https://www.facebook.com/v21.0/dialog/oauth',
    TOKEN_URL: 'https://graph.facebook.com/v21.0/oauth/access_token',
    USER_PROFILE_URL: 'https://graph.facebook.com/v21.0/me',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const APPLE_AUTH: any = {
    CLIENT_ID: ENV_VARIABLE.APPLE_CLIENT_ID,
    TEAM_ID: ENV_VARIABLE.APPLE_TEAM_ID,
    KEY_ID: ENV_VARIABLE.APPLE_KEY_ID,
    PRIVATE_KEY: ENV_VARIABLE.APPLE_PRIVATE_KEY,
    AUD_URL: 'https://appleid.apple.com',
    TOKEN_URL: 'https://appleid.apple.com/auth/token',
    REVOKE_TOKEN_URL: 'https://appleid.apple.com/auth/revoke',
};

export const PINCODE_API_URL = 'https://api.postalpincode.in/pincode/';

export enum EMAIL_TEMPLATES {
    CREATE_GUARDIAN_VERIFICATION = 'createGuardianVerificatin',
    PARENTS_VERIFICATION = 'parentsVerification',
    // PARENTS_VERIFICATION = 'parentsVerificationOld',
    TEACHER_VERIFICATION = 'teacherVerification',
    STUDENT_VERIFICATION = 'studentVerification',
    PARENTS_CREDENTIALS_TEMPLATE = 'parentCredentialsTemplate',
    STUDENT_CREDENTIALS_TEMPLATE = 'studentCredentialsTemplate',
    COMMON_TEMPLATE = 'commonTemplate',
    CONTACT_FEEDBACK_TEMPLATE = 'contactFeedbackTemplate',
}
export enum PDF_TEMPLATES {
    FEE_INVOICE_TEMPLATE = 'feeInvoiceTemplate',
    GENERATE_ID_CARD = 'generateIdCard',
    GENERATE_RULE_PDF = 'generateRulePdf',
    COMMON_REPORT_EXPORT_TEMPLATE = 'commonReportExportTemplate',
    // FEE_INVOICE_TEMPLATE = 'htmlfee',
}

export enum EMAIL_SUBJECTS {
    CREATE_GUARDIAN_VERIFICATION = 'Verification Of Guardian Request',
    PARENTS_VERIFICATION = 'Verification Of Joining Institute Of Children',
    TEACHER_VERIFICATION = 'Verification Of Joining Institute as Teacher',
    STUDENT_VERIFICATION = 'Verification Of Joining School as Student',
    CONTACT_SUPPORT = 'Contact Support for Institute',
    FEEDBACK = 'Feedback for Institute',
}
export const bankAccountRegexMap: Record<
    | 'SBIN'
    | 'HDFC'
    | 'ICIC'
    | 'UTIB'
    | 'PUNB'
    | 'BARB'
    | 'KKBK'
    | 'YESB'
    | 'CNRB'
    | 'UBIN'
    | 'INDB'
    | 'IDFB'
    | 'FDRL'
    | 'HSBC'
    | 'RATN'
    | 'SIBL'
    | 'KVBL'
    | 'UCBA'
    | 'BKID'
    | 'CBIN'
    | 'IOBA'
    | 'DBSS'
    | 'VIJB'
    | 'BKDN'
    | 'SYNB'
    | 'TMBL'
    | 'CIUB'
    | 'SCBL'
    | 'SRCB',
    RegExp
> = {
    SBIN: /^[0-9]{11}$/, // State Bank of India
    HDFC: /^[0-9]{14}$/, // HDFC Bank
    ICIC: /^[0-9]{12}$/, // ICICI Bank
    UTIB: /^[0-9]{15}$/, // Axis Bank
    PUNB: /^[0-9]{16}$/, // Punjab National Bank
    BARB: /^[0-9]{14}$/, // Bank of Baroda
    KKBK: /^[0-9]{10}$/, // Kotak Mahindra Bank
    YESB: /^[0-9]{15}$/, // Yes Bank
    CNRB: /^[0-9]{13}$/, // Canara Bank
    UBIN: /^[0-9]{12}$/, // Union Bank of India
    INDB: /^[0-9]{14}$/, // IndusInd Bank
    IDFB: /^[0-9]{11}$/, // IDFC First Bank

    // Additional banks (prefix-based)
    FDRL: /^[0-9]{14}$/, // Federal Bank
    HSBC: /^[0-9]{9,12}$/, // HSBC Bank
    RATN: /^[0-9]{10,14}$/, // RBL Bank
    SIBL: /^[0-9]{16}$/, // South Indian Bank
    KVBL: /^[0-9]{15}$/, // Karur Vysya Bank
    UCBA: /^[0-9]{14}$/, // UCO Bank
    BKID: /^[0-9]{15}$/, // Bank of India
    CBIN: /^[0-9]{15}$/, // Central Bank of India
    IOBA: /^[0-9]{15}$/, // Indian Overseas Bank
    DBSS: /^[0-9]{12}$/, // DBS Bank
    VIJB: /^[0-9]{15}$/, // Vijaya Bank
    BKDN: /^[0-9]{14}$/, // Dena Bank
    SYNB: /^[0-9]{13}$/, // Syndicate Bank
    TMBL: /^[0-9]{15}$/, // Tamilnad Mercantile Bank
    CIUB: /^[0-9]{15}$/, // City Union Bank
    SCBL: /^[0-9]{11,13}$/, // Standard Chartered Bank
    SRCB: /^[0-9]{11,15}$/, // Saraswat Co-op Bank
};

export const templateKeyWord = [
    {
        keyWord: '@studentName',
        name: '[student name]',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (data: any) => {
            return `${data.firstName} ${data.lastName}`;
        },
    },
    {
        name: '[amount]',
        keyWord: '@amount',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (data: any) => {
            return data.amount;
        },
    },
    {
        name: '[due date]',
        keyWord: '@dueDate',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: (data: any) => {
            return data.dueDate;
        },
    },
];

export const DEVICE_TYPE = {
    INSTITUTED: [USER_TYPES.MASTER_ADMIN, USER_TYPES.ADMIN, USER_TYPES.INSTITUTE_MASTER_ADMIN, USER_TYPES.INSTITUTE_ADMIN, USER_TYPES.TEACHER],
    STUDENT: [USER_TYPES.MASTER_ADMIN, USER_TYPES.ADMIN, USER_TYPES.STUDENT, USER_TYPES.PARENTS],
};

export const USER_DETAILS_FILED = ['intersetedEntities', 'qualifications', 'bio', 'files', 'experiences'];

export enum TASK_MANAGEMENT_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

export enum BOOK_ASSESSMENT_DATE_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export enum USER_BOOK_ASSESSMENT_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export enum PROJECT_ASSESSMENT_OPTION_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export enum NOTIFICATION_TYPE {
    PUSH = 'PUSH',
    SOCKET = 'SOCKET',
}

export enum NOTIFICATION_STATUS {
    SEND = 'SEND',
    PENDING = 'PENDING',
    VIEW = 'VIEW',
}

export enum NOTIFICATION_MODULE_TYPE {
    ANNOUCEMENT = 'ANNOUCEMENT',
    INSTITUTE_JOINING_REQUEST = 'INSTITUTE_JOINING_REQUEST',
}

export enum NOTIFICATION_ACTION {
    PUSH = 'PUSH',
    SOCKET = 'SOCKET',
}

export enum PLANNER_SYNC_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
}

export enum CONTACT_FEED_BACK_TYPE {
    CONTACT_SUPPORT = 'CONTACT_SUPPORT',
    FEEDBACK = 'FEEDBACK',
}
export enum DISCOUNT_TYPE {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT',
    NONE = 'NONE',
}

export enum SUBSCRIPTION_PLAN_CHARGE_INTERVAL {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
}

export enum VALID_CURRENCY {
    COIN = 'COIN',
    INR = 'INR',
}

export enum SUBSCRIPTION_PLAN_FILES_TYPE {
    ICON = 'ICON',
    TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
}

export enum SOCKET_EVENTS {
    REGISTER = 'REGISTER',
    SEND_FROM_SERVER_EVENT = 'TO_CLIENT',
    GET_FROM_CLIENT_EVENT = 'FROM_CLIENT',
    SEND_NOTIFICATIONS = 'SEND_NOTIFICATIONS',
    GET_NOTIFICATIONS = 'GET_NOTIFICATIONS',
}

export enum HOME_WORK_STATUS {
    COMPLETED = 'COMPLETED',
    NOT_COMPLETED = 'NOT_COMPLETED',
    LATE_COMPLETE = 'LATE_COMPLETE',
    FORGET_BOOK = 'FORGET_BOOK',
}

export enum LANGUAGES {
    ENGLISH = 'ENGLISH',
    HINDI = 'HINDI',
    GUJARATI = 'GUJARATI',
}
export enum PDF_CHEQUE_STATUS {
    ADDED = 'ADDED',
    DEPOSIT_TO_BANK = 'DEPOSIT_TO_BANK',
    RE_DEPOSIT_TO_BANK = 'RE_DEPOSIT_TO_BANK',
    BOUNCE = 'BOUNCE',
    CLEAR = 'CLEAR',
}
export enum PDF_CHEQUE_FREQUENCY {
    YEARLY = 'YEARLY',
    MONTHLY = 'MONTHLY',
    HALF_YEARLY = 'HALF_YEARLY',
    QUARTERLY = 'QUARTERLY',
    FULL_PAYMENT = 'FULL_PAYMENT',
}
export enum INVOICE_PAYMENT_TYPE {
    CASH = 'CASH',
    CREDIT = 'CREDIT',
}

export enum COLUMN_LIST_TITLE {
    FEE = 'FEE',
    DAILY_BOOK = 'DAILY_BOOK',
    FEE_HISTORY = 'FEE_HISTORY',
    USER_HAS_LEAVE = 'USER_HAS_LEAVE',
    FEES_COLLECTION = 'FEES_COLLECTION',
    USER_INSTITUTE_META = 'USER_INSTITUTE_META',
    SCHOOL_FEE_COLLECTION = 'SCHOOL_FEE_COLLECTION',
    USER_HAS_LEAVE_HISTORY = 'USER_HAS_LEAVE_HISTORY',
}

export enum PURCHASE_STATUS {
    PAID = 'PAID',
    UNPAID = 'UNPAID',
}

export enum INVOICE_TYPE {
    CHANLAN = 'CHANLAN',
    INVOICE = 'INVOICE',
    CHEQUE = 'CHEQUE',
    RECEIPT = 'RECEIPT',
}

export enum TEACHER_TYPE {
    SWIPE = 'SWIPE',
    REPLACE = 'REPLACE',
}

export enum REPLACE_TEACHER_STATUS {
    PENDING = 'PENDING',
    SYNC = 'SYNC',
    COMPLETED = 'COMPLETED',
}
export enum WALLET_HISTORY_TYPE {
    BUY = 'BUY',
    SEND = 'SEND',
    RECEIVE = 'RECEIVE',
    REFUND = 'REFUND',
}

export enum WALLET_HISTORY_ITEM_TYPE {
    COIN = 'COIN',
    STORAGE = 'STORAGE',
    PLAN = 'PLAN',
    USER = 'USER',
}

export enum WALLET_HISTORY_ACTION {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
}

export enum WALLET_HISTORY_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    FAILED = 'FAILED',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
}

export enum WALLET_TRANSACTION_USERS_TYPE {
    SENDER = 'SENDER',
    RECEIVER = 'RECEIVER',
    SELF = 'SELF',
}

export enum INSTITUTE_SUBSCRIPTION_PLAN_STATUS {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    EXPIRED_SOON = 'EXPIRED_SOON',
}

export enum CHARGE_PER_TRANSACTION_ITEM_UNIT {
    USER = 2,
    STUDENT = 1,
    ONE_GB_STORAGE = 10,
}
export const ONE_GB_BYTES = 1073741824;
export enum JOB_ACTION {
    PENDING = 'PENDING',
    VIEW = 'VIEW',
    PROCESSING = 'PROCESSING',
    ON_HOLD = 'ON_HOLD',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum PAYMENT_GATEWAY_TYPES {
    RAZORPAY = 'RAZORPAY',
    PHONEPE = 'PHONEPE',
    GOOGLEPAY = 'GOOGLEPAY',
    COIN = 'COIN',
}

export enum PAYMENT_METHODS {
    DEBIT_CARD = 'DEBIT_CARD',
    CREDIT_CARD = 'CREDIT_CARD',
    UPI = 'UPI',
    WALLET = 'WALLET',
}

export const WALLET_TRANSACTION_VALID_DATE_IN_MINUTES = 60;

export const WALLET_TRANSACTION_VALID_DATE_FOR_OTP_IN_MINUTES = 2;

export const COIN_PURCHASE_GST_PERCENTAGE = 18;

export const PAYMENT_PROCESSING_STATUS_URL = ENV_VARIABLE.SERVER_URL + '/api/v1/openRoute/paymentProcessor/status';

export const PAYMENT_PROCESSING_PAGE_URL = ENV_VARIABLE.SERVER_URL + '/api/v1/openRoute/paymentProcessor/paymentPage';

export const PAYMENT_PROCESSING_CALLBACK_URL = ENV_VARIABLE.SERVER_URL + '/api/v1/paymentProcessor/callback';

export const INITIAL_FREE_COIN = 500;

export const INITIAL_FREE_STORAGE_IN_GB = 1;

export const FREE_SUBSCRIPTION_SEQUENCE = [1];
