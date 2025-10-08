export enum ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save data in DB!',
    GET_FAIL = 'Unable to retrieve data from DB!',
    UPDATE_FAIL = 'Unable to update data in DB!',
    DELETE_FAIL = 'Unable to delete data from DB!',
    RESOURCE_NOT_ALLOW = 'You do not have access permissions for requested resource!!',
    DUPLICATE_USER_EMAIL = 'User email already exists!',
    PASSWORD_MISMATCH_FAIL = 'Invalid credentials!',
    GENERIC = 'Something went wrong!',
    NOT_FOUND = 'Unable to find the requested resource!',
    UNCAUGHT_EXCEPTION = 'Uncaught Exception thrown!',
    UNHANDLED_REJECTION = 'Unhandled Exception thrown!',
    USER_NOT_FOUND = 'User not found!',
    GOOGLE_USER_NOT_FOUND = 'User not found. Please Sign Up Using Gmail First',
    META_USER_NOT_FOUND = 'User not found. Please Sign Up Using Meta First',
    APPLE_USER_NOT_FOUND = 'User not found. Please Sign Up Using Apple First',
    TOKEN_NOT_FOUND = 'Token not found!',
    USER_UPDATE_FAIL = 'Unable to update user data!',
    UNAUTHORIZED = 'UnAuthorized Person',
    DUPLICATE_HOLIDAY = 'Duplicate Holiday',
    DUPLICATE_EVENT = 'Duplicate Event',
    INVALID_FILE_FORMAT = 'Unsupported file format. Only Excel and CSV are supported!',
    APP_TYPE_NOT_FOUND = 'App type not found!',
    INVALID_DATA = 'Invalid data',
    NOT_VERIFIED = 'User not verified!',
    USER_EXIT_IN_OTHER_APP = 'User account already exist with another app',
    APPLE_USEREMAIL__NOT_FOUND = 'User email not found. Please add Email In your apple id',
}

export enum USER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user data!',
    USING_OWN_EMAIL = 'You are using your email!',
    GET_FAIL = 'Unable to retrieve user data!',
    UPDATE_FAIL = 'Unable to update user data!',
    DELETE_FAIL = 'Unable to delete user data!',
    NOT_FOUND = 'Unable to find user!',
    EMAIL_VERIFICATION_PENDING = 'Your email verification is pending!',
    EMAIL_VERIFICATION_PENDING_OR_USER_NOT_FOUND = 'User not found or email verification is pending!',
    INVALID_VERIFICATION_OTP = 'Otp is invalid or expired!',
    CHILDS_NOT_FOUND = 'Unable to find child users!',
    NOT_JOIN_INSTITUTE = 'User has not joined any institutes!',
    INSTITUTE_NOT_FOUND = 'Institute not found or institute ID is required.',
    OLD_PASSWORD_SAME = 'New password cannot be the same as old password.',
    INVALID_DATA = 'Invalid data provided for user operation.',
    DELETE_FAIL_HAS_INSTITUTE_JOINED = 'Unable to delete account: user data linked with existing institute.',
    UPDATE_YOUR_PROFILE = 'Invalid Request Please Update Your Profile , In Profile Have not Request Subject',
    UID_NO_EXITS = 'Given Uid No already exits',
}
export const USER_FEE_TYPE_ACCOUNT_ERROR_MESSAGES = {
    NOT_FOUND: 'User fee type account record not found.',
    CREATE_FAILED: 'Failed to create user fee type account.',
    UPDATE_FAILED: 'Failed to update user fee type account.',
    DELETE_FAILED: 'Failed to delete user fee type account.',
    INVALID_ID: 'Provided ID is invalid.',
    INVALID_USER: 'User not found or not authorized.',
    INVALID_ACCOUNT: 'Bank account information is invalid or missing.',
    INVALID_FEE_COLLECTION: 'Fee collection record is invalid or not found.',
    USER_NOT_ACCEPTED: 'User is not accepted into the institute.',
    DUPLICATE_ENTRY: 'User fee type account already exists for this configuration.',
};

export enum BANNER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save banner data!',
    GET_FAIL = 'Unable to retrieve banner data!',
    UPDATE_FAIL = 'Unable to update banner data!',
    DELETE_FAIL = 'Unable to delete banner data!',
    NOT_FOUND = 'Unable to find banner!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for banner data',
    ACTIVE_BANNER_LIMIT = 'Active banner limit reached!',
}
export enum APPROVE_REQUEST_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save request data!',
    GET_FAIL = 'Unable to retrieve request data!',
    UPDATE_FAIL = 'Unable to update request data!',
    DELETE_FAIL = 'Unable to delete request data!',
    NOT_FOUND = 'Unable to find request!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for request data',
}
export enum INQUIRY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to create inquiry!',
    GET_FAIL = 'Unable to retrieve inquiry data!',
    UPDATE_FAIL = 'Unable to update inquiry!',
    DELETE_FAIL = 'Unable to delete inquiry!',
    NOT_FOUND = 'Inquiry not found!',
    INSTITUTE_NOT_FOUND = 'Institute not found for inquiry data!',
    USER_ALREADY_EXIT = 'user already in requested instituted',
    USER_META_DATA_CREATE_FAIL = 'Failed to add user to the institute.',
    DATA_REQUIRED = 'user batch data is required',
    EMAIL_NOT_HAVE_SAME = 'user and parent email not have same',
}
export enum INFORMATION_SUPPORT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to create information support!',
    GET_FAIL = 'Unable to retrieve information support data!',
    UPDATE_FAIL = 'Unable to update information support!',
    DELETE_FAIL = 'Unable to delete information support!',
    NOT_FOUND = 'Information support not found!',
    NUMBER_EXITS = 'Information support number already exists!',
}
export enum BANK_ACCOUNT_DETAILS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save bank account details!',
    GET_FAIL = 'Unable to retrieve bank account details!',
    UPDATE_FAIL = 'Unable to update bank account details!',
    DELETE_FAIL = 'Unable to delete bank account details!',
    NOT_FOUND = 'Bank account details not found!',
    INSTITUTE_NOT_FOUND = 'Institute not found for bank account details!',
    ACCOUNT_NOT_SET_DEFAULT = 'you not set as default account only self account set as default',
    INVALID_ACCOUNT_NUMBER = 'Invalid account number format for bank',
    ACCOUNT_LINKED = 'Account is linked to other data and cannot be deleted!',
    INVALID_ISFC_CODE = 'Invalid IFSC code format for bank',
    CAN_NOT_CHANGE_DEFAULT_STATUS = 'At least one default account is required.',
}

export enum SCHOOL_SHIFT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save school shift data!',
    GET_FAIL = 'Unable to retrieve school shift data!',
    UPDATE_FAIL = 'Unable to update school shift data!',
    NOT_FOUND = 'Unable to find school shift!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for school shift data',
    ALREADY_EXISTS = 'School shift already exists!',
}
export enum ACCOUNT_RECEIPT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save account receipt data!',
    GET_FAIL = 'Unable to retrieve account receipt data!',
    UPDATE_FAIL = 'Unable to update account receipt data!',
    NOT_FOUND = 'Account receipt not found!',
    INSTITUTE_NOT_FOUND = 'Institute not found for account receipt data!',
    ALREADY_EXISTS = 'Account receipt data already exists!',
}
export const SCHOOL_FEES_COLLECTION_ERROR_MESSAGES = {
    NOT_FOUND: 'School fee collection record not found.',
    YOUR_FEE_AMOUNT_WRONG: 'Your fee is already paid and cannot be updated.',
};
export enum FEEDBACK_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save feedback data!',
    GET_FAIL = 'Unable to retrieve feedback data!',
    UPDATE_FAIL = 'Unable to update feedback data!',
    NOT_FOUND = 'Feedback not found!',
    INSTITUTE_NOT_FOUND = 'Institute not found for feedback data!',
    ALREADY_EXISTS = 'Feedback data already exists!',
}

export enum SUBSCRIPTION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to create subscription!',
    GET_FAIL = 'Unable to retrieve subscription data!',
    UPDATE_FAIL = 'Unable to update subscription!',
    NOT_FOUND = 'Subscription not found!',
    INSTITUTE_NOT_FOUND = 'Institute not found for subscription data!',
    ALREADY_EXISTS = 'Subscription already exists!',
}

export enum LEAVE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save leave data!',
    GET_FAIL = 'Unable to retrieve leave data!',
    UPDATE_FAIL = 'Unable to update leave data!',
    DELETE_FAIL = 'Unable to delete leave data!',
    NOT_FOUND = 'Unable to find leave!',
    INSTITUTE_NOT_FOUND = 'Institue Not Found for leave data',
    LIMIT_OVER = 'leave limit over',
    TAKE_LEAVE_ALREADY = 'You have already applied for or taken leave during the selected date and time.',
}
export enum MASTER_LEAVE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save master leave data!',
    GET_FAIL = 'Unable to retrieve master leave data!',
    UPDATE_FAIL = 'Unable to update master leave data!',
    DELETE_FAIL = 'Unable to delete master leave data!',
    NOT_FOUND = 'Unable to find master leave data !',
    INSTITUTE_NOT_FOUND = 'Institue Not Found for master leave data',
    INVALID_TYPE_MANAGEMENT_ID = 'Invalid typeManagementId: The type must be LEAVE.',
    INVALID_TERM_DURATION = 'Invalid termDuration value.',
    INVALID_DATA = 'required data not given',
    ALREADY_EXIST = 'already Leave Data Exits',
}
export enum FEE_HISTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save fee history data!',
    GET_FAIL = 'Unable to retrieve fee history data!',
    UPDATE_FAIL = 'Unable to update fee history data!',
    DELETE_FAIL = 'Unable to delete fee history data!',
    NOT_FOUND = 'Unable to find fee history!',
    NOT_UPDATE = 'you can not update data this was not updatable data ',
    SUBJECT_FEE_NOT_FOUND = 'Unable to find subject fee history!',
    INSTITUTE_NOT_FOUND = 'Institue Not Found for fee history data',
    NO_FEE_DETAILS = 'No fee details found for this history ID',
}
export enum SUBJECT_HAS_FEE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save subject fee data!',
    GET_FAIL = 'Unable to retrieve subject fee data!',
    UPDATE_FAIL = 'Unable to update subject fee data!',
    DELETE_FAIL = 'Unable to delete subject fee data!',
    NOT_FOUND = 'Unable to find subject fee!',
    INSTITUTE_NOT_FOUND = 'Institue Not Found for subject fee data',
    FEE_ADDED = 'The fee for the subject has already been added.',
}
export enum USER_HAS_INVENTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save User has inventory data!',
    GET_FAIL = 'Unable to retrieve User has inventory data!',
    UPDATE_FAIL = 'Unable to update User has inventory data!',
    DELETE_FAIL = 'Unable to delete User has inventory data!',
    NOT_FOUND = 'Unable to find User has inventory!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for User has inventory data',
    INVENTORY_NOT_FOUND = 'Inventory not found in institute',
    QUANTITY_REQUIRED = 'Return Data not given',
    QUANTITY_NOT_AVAILABLE = 'The requested quantity is not available.',
    INVALID_INPUT = 'Please check the provided data.',
}
export enum CATEGORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Category data!',
    GET_FAIL = 'Unable to retrieve Category data!',
    UPDATE_FAIL = 'Unable to update Category data!',
    DELETE_FAIL = 'Unable to delete Category data!',
    NOT_FOUND = 'Unable to find Category!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for Category data',
    CATEGORY_IN_USE = 'Category is in use by inventory, cannot be deleted!',
    CATEGORY_IN_USE_IN_SUB_CATEGORY = 'Category is in use by sub category, cannot be deleted!',
}
export enum INVENTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Inventory data!',
    GET_FAIL = 'Unable to retrieve Inventory data!',
    UPDATE_FAIL = 'Unable to update Inventory data!',
    DELETE_FAIL = 'Unable to delete Inventory data!',
    NOT_FOUND = 'Unable to find Inventory!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for Inventory data',
    ALREADY_EXISTS = 'Inventory already exists! change the name',
    WRONG_DATA = 'wrong data enter',
}
export enum PAYMENT_TERMS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save payment terms data!',
    GET_FAIL = 'Unable to retrieve payment terms data!',
    UPDATE_FAIL = 'Unable to update payment terms data!',
    DELETE_FAIL = 'Unable to delete payment terms data!',
    NOT_FOUND = 'Payment terms not found!',
    DUE_DATE = 'Due date is required for installment calculation.',
    INVALID_TERM = 'Invalid payment term type',
    INSTITUTE_NOT_FOUND = 'Institute not found for payment terms data!',
    ALREADY_EXISTS = 'Payment terms already exist! Please change the name.',
    WRONG_DATA = 'Invalid data entered!',
    DUPLICATE = 'Duplicate installment detected for this user.',
}

export enum INVENTORY_HISTORY_ERROR_MESSAGES {
    GET_FAIL = 'Unable to retrieve Inventory history data!',
    NOT_FOUND = 'Unable to find Inventory history!',
}
export enum OFFER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save offer data!',
    GET_FAIL = 'Unable to retrieve offer data!',
    UPDATE_FAIL = 'Unable to update offer data!',
    DELETE_FAIL = 'Unable to delete offer data!',
    NOT_FOUND = 'Unable to find offer!',
    OFFER_EXPIRED = 'Offer has expired!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for offer data',
    ACTIVE_OFFER_LIMIT = 'Active offer limit reached!',
    FEE_AMOUNT_REQUIRED = 'Fee amount is required for the offer!',
    APPLICABLE_ON_NOT_FOUND = 'Applicable on not found!',
    SELECTED_BANK_OFFER_WRONG = 'offer not found or offer have not same account for offer',
}
export enum FACILITY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save facility data!',
    GET_FAIL = 'Unable to retrieve facility data!',
    UPDATE_FAIL = 'Unable to update facility data!',
    DELETE_FAIL = 'Unable to delete facility data!',
    NOT_FOUND = 'Facility not found!',
    DUPLICATE = 'Duplicate Facility ',
    ALL_DUPLICATE = 'All facilities already exist. No new records created.',
}
export enum FEE_TYPE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save fee type!',
    GET_FAIL = 'Unable to retrieve fee type!',
    UPDATE_FAIL = 'Unable to update fee type!',
    DELETE_FAIL = 'Unable to delete fee type!',
    NOT_FOUND = 'Fee type not found!',
    DUPLICATE = 'Duplicate fee type!',
    ALL_DUPLICATE = 'All fee types already exist. No new records created.',
    DEFAULT_DATA = 'Default data can not be modified! or deleted!',
    CAN_NOT_DELETE = 'can not delete feeType because of data have link with this type',
}

export enum SCHOOL_FEE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save school fee!',
    GET_FAIL = 'Unable to retrieve school fee!',
    UPDATE_FAIL = 'Unable to update school fee!',
    DELETE_FAIL = 'Unable to delete school fee!',
    NOT_FOUND = 'School fee not found!',
    DUPLICATE = 'Duplicate school fee!',
    STD_HAVE_FEE = 'In given Standard in some Standard  has already fee added',
    ALL_DUPLICATE = 'All school fees already exist. No new records created.',
}
export enum USER_FEE_TYPE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user fee type!',
    GET_FAIL = 'Unable to retrieve user fee type!',
    UPDATE_FAIL = 'Unable to update user fee type!',
    DELETE_FAIL = 'Unable to delete user fee type!',
    NOT_FOUND = 'user fee type not found!',
    DUPLICATE = 'Duplicate user fee type!',
    STD_HAVE_FEE = 'In given Standard  in some Standard  has already fee added',
    ALL_DUPLICATE = 'All school fees already exist. No new records created.',
    STD_ID_IS_REQUIRED = 'Standard  id is required',
    USER_NOT_ACCEPTED = 'Given Was nor accepted for given data',
    USER_HAS_NOT_SERVICE_ACTIVE = 'User Has Not Active service',
}

export enum FEESCOLLECTION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save feesCollection data!',
    GET_FAIL = 'Unable to retrieve feesCollection data!',
    UPDATE_FAIL = 'Unable to update feesCollection data!',
    DELETE_FAIL = 'Unable to delete feesCollection data!',
    NOT_FOUND = 'Unable to find feesCollection!',
    FEESCOLLECTION_EXITS = 'The institute has already created a fee or sent a request to the user.',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for feesCollection data',
    PAID_AMOUNT_IS_MORE = 'The amount you paid is more than required.',
    FEE_PAID = 'Your fee is already paid and cannot be updated.',
    FEE_PAID_BY_CHQUE = 'When paymentType is cheque, both chequeNo and bankName are required.',
    FEE_PAID_BY_UPI = 'When paymentType is upi, upiId is required.',
    DUPLICATE = 'fee collection exits',
    PAYMENT_TYPE_REQUIRED = 'Payment type is required.',
    SUBJECT_IS_WRONG = 'Subject is not valid',
}
export enum FEEREMINDER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save feeReminder data!',
    GET_FAIL = 'Unable to retrieve feeReminder data!',
    UPDATE_FAIL = 'Unable to update feeReminder data!',
    DELETE_FAIL = 'Unable to delete feeReminder data!',
    NOT_FOUND = 'Unable to find feeReminder!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for feeReminder data',
    SUBJECT_INVALID = 'Subject not found in the batch, or the user is not enrolled in the subject.',
    FEE_COLLECTION_NOT_FOUND = 'FeeCollection not found for user',
    USER_NOT_IN_BATCH = 'user not in given batch',
    INVALID_INPUT = 'Input is invalid',
}
export enum FEE_REMINDER_SETTING_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save feeReminder setting data!',
    GET_FAIL = 'Unable to retrieve feeReminder setting data!',
    UPDATE_FAIL = 'Unable to update feeReminder setting data!',
    DELETE_FAIL = 'Unable to delete feeReminder setting data!',
    NOT_FOUND = 'Unable to find feeReminder setting!',
    NOT_FOUND_TYPE = 'Unable to find feeReminder setting type!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for feeReminder setting data',
    ACTIVE_REMINDER_LIMIT = 'already one template is Active ',
    DEFAULT_REMINDER_LIMIT = 'already one template is Default ',
    DEFAULT_NOT_CHANGE = 'Default template can not be changed',
    DEFAULT_NOT_DELETE = 'Default template can not be deleted',
}
export enum FEE_REMINDER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save feeReminder type data!',
    GET_FAIL = 'Unable to retrieve feeReminder type data!',
    UPDATE_FAIL = 'Unable to update feeReminder type data!',
    DELETE_FAIL = 'Unable to delete feeReminder type data!',
    NOT_FOUND = 'Unable to find feeReminder type!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for feeReminder data',
    ALREADY_EXISTS = 'Fee reminder type already exists! Please change the data.',
}
export enum USER_HAS_OFFER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user offer data!',
    GET_FAIL = 'Unable to retrieve user offer data!',
    UPDATE_FAIL = 'Unable to update user offer data!',
    DELETE_FAIL = 'Unable to delete user offer data!',
    NOT_FOUND = 'Unable to find user offer!',
    OFFER_EXISTS = 'The offer has already been used by the user.',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for user offer data',
    FEE_COLLECTION_NOT_FOUND = 'Fee collection not found for the user, or the user has already paid the fee.',
    OFFER_NOT_FOUND = 'Offer Not Found for user offer data',
    USER_LIMIT_REACHED = 'The user cannot apply, offer limit has already reached!',
    NOT_USE_OFFER = 'User cannot use this offer as the minimum amount is not met.',
}
export enum USER_HAS_ROLL_NUMBER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user offer data!',
    GET_FAIL = 'Unable to retrieve user offer data!',
    UPDATE_FAIL = 'Unable to update user offer data!',
    DELETE_FAIL = 'Unable to delete user offer data!',
    NOT_FOUND = 'Unable to find user offer!',
    BATCH_NOT_FOUND = 'batch not found',
    BATCH_IS_EMPTY = 'batch was empty',
    ROLL_NUMBER_ALREADY_EXISTS = 'rollNumber Exits Plz verify you Data',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for user offer data',
    USER_NOT_IN_BATCH = 'user not in batch',
}
export enum HOLIDAY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save holiday data!',
    GET_FAIL = 'Unable to retrieve holiday data!',
    UPDATE_FAIL = 'Unable to update holiday data!',
    DELETE_FAIL = 'Unable to delete holiday data!',
    NOT_FOUND = 'Unable to find holiday!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for holiday data',
    TYPE_MANAGEMENT_NOT_FOUND = 'Type management not found for holiday data',
    INSTITUTE_ID_BATCH_REQUIRED = 'Institute ID and batch are required ',
}
export enum EVENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save event data!',
    GET_FAIL = 'Unable to retrieve event data!',
    UPDATE_FAIL = 'Unable to update event data!',
    DELETE_FAIL = 'Unable to delete event data!',
    NOT_FOUND = 'Unable to find event!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for event data',
    INSTITUTE_ID_SUBJECT_BATCH_REQUIRED = 'Institute ID, subject, and batch are required for non-INSTITUTE or non-GLOBAL types.',
}
export enum ACADEMIC_CALENDAR_ERROR_MESSAGES {
    CREATE_FAIL = 'Failed to create academic calendar data!',
    GET_FAIL = 'Failed to retrieve academic calendar data!',
    UPDATE_FAIL = 'Failed to update academic calendar data!',
    DELETE_FAIL = 'Failed to delete academic calendar data!',
    NOT_FOUND = 'Academic calendar data not found!',
    CALENDAR_NOT_END_FOR_INSTITUTE_AND_BATCH = 'The current calendar for institute and batch has not ended yet.',
    CALENDAR_EXISTS_FOR_INSTITUTE_AND_BATCH = 'The current calendar for the institute and batch has not ended yet.',
    CALENDAR_NOT_END_FOR_INSTITUTE = 'The current calendar for institute has not ended yet.',
    CALENDAR_EXISTS_FOR_INSTITUTE = 'A calendar already exists for the institute with overlapping dates.',
    CALENDAR_NO_EXISTS_FOR_INSTITUTE = 'No calendar exists for the institute.',
}

export enum BATCH_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save batch data!',
    GET_FAIL = 'Unable to retrieve batch data!',
    INVALID_SELECTED = 'Invalid selected batches!',
    UPDATE_FAIL = 'Unable to update batch data!',
    DELETE_FAIL = 'Unable to delete batch data!',
    NOT_FOUND = 'Unable to find batch!',
    CAPACITY_REACHED_MAXIMUM = 'batch already reached maximum capacity!',
    NAME_IS_ALREADY_NAME = 'Name already exists. Try a different one.',
    ALREADY_ASSIGN = 'batch already assigned to',
    CAN_NOT_UN_ASSIGN = 'batch can not unassign because of still its lecture pending',
    SUBJET_NOT_EXIST_IN_BATCH = 'Subjects that you try to assign are not exist in batch',
    SUBJECT_NOT_EXIST_IN_USER_PROFILE = 'Subjects that you try to assign are not exist in user profile',
    NOT_SUBJECTS_UPADTED_DUE_TO_BATCH_ALREADY_ASSIGN = 'Batch subjects Cant not updated because batch already assign',
    BATCH_HAS_NO_STUDENT = 'Batch has no students',
    INSTITUTED_BATCHES_REQUIRED = 'instituted id and batches in batchId required',
    BATCH_UNASSIGN_FAIL = 'batch unassigned failed!',
    SHIFT_SLOT_DATA_NOT_LINK = 'Given shift and slot data not link each other',
    BATCH_DATE_NOT_BEETWEEN_ACADEMIC_CALENDER = 'Batch date range should be between academic calendar date!',
}

export enum CLASSROOM_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save classRoom data!',
    GET_FAIL = 'Unable to retrieve classRoom data!',
    INVALID_SELECTED = 'Invalid selected classrooms!',
    UPDATE_FAIL = 'Unable to update classRoom data!',
    DELETE_FAIL = 'Unable to delete classRoom data!',
    NOT_FOUND = 'Unable to find classRoom!',
    ALREADY_EXISTS = 'classRoom already exists on this floor',
}
export enum TYPE_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save type data!',
    GET_FAIL = 'Unable to retrieve type data!',
    UPDATE_FAIL = 'Unable to update type data!',
    DELETE_FAIL = 'Unable to delete type data!',
    NOT_FOUND = 'Unable to find type!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for type data',
    TYPE_ALREADY_EXISTS = 'The type already exists.',
}
export enum ROLE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save role data!',
    DUPLICATE_ROLE_NAME = 'Role already exist!',
    GET_FAIL = 'Unable to retrieve role data!',
    UPDATE_FAIL = 'Unable to update role data!',
    DELETE_FAIL = 'Unable to delete role data!',
    NOT_FOUND = 'Unable to find role data!',
    ROLE_ALREADY_GIVEN = 'role hve user already',
}

export enum MODULE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save module data!',
    DUPLICATE_MODULE_NAME = 'Module name already exist!',
    GET_FAIL = 'Unable to retrieve module data!',
    UPDATE_FAIL = 'Unable to update module data!',
    DELETE_FAIL = 'Unable to delete module data!',
    NOT_FOUND = 'Unable to find module data!',
}

export enum INSTITUTE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save institute data!',
    DUPLICATE_INSTITUTE_NAME_OR_EMAIL = 'Institute name or email already exist!',
    GET_FAIL = 'Unable to retrieve institute data!',
    UPDATE_FAIL = 'Unable to update institute data!',
    DELETE_FAIL = 'Unable to delete institute data!',
    NOT_FOUND = 'Unable to find institute data!',
    INSTITUTE_ID = 'institute id required',
}
export enum INSTITUTE_ENTITY_TYPE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save institute entity type data!',
    DUPLICATE_NAME = 'Institute entity type title already exist!',
    GET_FAIL = 'Unable to retrieve institute entity type data!',
    UPDATE_FAIL = 'Unable to update institute entity type data!',
    DELETE_FAIL = 'Unable to delete institute  entity type data!',
    NOT_FOUND = 'Unable to find institute entity type!',
    FILE_MISISIN_VALIDATION = 'File missing in svgUrl field',
    CAN_NOT_DELETE = 'Given data for Institute entity already exist can not delete!',
}

export enum INSTITUTE_ENTITY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save institute entity data!',
    DUPLICATE_NAME = 'Institute entity title already exist!',
    INVALID_TYPE = 'Invalid institute entity!',
    INVALID_ENTITY_TYPE_STEP = 'Invalid institute entity type steps!',
    GET_FAIL = 'Unable to retrieve institute entity data!',
    UPDATE_FAIL = 'Unable to update institute entity data!',
    DELETE_FAIL = 'Unable to delete institute entity data!',
    NOT_FOUND = 'Unable to find institute entity!',
    FILE_MISISIN_VALIDATION = 'File missing in svgUrl field',
    NOT_FOUND_JOINING_DATE = 'Joining data is required',
    DELETE_FAIL_META_EXIST = 'Unable to delete institute entity data due to linked with user or institute!',
    INVALID_SEQUENCE_NUMBER = 'Invalid sequence number provided for institute entity.',
    UPDATE_SEQUENCE_NUMBER = 'Unable to update Sequence number for institute entity data.',
    DUPLICATE_SEQUENCE_NUMBER = 'Duplicate sequence number found for institute entity.',
    PAYLOAD_LENGTH_SEQUENCE_NUMBER = 'Payload length must equal max sequenceNumber!',
}

export enum USER_INSTITUTE_META_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user institute meta data!',
    GET_FAIL = 'Unable to retrieve user institute meta  data!',
    UPDATE_FAIL = 'Unable to update user institute meta  data!',
    DELETE_FAIL = 'Unable to delete user institute meta data!',
    NOT_FOUND = 'Unable to find user institute meta data!',
    PRIMARY_SLOT_FOND = 'Only one slot can be primary.',
    DUPLICATE_RECORD = 'The user request has already been accepted or is currently pending.',
    WRONG_STATUS = 'The provided status is invalid or not allowed',
    USER_NOT_SEND_REQUEST = 'user can not send request its limit reached',
    IS_PRINCIPAL_EXITS = 'for this instituted principal already exits ',
    STD_NOT_FOUND = 'Standard not found for instituted',
    GR_NUMBER_EXITS = 'Cannot update Gr Number: Gr Number already exits that you want given',
    CAN_NOT_UPDATE_USER_FOUND = 'Institute update failed: removed data is linked to an existing user',
    CAN_NOT_UPDATE_BATCH_FOUND = 'Cannot update institute data: dependency found between removed data and assigned batch',
    CAN_NOT_UPDATE_LECTURE_FOUND = 'Institute update failed: removed data is linked to an existing lectures',
    USER_ALREADY_FIL_FROM = 'User already filUp form',
    CAN_NOT_UPDATE_ENTITY_FOUND = 'Institute update failed: removed data is linked to an existing group',
}

export enum PARENTS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save  parents data!',
    GET_FAIL = 'Unable to retrieve  parents  data!',
    UPDATE_FAIL = 'Unable to update  parents data!',
    DELETE_FAIL = 'Unable to delete  parents data!',
    NOT_FOUND = 'Unable to find parents data!',
    NOT_ALLOWED_TRANSFER_PARENT = 'Unable to transfer primary parent!',
    INVALID_SECURITY_CODE = 'Invalid security code!',
    STUDENT_CANNOT_BE_PARENT = 'Student cannot be a parent!',
}

export enum ANNOUCEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save  announcement data!',
    GET_FAIL = 'Unable to retrieve  announcement  data!',
    UPDATE_FAIL = 'Unable to update  announcement data!',
    DELETE_FAIL = 'Unable to delete  announcement data!',
    NOT_FOUND = 'Unable to find announcement data!',
    INVALID_SUBJECTS = 'Invalid subjects!',
    INVALID_BATCHES = 'Invalid batches!',
    INVALID_USERS = 'Invalid users!',
}

export enum EXAM_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save exam data!',
    GET_FAIL = 'Unable to retrieve exam data!',
    UPDATE_FAIL = 'Unable to update exam data!',
    DELETE_FAIL = 'Unable to delete exam data!',
    NOT_FOUND = 'Unable to find exam data!',
    DUPLICATE = 'Exam already exist!',
    INVALID_STANDARD = 'Exam has invalid standard!',
    INVALID_BATCHES = 'Exam has invalid batches!',
    INVALID_EXAM_DATE = 'Exam has invalid date!',
}

export enum EXAM_HAS_ANSWER_SHEET_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save exam answer sheet data!',
    GET_FAIL = 'Unable to retrieve exam answer sheet data!',
    UPDATE_FAIL = 'Unable to update exam answer sheet data!',
    DELETE_FAIL = 'Unable to delete exam answer sheet data!',
    NOT_FOUND = 'Unable to find exam answer sheet data!',
    EXAM_ALREADY_HAS_ANSWER_SHEET = 'Exam already created answerSheet!',
    NOT_FOUND_MASTER_ANSWER_SHEET = 'Master answer sheet not found for exam!',
    EXAM_STARTED_ON_OTHER_DEVICE = 'Exam already started on other device!',
}

export enum FILE_STORAGE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save file data!',
    GET_FAIL = 'Unable to retrieve file data!',
    UPDATE_FAIL = 'Unable to update file data!',
    DELETE_FAIL = 'Unable to delete file  data!',
    NOT_FOUND = 'Unable to find file data!',
}

export enum ATTENDANCE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save attendance data!',
    DUPLICATE = 'attendance already exist for given date!',
    UPDATE_FAIL = 'Unable to update attendance data!',
    DELETE_FAIL = 'Unable to delete attendance data!',
    NOT_FOUND = 'Unable to find attendance data!',
    USER_BATCH_NOT_FOUND = 'Unable to find batch data!',
    USER_HAS_BATCH_NOT_FOUND = 'Unable to find user has batch data!',
    FULL_DAY_TIME_NOT_MATCH = 'Attendance full day time not matched',
    BATCH_TIME_NOT_MATCH = 'Attendance batch time not matched',
    LECTURE_DAY_TIME_NOT_MATCH = 'Attendance lecture time not matched',
    BATCH_HAS_NO_LECTURE = 'Batch has no lecture for attendance date',
}
export enum USER_SCHOOL_METADATA_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user school metadata!',
    DUPLICATE = 'User school metadata already exists for the given data!',
    UPDATE_FAIL = 'Unable to update user school metadata!',
    DELETE_FAIL = 'Unable to delete user school metadata!',
    NOT_FOUND = 'Unable to find user school metadata!',
    INVALID_DATA = 'Invalid data provided for user school metadata!',
}

export enum WORKING_DAYS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save working day data!',
    DUPLICATE = 'Working day name already exist!',
    GET_FAIL = 'Unable to retrieve working day data!',
    UPDATE_FAIL = 'Unable to update working day data!',
    DELETE_FAIL = 'Unable to delete working day data!',
    NOT_FOUND = 'Unable to find working day data!',
}

export enum LECTURE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save lecture data!',
    DUPLICATE = 'Lecture already exist!',
    GET_FAIL = 'Unable to retrieve lecture data!',
    UPDATE_FAIL = 'Unable to update lecture data!',
    DELETE_FAIL = 'Unable to delete lecture data!',
    NOT_FOUND = 'Unable to find lecture data!',
    INVALID_LECTURE_TIME = 'Invalid lecture time!',
    BATCH_OCCUPIED = 'Batch is already occupied at this time slot!',
    CLASSROOM_OCCUPIED = 'Classroom is already occupied at this time slot!',
    TEACHER_OCCUPIED = 'Teacher is already occupied at this time slot!',
    INVALID_SLOT_OR_SHIFT = 'Invalid shift or slot id!',
    YOU_CAN_NOT_CHECKED_IN = 'You can checked in or checked out in your assigned lectures',
}
export enum TRIP_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save trip data!',
    DUPLICATE = 'Trip already exist!',
    GET_FAIL = 'Unable to retrieve trip data!',
    UPDATE_FAIL = 'Unable to update trip data!',
    DELETE_FAIL = 'Unable to delete trip data!',
    NOT_FOUND = 'Unable to find trip data!',
    INVALID_LECTURE_TIME = 'Invalid trip time!',
}
export enum SLOT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save slot data!',
    DUPLICATE = 'Slot already exist!',
    GET_FAIL = 'Unable to retrieve slot data!',
    UPDATE_FAIL = 'Unable to update slot data!',
    DELETE_FAIL = 'Unable to delete slot data!',
    NOT_FOUND = 'Unable to find slot data!',
    SLOT_LINKED = 'Slot is linked, cannot be deleted!',
    INVALID_LECTURE_TIME = 'Invalid slot time!',
}
export enum TO_DO_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save to-do data!',
    DUPLICATE = 'To-do already exist!',
    GET_FAIL = 'Unable to retrieve to-do data!',
    UPDATE_FAIL = 'Unable to update to-do data!',
    DELETE_FAIL = 'Unable to delete to-do data!',
    NOT_FOUND = 'Unable to find to-do data!',
}
export enum COURSE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save course data!',
    DUPLICATE = 'Course already exist!',
    GET_FAIL = 'Unable to retrieve course data!',
    UPDATE_FAIL = 'Unable to update course data!',
    DELETE_FAIL = 'Unable to delete course data!',
    NOT_FOUND = 'Unable to find course data!',
}
export enum USER_HAS_COURSE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user course data!',
    DUPLICATE = 'User already has this course!',
    GET_FAIL = 'Unable to retrieve user course data!',
    UPDATE_FAIL = 'Unable to update user course data!',
    DELETE_FAIL = 'Unable to delete user course data!',
    NOT_FOUND = 'Unable to find user course data!',
}
export enum GREETING_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save greeting data!',
    DUPLICATE = 'Greeting already exist!',
    GET_FAIL = 'Unable to retrieve greeting data!',
    UPDATE_FAIL = 'Unable to update greeting data!',
    DELETE_FAIL = 'Unable to delete greeting data!',
    NOT_FOUND = 'Unable to find greeting data!',
    CAN_NOT_DELETE = 'Unable to delete greeting data because it is set as the default greeting.',
}
export enum PDC_CHEQUE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save pdc cheque data!',
    DUPLICATE = 'Pdc cheque already exist!',
    GET_FAIL = 'Unable to retrieve pdc cheque data!',
    UPDATE_FAIL = 'Unable to update pdc cheque data!',
    DELETE_FAIL = 'Unable to delete pdc cheque data!',
    NOT_FOUND = 'Unable to find pdc cheque data!',
    CAN_NOT_UPDATE = 'Unable to update details due to cheque is clear',
    CAN_NOT_UPDATE_BOUNCED = 'Unable to update details due to cheque is bounced',
    CAN_NOT_CLEAR_UNLESS_DEPOSITED = 'You can not clear cheque unless it is deposited to bank',
    CAN_NOT_BOUNCE_UNLESS_DEPOSITED = 'You can not bounce cheque unless it is deposited to bank',
}
export enum VIDEO_ANALYST_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save video analyst data!',
    DUPLICATE = 'Video analyst already exist!',
    GET_FAIL = 'Unable to retrieve video analyst data!',
    UPDATE_FAIL = 'Unable to update video analyst data!',
    DELETE_FAIL = 'Unable to delete video analyst data!',
    NOT_FOUND = 'Unable to find video analyst data!',
}
export enum BLOG_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save blog data!',
    DUPLICATE = 'Blog already exist!',
    GET_FAIL = 'Unable to retrieve blog data!',
    UPDATE_FAIL = 'Unable to update blog data!',
    DELETE_FAIL = 'Unable to delete blog data!',
    NOT_FOUND = 'Unable to find blog data!',
    INVALID_LINK = 'Invalid Link Which you Try to open',
}
export enum DRIVER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save driver data!',
    DUPLICATE = 'Driver already exist!',
    GET_FAIL = 'Unable to retrieve driver data!',
    UPDATE_FAIL = 'Unable to update driver data!',
    DELETE_FAIL = 'Unable to delete driver data!',
    NOT_FOUND = 'Unable to find driver data!',
}
export enum TESTIMONIAL_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save testimonial data!',
    DUPLICATE = 'Testimonial already exist!',
    GET_FAIL = 'Unable to retrieve testimonial data!',
    UPDATE_FAIL = 'Unable to update testimonial data!',
    DELETE_FAIL = 'Unable to delete testimonial data!',
    NOT_FOUND = 'Unable to find testimonial data!',
    INVALID_LECTURE_TIME = 'Invalid testimonial time!',
}

export enum SUBJECT_INDEX_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save subjet index data!',
    DUPLICATE = 'Subjet index already exist!',
    GET_FAIL = 'Unable to retrieve subjet index data!',
    UPDATE_FAIL = 'Unable to update subjet index data!',
    DELETE_FAIL = 'Unable to delete subjet index data!',
    NOT_FOUND = 'Unable to find subjet index data!',
    INVALID_CHAPTER_INDEX = 'Chapter index has invalid data for given subject index!',
    INVALID_CHAPTER_TOPIC_INDEX = 'Chapter topic index has invalid data for given subject index!',
    INVALID_CHAPTER_SUB_TOPIC_INDEX = 'Chapter sub topic index has invalid data for given subject index!',
    INVALID_CHAPTER_INDEX_FILE = 'Chapter index has invalid file data for given subject index!',
    CAN_NOT_ASSIGN_TO_USER = 'Chapter index can not allow to user!',
}

export enum USER_PAYOUT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user payout data!',
    DUPLICATE = 'User payout already exist!',
    GET_FAIL = 'Unable to retrieve user payout data!',
    UPDATE_FAIL = 'Unable to update user payout data!',
    DELETE_FAIL = 'Unable to delete user payout data!',
    NOT_FOUND = 'Unable to find user payout data!',
}

export enum USER_PAYOUT_HISTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user payout history data!',
    DUPLICATE = 'User payout history already exist!',
    GET_FAIL = 'Unable to retrieve user payout history data!',
    UPDATE_FAIL = 'Unable to update user payout history data!',
    DELETE_FAIL = 'Unable to delete user payout history data!',
    NOT_FOUND = 'Unable to find user payout history data!',
}

export enum EXAM_GROUP_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save exams data!',
    DUPLICATE = 'exams already exist!',
    GET_FAIL = 'Unable to retrieve exams data!',
    UPDATE_FAIL = 'Unable to update exams data!',
    DELETE_FAIL = 'Unable to delete exams data!',
    NOT_FOUND = 'Unable to find exams data!',
    ALL_SUBJECT_EXAM_NOT_CREATED = 'All subjects exam not created!',
    ALL_SUBJECT_EXAM_MARKS_NOT_ADDED = 'All subjects exam marks not added!',
    INVALID_HOLIDAY = 'Invalid holiday added!',
}

export enum TASK_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user task data!',
    DUPLICATE = 'User task already exist!',
    GET_FAIL = 'Unable to retrieve task data!',
    UPDATE_FAIL = 'Unable to update task data!',
    DELETE_FAIL = 'Unable to delete task data!',
    NOT_FOUND = 'Unable to find task data!',
    DELETE_MESSAGES = 'Unable to delete messages',
}

export enum BATCH_SUBJECT_BOOK_ASSESSMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save assessment book data!',
    GET_FAIL = 'Unable to retrieve assessment book data!',
    UPDATE_FAIL = 'Unable to update assessment book data!',
    DELETE_FAIL = 'Unable to delete assessment book data!',
    NOT_FOUND = 'Unable to find assessment book!',
}

export enum USER_BOOK_ASSESSMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user book assessment book data!',
    GET_FAIL = 'Unable to retrieve user book assessment book data!',
    UPDATE_FAIL = 'Unable to update user book assessment book data!',
    DELETE_FAIL = 'Unable to delete user book assessment book data!',
    NOT_FOUND = 'Unable to find user book assessment book!',
}

export enum BATCH_SUBJECT_PROJECT_ASSESSMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save project assessment data!',
    GET_FAIL = 'Unable to retrieve project assessment data!',
    UPDATE_FAIL = 'Unable to update project assessment data!',
    DELETE_FAIL = 'Unable to delete project assessment data!',
    NOT_FOUND = 'Unable to find project assessment!',
}

export enum VEHICLE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save vehicle data!',
    GET_FAIL = 'Unable to retrieve vehicle data!',
    UPDATE_FAIL = 'Unable to update vehicle data!',
    DELETE_FAIL = 'Unable to delete vehicle data!',
    NOT_FOUND = 'Unable to find vehicle!',
}

export enum GENERATE_ID_CARD_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save id card data!',
    GET_FAIL = 'Unable to retrieve id card data!',
    UPDATE_FAIL = 'Unable to update id card data!',
    DELETE_FAIL = 'Unable to delete id card data!',
    NOT_FOUND = 'Id card not found!',
}
export enum CONTACT_FEED_BACK_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save contact feed back data!',
    GET_FAIL = 'Unable to retrieve contact feed back data!',
    NOT_FOUND = 'Unable to find contact feed back data!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for contact feed back data',
}
export enum PHOTO_GALLERY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save photo gallery data!',
    DUPLICATE = 'Photo gallery already exists with the same name!',
    GET_ALL_FAIL = 'Unable to retrieve all photo galleries data!',
    GET_FAIL = 'Unable to retrieve photo gallery data!',
    UPDATE_FAIL = 'Unable to update photo gallery data!',
    DELETE_FAIL = 'Unable to delete photo gallery data!',
    NOT_FOUND = 'Unable to find photo gallery!',
}
export enum NOTIFICATION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to sen notification data!',
    GET_FAIL = 'Unable to retrieve notification data!',
    UPDATE_FAIL = 'Unable to update notification data!',
    DELETE_FAIL = 'Unable to delete notification data!',
    NOT_FOUND = 'Unable to find notification!',
}
export enum RULES_REGULATION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Rule Regulation data!',
    GET_FAIL = 'Unable to retrieve Rule Regulation data!',
    UPDATE_FAIL = 'Unable to update Rule Regulation data!',
    DELETE_FAIL = 'Unable to delete Rule Regulation data!',
    NOT_FOUND = 'Unable to find Rule Regulation!',
}

export enum CAREER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Career data!',
    GET_FAIL = 'Unable to retrieve Career data!',
    UPDATE_FAIL = 'Unable to update Career data!',
    DELETE_FAIL = 'Unable to delete Career data!',
    NOT_FOUND = 'Unable to find Career!',
}

export enum SIGNED_URL_ERROR_MESSAGES {
    MISSING_QUERY_PARAMS = 'Missing expires or signature in query.',
    URL_EXPIRED = 'Signed URL has expired.',
    INVALID_SIGNATURE = 'Invalid signature.',
    SECRET_NOT_SET = 'SIGNED_URL_SECRET is not set in environment variables.',
}
export enum FLOOR_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save floor data!',
    GET_FAIL = 'Unable to retrieve floor data!',
    INVALID_SELECTED = 'Invalid selected floor!',
    UPDATE_FAIL = 'Unable to update floor data!',
    DELETE_FAIL = 'Unable to delete floor data!',
    NOT_FOUND = 'Unable to find floor!',
    CLASS_ROOM_EXITS = 'Can not delete floor ,classRoom attached with this floor',
}

export enum SUBSCRIPTION_PLAN_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save subscription plan data!',
    DUPLICATE = 'Subscription plan title already exist',
    GET_FAIL = 'Unable to retrieve subscription plan data!',
    UPDATE_FAIL = 'Unable to update subscription plan data!',
    DELETE_FAIL = 'Unable to delete subscription plan  data!',
    NOT_FOUND = 'Unable to find subscription plan data!',
    INVALID_FILES = 'Files attached with subscription plan are invalid!',
    INVALID_MODULE_FEATURE = 'Selected invalid module or feature!',
    PLAN_USER_EXCEED_MAX_USER = 'subscription plan users exceed limit of max users!',
    VALID_CURRENCY_MISMATCHED = 'Subscription plan currency and storage currency should be same',
    APPLIED_PLAN_CAN_NOT_DELETE = 'Subscription plan could not be deleted as it is applied by some users!',
}

export enum CLOUD_STORAGE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save cloud storage data!',
    GET_FAIL = 'Unable to retrieve cloud storage data!',
    UPDATE_FAIL = 'Unable to update cloud storage data!',
    DELETE_FAIL = 'Unable to delete cloud storage data!',
    NOT_FOUND = 'Unable to find cloud storage!',
}

export enum HOME_WORK_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save home work!',
    GET_FAIL = 'Unable to retrieve home work!',
    UPDATE_FAIL = 'Unable to update home work!',
    DELETE_FAIL = 'Unable to delete home work!',
    NOT_FOUND = 'Unable to find home work!',
}

export enum USER_HAS_HOME_WORK_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user data!',
    GET_FAIL = 'Unable to retrieve user data!',
    UPDATE_FAIL = 'Unable to update user data!',
    DELETE_FAIL = 'Unable to delete user data!',
    NOT_FOUND = 'Unable to find user!',
    HOME_WORK_ALREADY_EXISTS = 'HomeWork Exits Plz verify your Data',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for user offer data',
}

export enum DAILY_BOOK_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Daily Book!',
    GET_FAIL = 'Unable to retrieve Daily Book!',
    UPDATE_FAIL = 'Unable to update Daily Book!',
    DELETE_FAIL = 'Unable to delete Daily Book!',
    NOT_FOUND = 'Unable to find Daily Book!',
}
export enum SYLLABUS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save syllabus data!',
    DUPLICATE = 'Syllabus already exist!',
    GET_FAIL = 'Unable to retrieve syllabus data!',
    UPDATE_FAIL = 'Unable to update syllabus data!',
    DELETE_FAIL = 'Unable to delete syllabus data!',
    NOT_FOUND = 'Unable to find syllabus data!',
}

export enum COIN_PURCHASE_OFFER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save coin purchase offer data!',
    GET_FAIL = 'Unable to retrieve coin purchase offer data!',
    UPDATE_FAIL = 'Unable to update coin purchase offer data!',
    DELETE_FAIL = 'Unable to delete coin purchase offer data!',
    NOT_FOUND = 'Unable to find coin purchase offer!',
}

export enum VENDOR_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save vendor data!',
    DUPLICATE = 'Vendor already exist!',
    GET_FAIL = 'Unable to retrieve vendor data!',
    UPDATE_FAIL = 'Unable to update vendor data!',
    DELETE_FAIL = 'Unable to delete vendor data!',
    NOT_FOUND = 'Unable to find vendor data!',
}

export enum SUB_CATEGORY_ERROR_MESSAGES {
    DUPLICATE = 'Sub category already exist!',
    CREATE_FAIL = 'Unable to save Sub-category data!',
    GET_FAIL = 'Unable to retrieve Sub-category data!',
    UPDATE_FAIL = 'Unable to update Sub-category data!',
    DELETE_FAIL = 'Unable to delete Sub-category data!',
    NOT_FOUND = 'Unable to find Sub-category!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for Sub-category data',
    SUB_CATEGORY_IN_USE = 'Sub-category is in use by product, cannot be deleted!',
}

export enum PRODUCT_ERROR_MESSAGES {
    DUPLICATE = 'Product already exist!',
    CREATE_FAIL = 'Unable to save Product data!',
    GET_FAIL = 'Unable to retrieve Product data!',
    UPDATE_FAIL = 'Unable to update Product data!',
    DELETE_FAIL = 'Unable to delete Product data!',
    NOT_FOUND = 'Unable to find Product!',
    INSTITUTE_NOT_FOUND = 'Institute Not Found for Product data',
    PRODUCT_IN_USE = 'Product is in use by invoice, cannot be deleted!',
}

export enum INVOICE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save invoice data!',
    DUPLICATE = 'Invoice already exist!',
    GET_FAIL = 'Unable to retrieve invoice data!',
    UPDATE_FAIL = 'Unable to update invoice data!',
    DELETE_FAIL = 'Unable to delete invoice data!',
    NOT_FOUND = 'Unable to find invoice data!',
    INVALID_LINK = 'Invalid Link Which you Try to open',
}

export enum COLUMN_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save column data!',
    DUPLICATE = 'Column title already exist!',
    GET_FAIL = 'Unable to retrieve column data!',
    UPDATE_FAIL = 'Unable to update column data!',
    DELETE_FAIL = 'Unable to delete column data!',
    NOT_FOUND = 'Unable to find column data!',
    INVALID_LINK = 'Invalid Link Which you Try to open',
}

export enum PDC_HISTORY_ERROR_MESSAGES {
    NOT_FOUND = 'Unable to find pdc history data!',
}

export enum DASHBOARD_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Dashboard Management data!',
    DUPLICATE = 'Dashboard Management already exist!',
    GET_FAIL = 'Unable to retrieve Dashboard Management data!',
    UPDATE_FAIL = 'Unable to update Dashboard Management data!',
    DELETE_FAIL = 'Unable to delete Dashboard Management data!',
    NOT_FOUND = 'Unable to find Dashboard Management data!',
}
export enum CERTIFICATES_MANAGEMENT_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Certificates Management data!',
    GET_FAIL = 'Unable to retrieve Certificates Management data!',
    UPDATE_FAIL = 'Unable to update Certificates Management data!',
    DELETE_FAIL = 'Unable to delete Certificates Management data!',
    NOT_FOUND = 'Unable to find Certificates Management data!',
    ALREADY_EXISTS = 'Certificates Management already exists with the same name!',
}

export enum CERTIFICATES_HISTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Certificates History data!',
    GET_FAIL = 'Unable to retrieve Certificates History data!',
    NOT_FOUND = 'Unable to find Certificates Management data!',
}
export enum REPLACE_TEACHER_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save replace teacher data!',
    DUPLICATE = 'Replace teacher already exist!',
    GET_FAIL = 'Unable to retrieve data!',
    UPDATE_FAIL = 'Unable to update data!',
    DELETE_FAIL = 'Unable to delete data!',
    NOT_FOUND = 'Unable to find data!',
    INVALID_LINK = 'Invalid Link Which you Try to open',
    DUPLICATE_BATCH = 'Duplicate batch id!',
}
export enum WALLET_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save wallet data!',
    DUPLICATE = 'Wallet already exist!',
    GET_FAIL = 'Unable to retrieve wallet data!',
    UPDATE_FAIL = 'Unable to update wallet data!',
    DELETE_FAIL = 'Unable to delete wallet data!',
    NOT_FOUND = 'Unable to find wallet!',
    STORAGE_EXCEEDS = 'Wallet storage limit exceeds!',
}

export enum WALLET_HISTORY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save wallet history data!',
    DUPLICATE = 'Wallet history already exist!',
    GET_FAIL = 'Unable to retrieve wallet history data!',
    UPDATE_FAIL = 'Unable to update wallet history data!',
    DELETE_FAIL = 'Unable to delete wallet history data!',
    NOT_FOUND = 'Unable to find wallet history!',
}

export enum WALLET_TRANSACTION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save wallet transaction data!',
    DUPLICATE = 'Wallet transaction already exist!',
    GET_FAIL = 'Unable to retrieve wallet transaction data!',
    UPDATE_FAIL = 'Unable to update wallet transaction data!',
    DELETE_FAIL = 'Unable to delete wallet transaction data!',
    NOT_FOUND = 'Unable to find wallet transaction!',
    NOT_CHANGE_COMPLETED = 'Can not change completed transaction status!',
    PLAN_ID_UUID_REQUIRED = 'Plan id and uuid is required for buy plan!',
    ITEM_COUNT_REQUIRED = 'Item count and amount is required for transaction!',
    INSTITUTE_REQUIRED = 'Institute is required!',
    NOT_ENOUGH_COIN = 'User do not have enough coin  for transaction!',
    NOT_ENOUGH_STORAGE = 'User do not have enough storage  for transaction!',
    USER_EXCEED = 'User limit exceed for institute plan!',
    INVALID_OTP = 'Otp is invalid or expired!',
    INVALID_VOUCHER = 'Voucher code is invalid or expired!',
    USER_TYPE_REQUIRED = 'User type required for buy or refund user',
    CAN_NOT_DOWNGRADE_PLAN = 'You can not downgrade your plan!',
}

export enum INSTITUTE_SUBSCRIPTION_PLAN_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save institute subscription plan data!',
    DUPLICATE = 'Institute subscription plan already exist!',
    GET_FAIL = 'Unable to retrieve institute subscription plan data!',
    UPDATE_FAIL = 'Unable to update institute subscription plan data!',
    DELETE_FAIL = 'Unable to delete institute subscription plan data!',
    NOT_FOUND = 'Unable to find institute subscription plan!',
    USED_STORAGE_EXCEEDS_TOTAL = 'Used storage exceeds total allow storage',
    USED_USERS_EXCEEDS_TOTAL = 'Used users exceed total allow users',
}

export enum USER_HAS_STORAGE_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save user storage data!',
    DUPLICATE = 'User storage already exist!',
    GET_FAIL = 'Unable to retrieve user storage data!',
    UPDATE_FAIL = 'Unable to update user storage data!',
    DELETE_FAIL = 'Unable to delete user storage data!',
    NOT_FOUND = 'Unable to find user storage!',
}

export enum ENTITY_GROUP_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Entity Group!',
    GET_FAIL = 'Unable to retrieve Entity Group!',
    UPDATE_FAIL = 'Unable to update Entity Group!',
    DELETE_FAIL = 'Unable to delete Entity Group!',
    NOT_FOUND = 'Unable to find Entity Group!',
}
export enum JOB_APPLY_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Job Apply data!',
    DUPLICATE = 'Job Apply already exist!',
    GET_FAIL = 'Unable to retrieve Job Apply data!',
    UPDATE_FAIL = 'Unable to update Job Apply data!',
    DELETE_FAIL = 'Unable to delete Job Apply data!',
    NOT_FOUND = 'Unable to find Job Apply data!',
    ALREADY_APPLIED = 'You have already applied for this job!',
}
export enum USER_REQUIRED_STEPS_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save User Required Steps data!',
    GET_FAIL = 'Unable to retrieve User Required Steps data!',
    UPDATE_FAIL = 'Unable to update User Required Steps data!',
    DELETE_FAIL = 'Unable to delete User Required Steps data!',
    NOT_FOUND = 'Unable to find User Required Steps data!',
    ALREADY_EXISTS = 'User Required Steps already exists for this step number!',
}

export enum PAYMENT_TRANSACTION_ERROR_MESSAGES {
    CREATE_FAIL = 'Unable to save Payment Transaction!',
    GET_FAIL = 'Unable to retrieve Payment Transaction!',
    UPDATE_FAIL = 'Unable to update Payment Transaction!',
    DELETE_FAIL = 'Unable to delete Payment Transaction!',
    NOT_FOUND = 'Unable to find Payment Transaction!',
    UNSUPPORTED_GATEWAY = 'Unsupported payment gateway!',
}
