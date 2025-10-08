import { ENV_VARIABLE } from '../configs/env';

export const BANNER_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const INSTITUTE_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const USER_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const FEE_HISTORY_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const EXAM_ANSWER_SHEET_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const HOLIDAY_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const ANNOUNCEMENT_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const USER_SCHOOL_META_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const SUBJECT_INDEX_FILE_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const INVALIDATE_TEACHER_DATA_FILE_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`; //baki user ma asvhe

export const INVALIDATE_STUDENT_DATA_FILE_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`; //baki user ma asvhe

export const ACCOUNT_HAS_RECEIPT_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;

export const DRIVER_PATH = `${ENV_VARIABLE.SERVER_URL}/public/uploads/`;
export const S3_STORAGE_PATH = {
    BANNER_PATH: 'banner',
    INSTITUTE_PATH: 'institute',
    USER_PATH: 'user',
    FEE_HISTORY_PATH: 'fee_history',
    EXAM_ANSWER_SHEET_PATH: 'exam',
    HOLIDAY_PATH: 'holiday',
    USER_SCHOOL_META_PATH: 'school',
    ANNOUNCEMENT_PATH: 'announcement',
    SUBJECT_INDEX_FILE_PATH: 'subject_index_file',
    ACCOUNT_HAS_RECEIPT_PATH: 'bank_account',
    DEFAULT_PATH: 'default_upload',
    ID_CARDS: 'id_cards',
    PHOTO_GALLERY: 'photo_gallery',
};
