// import { IUserAttributes } from '../interfaces/userInterface';

import { IUserAttributes } from "@kipipackages/interfaces";

export enum SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Resource created successfully',
    UPDATE_SUCCESS = 'Resource updated successfully',
    DELETE_SUCCESS = 'Resource deleted successfully',
    GENERIC_SUCCESS = 'Operation completed successfully',
    USER_REMOVE_SUCCESS = 'User removed!',
    USER_REGISTER_SUCCESS = 'User register successfully!',
    USER_LOGIN_SUCCESS = 'User login successfully!',
    REFRESH_TOKEN_SUCCESS = 'Tokens get successfully!',
    USER_LOOUT_SUCCESS = 'User logout successfully!',
    USER_UPDATE_SUCCESS = 'User data update successfully!',
}

export enum USER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User created successfully',
    GET_SUCCESS = 'User retrieved successfully',
    UPDATE_SUCCESS = 'User updated successfully',
    DELETE_SUCCESS = 'User deleted successfully',
    ROLE_PERMISSIONS_GET_SUCCESS = 'User permissions retrieved successfully',
    USER_PASSWORD_UPDATE_SUCCESS = 'User password update successfully!',
    OTP_GENERATE_SUCCESS = 'User verification otp generated successfully',
    OTP_VERIFICATION_SUCCESS = 'User otp verification successfull',
    TEACHER_ADDED_SUCCESS = 'Teacher file processed successfully',
    STUDENT_ADDED_SUCCESS = 'Student file processed successfully',
    USER_DATA_WITH_PARENTS_UPDATE_SUCCESS = 'User data with parents updated successfully',
    SWITCH_USER_SUCCESS = 'User switched successfully',
}
export enum BANNER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Banner created successfully',
    GET_SUCCESS = 'Banner retrieved successfully',
    UPDATE_SUCCESS = 'Banner updated successfully',
    DELETE_SUCCESS = 'Banner deleted successfully',
}
export enum APPROVE_REQUEST_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Request created successfully',
    GET_SUCCESS = 'Request retrieved successfully',
    UPDATE_SUCCESS = 'Request updated successfully',
    DELETE_SUCCESS = 'Request deleted successfully',
}
export enum ADMIN_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Data created successfully from admin side',
    GET_SUCCESS = 'Data retrieved successfully from admin side',
    UPDATE_SUCCESS = 'Data updated successfully from admin side',
    DELETE_SUCCESS = 'Data deleted successfully from admin side',
}
export const USER_FEE_TYPE_ACCOUNT_SUCCESS_MESSAGES = {
    GET_SUCCESS: 'User fee type account data retrieved successfully.',
    CREATE_SUCCESS: 'User fee type account created successfully.',
    UPDATE_SUCCESS: 'User fee type account updated successfully.',
    DELETE_SUCCESS: 'User fee type account deleted successfully.',
};

export enum USER_FEE_TYPE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User Fee Type created successfully',
    GET_SUCCESS = 'User Fee Type retrieved successfully',
    UPDATE_SUCCESS = 'User Fee Type updated successfully',
    DELETE_SUCCESS = 'User Fee Type deleted successfully',
}
export const SCHOOL_FEES_COLLECTION_SUCCESS_MESSAGES = {
    CREATE_SUCCESS: 'School fee collection record created successfully.',
    UPDATE_SUCCESS: 'School fee collection record updated successfully.',
    DELETE_SUCCESS: 'School fee collection record deleted successfully.',
    GET_SUCCESS: 'School fee collection record fetched successfully.',
};
export enum FEE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Fee created successfully!',
    GET_SUCCESS = 'Fee retrieved successfully!',
    UPDATE_SUCCESS = 'Fee updated successfully!',
    DELETE_SUCCESS = 'Fee deleted successfully!',
    FEE_PAY_SUCCESS = 'fee paid successfully',
}
export enum INQUIRY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Inquiry created successfully!',
    GET_SUCCESS = 'Inquiry retrieved successfully!',
    UPDATE_SUCCESS = 'Inquiry updated successfully!',
    DELETE_SUCCESS = 'Inquiry deleted successfully!',
}
export enum INFORMATION_SUPPORT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Information support created successfully!',
    GET_SUCCESS = 'Information support data retrieved successfully!',
    UPDATE_SUCCESS = 'Information support updated successfully!',
    DELETE_SUCCESS = 'Information support deleted successfully!',
    BULK_CREATE_SUCCESS = 'Information support bulk created successfully!',
}

export enum FEEDBACK_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Feedback submitted successfully!',
    GET_SUCCESS = 'Feedback retrieved successfully!',
    UPDATE_SUCCESS = 'Feedback updated successfully!',
    DELETE_SUCCESS = 'Feedback deleted successfully!',
}

export enum FEE_TYPE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Fee type created successfully!',
    GET_SUCCESS = 'Fee type retrieved successfully!',
    UPDATE_SUCCESS = 'Fee type updated successfully!',
    DELETE_SUCCESS = 'Fee type deleted successfully!',
}

export enum ACCOUNT_RECEIPT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Account receipt data created successfully!',
    GET_SUCCESS = 'Account receipt data retrieved successfully!',
    UPDATE_SUCCESS = 'Account receipt data updated successfully!',
    DELETE_SUCCESS = 'Account receipt data deleted successfully!',
}

export enum BANK_ACCOUNT_DETAILS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Bank account details saved successfully!',
    GET_SUCCESS = 'Bank account details retrieved successfully!',
    UPDATE_SUCCESS = 'Bank account details updated successfully!',
    DELETE_SUCCESS = 'Bank account details deleted successfully!',
}

export enum SUBSCRIPTION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Subscription created successfully',
    GET_SUCCESS = 'Subscription retrieved successfully',
    UPDATE_SUCCESS = 'Subscription updated successfully',
    DELETE_SUCCESS = 'Subscription deleted successfully',
}

export enum SCHOOL_SHIFT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'School shift created successfully',
    GET_SUCCESS = 'School shift retrieved successfully',
    UPDATE_SUCCESS = 'School shift updated successfully',
}
export enum FEE_REMINDER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Fee reminder type created successfully',
    GET_SUCCESS = 'Fee reminder type retrieved successfully',
    UPDATE_SUCCESS = 'Fee reminder type updated successfully',
    DELETE_SUCCESS = 'Fee reminder type deleted successfully',
}
export enum FACILITY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Facility created successfully',
    GET_SUCCESS = 'Facility retrieved successfully',
    UPDATE_SUCCESS = 'Facility updated successfully',
    DELETE_SUCCESS = 'Facility deleted successfully',
    UPSERT_SUCCESS = 'Facility upserted successfully',
}
export enum PAYMENT_TERMS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Payment terms created successfully',
    GET_SUCCESS = 'Payment terms retrieved successfully',
    UPDATE_SUCCESS = 'Payment terms updated successfully',
    DELETE_SUCCESS = 'Payment terms deleted successfully',
}

export enum LEAVE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'leave created successfully',
    GET_SUCCESS = 'leave retrieved successfully',
    UPDATE_SUCCESS = 'leave updated successfully',
    DELETE_SUCCESS = 'leave deleted successfully',
}
export enum MASTER_LEAVE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'master leave data created successfully',
    GET_SUCCESS = 'master leave data retrieved successfully',
    UPDATE_SUCCESS = 'master leave data updated successfully',
    DELETE_SUCCESS = 'master leave data deleted successfully',
}
export enum FEE_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'fee history created successfully',
    GET_SUCCESS = 'fee history retrieved successfully',
    UPDATE_SUCCESS = 'fee history updated successfully',
    DELETE_SUCCESS = 'fee history deleted successfully',
    EXPORT_SUCCESS = ' fee history Data export successfully',
}
export enum SUBJECT_HAS_FEE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'subject fee created successfully',
    GET_SUCCESS = 'subject fee retrieved successfully',
    UPDATE_SUCCESS = 'subject fee updated successfully',
    DELETE_SUCCESS = 'subject fee deleted successfully',
}
export enum USER_HAS_INVENTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User has inventory created successfully',
    GET_SUCCESS = 'User has inventory retrieved successfully',
    UPDATE_SUCCESS = 'User has inventory updated successfully',
    DELETE_SUCCESS = 'User has inventory deleted successfully',
}
export enum USER_HAS_INVENTORY_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User has inventory History created successfully',
    GET_SUCCESS = 'User has inventory History retrieved successfully',
    UPDATE_SUCCESS = 'User has inventory History updated successfully',
    DELETE_SUCCESS = 'User has inventory History deleted successfully',
}
export enum INVENTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Inventory created successfully',
    GET_SUCCESS = 'Inventory retrieved successfully',
    UPDATE_SUCCESS = 'Inventory updated successfully',
    DELETE_SUCCESS = 'Inventory deleted successfully',
}
export enum INVENTORY_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Inventory history created successfully',
    GET_SUCCESS = 'Inventory history retrieved successfully',
    UPDATE_SUCCESS = 'Inventory history updated successfully',
    DELETE_SUCCESS = 'Inventory history deleted successfully',
}
export enum CATEGORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Category created successfully',
    GET_SUCCESS = 'Category retrieved successfully',
    UPDATE_SUCCESS = 'Category updated successfully',
    DELETE_SUCCESS = 'Category deleted successfully',
}
export enum OFFER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'offer created successfully',
    GET_SUCCESS = 'offer retrieved successfully',
    UPDATE_SUCCESS = 'offer updated successfully',
    DELETE_SUCCESS = 'offer deleted successfully',
}
export enum FEESCOLLECTION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'FeesCollection created successfully',
    GET_SUCCESS = 'FeesCollection retrieved successfully',
    UPDATE_SUCCESS = 'FeesCollection updated successfully',
    DELETE_SUCCESS = 'FeesCollection deleted successfully',
}
export enum FEEREMINDER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'feeReminder created successfully',
    GET_SUCCESS = 'feeReminder retrieved successfully',
    UPDATE_SUCCESS = 'feeReminder updated successfully',
    DELETE_SUCCESS = 'feeReminder deleted successfully',
}
export enum FEE_REMINDER_SETTING_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'feeReminder setting created successfully',
    GET_SUCCESS = 'feeReminder setting retrieved successfully',
    UPDATE_SUCCESS = 'feeReminder setting updated successfully',
    DELETE_SUCCESS = 'feeReminder setting deleted successfully',
}
export enum USER_HAS_OFFER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User offer created successfully',
    GET_SUCCESS = 'User offer retrieved successfully',
    UPDATE_SUCCESS = 'User offer updated successfully',
    DELETE_SUCCESS = 'User offer deleted successfully',
    CHANGE_OFFER = 'User offer change successfully',
}
export enum USER_HAS_ROLL_NUMBER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User roll number created successfully.',
    GET_SUCCESS = 'User roll number retrieved successfully.',
    UPDATE_SUCCESS = 'User roll number updated successfully.',
    DELETE_SUCCESS = 'User roll number deleted successfully.',
}
export enum HOLIDAY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'holiday created successfully',
    GET_SUCCESS = 'holiday retrieved successfully',
    UPDATE_SUCCESS = 'holiday updated successfully',
    DELETE_SUCCESS = 'holiday deleted successfully',
}
export enum EVENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'event created successfully',
    GET_SUCCESS = 'event retrieved successfully',
    UPDATE_SUCCESS = 'event updated successfully',
    DELETE_SUCCESS = 'event deleted successfully',
}
export enum ACADEMIC_CALENDAR_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Academic calendar created successfully!',
    GET_SUCCESS = 'Academic calendar retrieved successfully!',
    UPDATE_SUCCESS = 'Academic calendar updated successfully!',
    DELETE_SUCCESS = 'Academic calendar deleted successfully!',
}

export enum BATCH_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Batch created successfully',
    GET_SUCCESS = 'Batch retrieved successfully',
    UPDATE_SUCCESS = 'Batch updated successfully',
    DELETE_SUCCESS = 'Batch deleted successfully',
    BATCH_ASSIGN_SUCCESS = 'Batch assigned successfully',
    BATCH_UNASSIGN_SUCCESS = 'Batch unassigned successfully',
}

export enum CLASSROOM_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'classRoom created successfully',
    GET_SUCCESS = 'classRoom retrieved successfully',
    UPDATE_SUCCESS = 'classRoom updated successfully',
    DELETE_SUCCESS = 'classRoom deleted successfully',
}

export enum ROLE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Role created successfully',
    GET_SUCCESS = 'Role retrieved successfully',
    UPDATE_SUCCESS = 'Role updated successfully',
    DELETE_SUCCESS = 'Role deleted successfully',
    ROLE_PERMISSIONS_GET_SUCCESS = 'Role permissions retrieved successfully',
    ROLE_ASSIGN_SUCCESS = 'Role assigned successfully',
}

export enum MODULE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Module created successfully',
    GET_SUCCESS = 'Module retrieved successfully',
    UPDATE_SUCCESS = 'Module updated successfully',
    DELETE_SUCCESS = 'Module deleted successfully',
}

export enum INSTITUTE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Institute created successfully',
    SCHOOL_CREATE_SUCCESS = 'School created successfully',
    GET_SUCCESS = 'Institute retrieved successfully',
    UPDATE_SUCCESS = 'Information updated successfully',
    DELETE_SUCCESS = 'Institute deleted successfully',
    ENTITY_ADDED = 'Institute entities saved successfully',
    DEFAULT_DATA_ADDED = 'Institute default data saved successfully',
    FORCE_FULLY_DEFAULT_DATA_ADDED = 'Institute default data forceFully add successfully',
}

export enum WORKING_DAYS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Working days created successfully',
    GET_SUCCESS = 'Working days retrieved successfully',
    UPDATE_SUCCESS = 'Working days updated successfully',
    DELETE_SUCCESS = 'Working days deleted successfully',
}

export enum INSTITUTE_ENTITY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Institute entity created successfully',
    GET_SUCCESS = 'Institute entity retrieved successfully',
    UPDATE_SUCCESS = 'Institute entity updated successfully',
    DELETE_SUCCESS = 'Institute entity deleted successfully',
    INVALID_SEQUENCE_NUMBER = 'Invalid sequence number provided',
    UPDATE_SEQUENCE_NUMBER_SUCCESS = 'Sequence number updated successfully',
}

export enum INSTITUTE_ENTITY_TYPE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Institute entity type created successfully',
    GET_SUCCESS = 'Institute entity type retrieved successfully',
    UPDATE_SUCCESS = 'Institute entity type updated successfully',
    DELETE_SUCCESS = 'Institute entity type deleted successfully',
}

export enum USER_INSTITUTE_META_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User Institute meta created successfully',
    GET_SUCCESS = 'User Institute meta retrieved successfully',
    UPDATE_SUCCESS = 'User Institute meta updated successfully',
    DELETE_SUCCESS = 'User Institute meta deleted successfully',
    LEFT_SUCCESS = 'User successfully left from Institute meta',
    BULK_UPDATE_SUCCESS = 'Bulk update completed successfully',
    SEND_EMAIL_SUCCESS = 'Email sent successfully',
    EXPORT_USER_INSTITUTE_META_SUCCESS = 'User institute meta report exported successfully',
    UPDATE_REPLACE_TEACHER = 'Teacher replace successfully',
}

export enum PARENTS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Parents created successfully',
    GET_SUCCESS = 'Parents retrieved successfully',
    UPDATE_SUCCESS = 'Parents updated successfully',
    DELETE_SUCCESS = 'Parents deleted successfully',
}

export enum TYPE_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Types created successfully',
    GET_SUCCESS = 'Types retrieved successfully',
    UPDATE_SUCCESS = 'Types updated successfully',
    DELETE_SUCCESS = 'Types deleted successfully',
}

export enum ANNOUCEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Annoucement created successfully',
    GET_SUCCESS = 'Annoucement retrieved successfully',
    UPDATE_SUCCESS = 'Annoucement updated successfully',
    DELETE_SUCCESS = 'Annoucement deleted successfully',
    SEEN_SUCCESS = 'Annoucement seen successfully',
}

export enum EXAM_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Exam created successfully',
    GET_SUCCESS = 'Exam retrieved successfully',
    UPDATE_SUCCESS = 'Exam updated successfully',
    DELETE_SUCCESS = 'Exam deleted successfully',
}

export enum EXAM_HAS_ANSWER_SHEET_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Answers sheet created successfully',
    GET_SUCCESS = 'Answers sheet retrieved successfully',
    UPDATE_SUCCESS = 'Answers sheet updated successfully',
    DELETE_SUCCESS = 'Answers sheet deleted successfully',
}

export enum ATTENDANCE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Attendance created successfully',
    GET_SUCCESS = 'Attendance retrieved successfully',
    UPDATE_SUCCESS = 'Attendance updated successfully',
    DELETE_SUCCESS = 'Attendance deleted successfully',
}
export enum USER_SCHOOL_METADATA_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User school metadata created successfully',
    GET_SUCCESS = 'User school metadata retrieved successfully',
    UPDATE_SUCCESS = 'User school metadata updated successfully',
    DELETE_SUCCESS = 'User school metadata deleted successfully',
}

export enum LECTURE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Lecture created successfully',
    GET_SUCCESS = 'Lecture retrieved successfully',
    UPDATE_SUCCESS = 'Lecture updated successfully',
    DELETE_SUCCESS = 'Lecture deleted successfully',
}
export enum TRIP_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Trip created successfully',
    GET_SUCCESS = 'Trip retrieved successfully',
    UPDATE_SUCCESS = 'Trip updated successfully',
    DELETE_SUCCESS = 'Trip deleted successfully',
}
export enum SLOT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Slot created successfully',
    GET_SUCCESS = 'Slot retrieved successfully',
    UPDATE_SUCCESS = 'Slot updated successfully',
    DELETE_SUCCESS = 'Slot deleted successfully',
}
export enum TO_DO_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'To-do created successfully',
    GET_SUCCESS = 'To-do retrieved successfully',
    UPDATE_SUCCESS = 'To-do updated successfully',
    DELETE_SUCCESS = 'To-do deleted successfully',
}
export enum COURSE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Course created successfully',
    GET_SUCCESS = 'Course retrieved successfully',
    UPDATE_SUCCESS = 'Course updated successfully',
    DELETE_SUCCESS = 'Course deleted successfully',
}
export enum USER_HAS_COURSE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User purchased the course successfully',
    GET_SUCCESS = 'User course retrieved successfully',
    UPDATE_SUCCESS = 'User course updated successfully',
    DELETE_SUCCESS = 'User course deleted successfully',
}
export enum GREETING_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Greeting created successfully',
    GET_SUCCESS = 'Greeting retrieved successfully',
    UPDATE_SUCCESS = 'Greeting updated successfully',
    DELETE_SUCCESS = 'Greeting deleted successfully',
}
export enum PDC_CHEQUE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Pdc cheque created successfully',
    GET_SUCCESS = 'Pdc cheque retrieved successfully',
    UPDATE_SUCCESS = 'Pdc cheque updated successfully',
    DELETE_SUCCESS = 'Pdc cheque deleted successfully',
}
export enum TESTIMONIAL_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Testimonial created successfully',
    GET_SUCCESS = 'Testimonial retrieved successfully',
    UPDATE_SUCCESS = 'Testimonial updated successfully',
    DELETE_SUCCESS = 'Testimonial deleted successfully',
}
export enum VIDEO_ANALYST_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Video analyst created successfully',
    GET_SUCCESS = 'Video analyst retrieved successfully',
    UPDATE_SUCCESS = 'Video analyst updated successfully',
    DELETE_SUCCESS = 'Video analyst deleted successfully',
}
export enum BLOG_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Blog created successfully',
    GET_SUCCESS = 'Blog retrieved successfully',
    UPDATE_SUCCESS = 'Blog updated successfully',
    DELETE_SUCCESS = 'Blog deleted successfully',
    COMMENT_ADD_SUCCESS = 'Comment add successfully',
    COMMENT_UPDATE_SUCCESS = 'Comment update successfully',
    LIKE_ADDED = 'Like added successfully.',
    LIKE_REMOVED = 'Like removed successfully.',
    BLOG_SHARE_SUCCESS = 'Blog share successfully',
}
export enum DRIVER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Driver created successfully',
    GET_SUCCESS = 'Driver retrieved successfully',
    UPDATE_SUCCESS = 'Driver updated successfully',
    DELETE_SUCCESS = 'Driver deleted successfully',
}

export enum SUBJECT_INDEX_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Subject index created successfully',
    GET_SUCCESS = 'Subject index retrieved successfully',
    UPDATE_SUCCESS = 'Subject index updated successfully',
    DELETE_SUCCESS = 'Subject index deleted successfully',
}

export enum USER_PAYOUT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User payout created successfully',
    GET_SUCCESS = 'User payout retrieved successfully',
    UPDATE_SUCCESS = 'User payout updated successfully',
    DELETE_SUCCESS = 'User payout deleted successfully',
}

export enum USER_PAYOUT_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User payout history created successfully',
    GET_SUCCESS = 'User payout history retrieved successfully',
    UPDATE_SUCCESS = 'User payout history updated successfully',
    DELETE_SUCCESS = 'User payout history deleted successfully',
}

export enum PLANNER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'planer data updated successfully',
    GET_SUCCESS = 'planer data  retrieved successfully',
}

export enum EXAM_GROUP_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Exams created successfully',
    GET_SUCCESS = 'Exams retrieved successfully',
    UPDATE_SUCCESS = 'Exams updated successfully',
    DELETE_SUCCESS = 'Exams deleted successfully',
}

export enum TASK_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Task created successfully',
    GET_SUCCESS = 'Task retrieved successfully',
    UPDATE_SUCCESS = 'Task updated successfully',
    DELETE_SUCCESS = 'Task deleted successfully',
    MESSAGE_DELETE_SUCCESS = 'Message deleted successfully',
}

export enum BATCH_SUBJECT_BOOK_ASSESSMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Assessment book created successfully',
    GET_SUCCESS = 'Assessment book retrieved successfully',
    UPDATE_SUCCESS = 'Assessment book updated successfully',
    DELETE_SUCCESS = 'Assessment book deleted successfully',
}

export enum USER_BOOK_ASSESSMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User book assessment created successfully',
    GET_SUCCESS = 'User book assessment  retrieved successfully',
    UPDATE_SUCCESS = 'User book assessment updated successfully',
    DELETE_SUCCESS = 'User book assessment deleted successfully',
}
export enum BATCH_SUBJECT_PROJECT_ASSESSMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Project assessment created successfully',
    GET_SUCCESS = 'Project assessment retrieved successfully',
    UPDATE_SUCCESS = 'Project assessment updated successfully',
    DELETE_SUCCESS = 'Project assessment deleted successfully',
}

export enum VEHICLE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Vehicle created successfully',
    GET_SUCCESS = 'Vehicle retrieved successfully',
    UPDATE_SUCCESS = 'Vehicle updated successfully',
    DELETE_SUCCESS = 'Vehicle deleted successfully',
}

export enum GENERATE_ID_CARD_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Id Card created successfully',
    GET_SUCCESS = 'Id Card retrieved successfully',
    UPDATE_SUCCESS = 'Id Card updated successfully',
    DELETE_SUCCESS = 'Id Card deleted successfully',
    DUPLICATE = 'Id Card template already exists with this name',
    GENERATE_PDF = 'Id Card PDF generated successfully',
}
export enum CONTACT_FEED_BACK_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Contact feedback created successfully',
    GET_SUCCESS = 'Contact feedback retrieved successfully',
    DELETE_SUCCESS = 'Contact feedback deleted successfully',
    UPDATE_SUCCESS = 'Contact feedback updated successfully',
}
export enum PHOTO_GALLERY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Photo Gallery created successfully',
    GET_SUCCESS = 'Photo Gallery retrieved successfully',
    UPDATE_SUCCESS = 'Photo Gallery updated successfully',
    DELETE_SUCCESS = 'Photo Gallery deleted successfully',
}
export enum NOTIFICATION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Notification created successfully',
    GET_SUCCESS = 'Notification retrieved successfully',
    UPDATE_SUCCESS = 'Notification updated successfully',
    DELETE_SUCCESS = 'Notification deleted successfully',
}

export const CUSTOME_NOTIFICATION_SUCCESS_MESSAGES = (user: IUserAttributes) => {
    return `${user?.firstName || ''} ${user?.lastName || ''} has sent joining request for ${(user?.type || '').toLowerCase()}`;
};
export enum RULE_REGULATION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Rules and Regulation created successfully',
    GET_SUCCESS = 'Rules and Regulation retrieved successfully',
    UPDATE_SUCCESS = 'Rules and Regulation updated successfully',
    DELETE_SUCCESS = 'Rules and Regulation deleted successfully',
    GENERATE_PDF_SUCCESS = 'Rules and Regulation PDF Generated successfully',
}

export enum CAREER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Career created successfully',
    GET_SUCCESS = 'Career retrieved successfully',
    UPDATE_SUCCESS = 'Career updated successfully',
    DELETE_SUCCESS = 'Career deleted successfully',
}
export enum FLOOR_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'floor created successfully',
    UPSERT_SUCCESS = 'floor Data upsert successfully',
    GET_SUCCESS = 'floor retrieved successfully',
    UPDATE_SUCCESS = 'floor updated successfully',
    DELETE_SUCCESS = 'floor deleted successfully',
    CLASSROOM_FLOOR = 'floor and class update successfully',
}
export enum SUBSCRIPTION_PLAN_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Subscription plan created successfully',
    GET_SUCCESS = 'Subscription plan retrieved successfully',
    UPDATE_SUCCESS = 'Subscription plan updated successfully',
    DELETE_SUCCESS = 'Subscription plan deleted successfully',
}

export enum CLOUD_STORAGE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Cloud storage created successfully',
    GET_SUCCESS = 'Cloud storage retrieved successfully',
    UPDATE_SUCCESS = 'Cloud storage updated successfully',
    DELETE_SUCCESS = 'Cloud storage deleted successfully',
}

export enum HOME_WORK_SUCCESS_MESSAGES {
    ALREADY_EXISTS = 'Home work already exists',
    CREATE_SUCCESS = 'Home work created successfully',
    GET_SUCCESS = 'Home work retrieved successfully',
    UPDATE_SUCCESS = 'Home work updated successfully',
    DELETE_SUCCESS = 'Home work deleted successfully',
}

export enum USER_HAS_HOME_WORK_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User home work created successfully.',
    GET_SUCCESS = 'User home work retrieved successfully.',
    UPDATE_SUCCESS = 'User home work updated successfully.',
    DELETE_SUCCESS = 'User home work deleted successfully.',
}

export enum DAILY_BOOK_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Daily book created successfully',
    GET_SUCCESS = 'Daily book retrieved successfully',
    UPDATE_SUCCESS = 'Daily book updated successfully',
    DELETE_SUCCESS = 'Daily book deleted successfully',
}
export enum SYLLABUS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Syllabus created successfully',
    GET_SUCCESS = 'Syllabus retrieved successfully',
    UPDATE_SUCCESS = 'Syllabus updated successfully',
    DELETE_SUCCESS = 'Syllabus deleted successfully',
}

export enum COIN_PURCHASE_OFFER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Coin purchase offer created successfully',
    GET_SUCCESS = 'Coin purchase offer retrieved successfully',
    UPDATE_SUCCESS = 'Coin purchase offer updated successfully',
    DELETE_SUCCESS = 'Coin purchase offer deleted successfully',
}

export enum VENDOR_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Vendor Management created successfully',
    GET_SUCCESS = 'Vendor Management retrieved successfully',
    UPDATE_SUCCESS = 'Vendor Management updated successfully',
    DELETE_SUCCESS = 'Vendor Management deleted successfully',
}

export enum SUB_CATEGORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Sub category created successfully',
    GET_SUCCESS = 'Sub category retrieved successfully',
    UPDATE_SUCCESS = 'Sub category updated successfully',
    DELETE_SUCCESS = 'Sub category deleted successfully',
}

export enum PRODUCT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Product created successfully',
    GET_SUCCESS = 'Product retrieved successfully',
    UPDATE_SUCCESS = 'Product updated successfully',
    DELETE_SUCCESS = 'Product deleted successfully',
}

export enum INVOICE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Invoice created successfully',
    GET_SUCCESS = 'Invoice retrieved successfully',
    UPDATE_SUCCESS = 'Invoice updated successfully',
    DELETE_SUCCESS = 'Invoice deleted successfully',
}

export enum COLUMN_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Column created successfully',
    GET_SUCCESS = 'Column retrieved successfully',
    UPDATE_SUCCESS = 'Column updated successfully',
    DELETE_SUCCESS = 'Column deleted successfully',
}

export enum PDC_HISTORY_SUCCESS_MESSAGES {
    GET_SUCCESS = 'Pdc history retrieved successfully',
}

export enum DASHBOARD_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Dashboard Management created successfully',
    GET_SUCCESS = 'Dashboard Management retrieved successfully',
    UPDATE_SUCCESS = 'Dashboard Management updated successfully',
    DELETE_SUCCESS = 'Dashboard Management deleted successfully',
}
export enum CERTIFICATES_MANAGEMENT_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Certificates Management created successfully',
    GET_SUCCESS = 'Certificates Management retrieved successfully',
    UPDATE_SUCCESS = 'Certificates Management updated successfully',
    DELETE_SUCCESS = 'Certificates Management deleted successfully',
}
export enum CERTIFICATES_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Certificates History created successfully',
    GET_SUCCESS = 'Certificates History retrieved successfully',
}
export enum REPLACE_TEACHER_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Replace Teacher created successfully',
    GET_SUCCESS = 'Replace Teacher retrieved successfully',
    UPDATE_SUCCESS = 'Replace Teacher updated successfully',
    DELETE_SUCCESS = 'Replace Teacher deleted successfully',
}
export enum WALLET_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Wallet created successfully',
    GET_SUCCESS = 'Wallet retrieved successfully',
    UPDATE_SUCCESS = 'Wallet updated successfully',
    DELETE_SUCCESS = 'Wallet deleted successfully',
}

export enum WALLET_HISTORY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Wallet history created successfully',
    GET_SUCCESS = 'Wallet history retrieved successfully',
    UPDATE_SUCCESS = 'Wallet history updated successfully',
    DELETE_SUCCESS = 'Wallet history deleted successfully',
}

export enum WALLET_TRANSACTION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Wallet transaction created successfully',
    GET_SUCCESS = 'Wallet transaction retrieved successfully',
    UPDATE_SUCCESS = 'Wallet transaction updated successfully',
    DELETE_SUCCESS = 'Wallet transaction deleted successfully',
    OTP_VERIFIED = 'Otp verified',
    OTP_SENT = 'Otp sent',
    VOUCHER_VERIFIED = 'Voucher redeemed successfully ',
}

export enum INSTITUTE_SUBSCRIPTION_PLAN_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Institute subscription plan created successfully',
    GET_SUCCESS = 'Institute subscription plan retrieved successfully',
    UPDATE_SUCCESS = 'Institute subscription plan updated successfully',
    DELETE_SUCCESS = 'Institute subscription plan deleted successfully',
}

export enum USER_HAS_STORAGE_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User storage created successfully',
    GET_SUCCESS = 'User storage retrieved successfully',
    UPDATE_SUCCESS = 'User storage updated successfully',
    DELETE_SUCCESS = 'User storage deleted successfully',
}

export enum ENTITY_GROUP_SUCCESS_MESSAGES {
    ALREADY_EXISTS = 'Entity Group already exists',
    CREATE_SUCCESS = 'Entity Group created successfully',
    GET_SUCCESS = 'Entity Group retrieved successfully',
    UPDATE_SUCCESS = 'Entity Group updated successfully',
    DELETE_SUCCESS = 'Entity Group deleted successfully',
}

export enum JOB_APPLY_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Job Apply created successfully',
    GET_SUCCESS = 'Job Apply retrieved successfully',
    UPDATE_SUCCESS = 'Job Apply updated successfully',
    DELETE_SUCCESS = 'Job Apply deleted successfully',
}

export enum USER_REQUIRED_STEPS_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'User Required Steps created successfully',
    GET_SUCCESS = 'User Required Steps retrieved successfully',
    UPDATE_SUCCESS = 'User Required Steps updated successfully',
    DELETE_SUCCESS = 'User Required Steps deleted successfully',
}
export enum PAYMENT_TRANSACTION_SUCCESS_MESSAGES {
    CREATE_SUCCESS = 'Payment Transaction created successfully',
    GET_SUCCESS = 'Payment Transaction retrieved successfully',
    UPDATE_SUCCESS = 'Payment Transaction updated successfully',
    DELETE_SUCCESS = 'Payment Transaction deleted successfully',
}
