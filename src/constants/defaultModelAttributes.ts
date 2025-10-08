export const INSTITUTE_DEFAULT_ATTRIBUTES = {
    ATTRIBUTES: {
        INCLUDES: ['id', 'name', 'status', 'email', 'addressLine1', 'addressLine2', 'pinCode', 'city', 'state', 'mobile', 'completedStep'],
    },
};

export const INSTITUTE_WORKING_DAY_DEFAULT_ATTRIBUTES = {
    ATTRIBUTES: {
        INCLUDES: ['id', 'dayName', 'status', 'startTime', 'endTime'],
    },
};

// export const DEFAULT_EXCLUDES_ATTRIBUTES = ['createdBy', 'updatedBy', 'createdAt', 'updatedAt'];
export const DEFAULT_EXCLUDES_ATTRIBUTES = ['createdAt', 'updatedAt', 'deletedAt'];

export const USER_BASIC_DETAIL = ['id', 'firstName', 'lastName', 'emailVerification', 'email', 'mobile', 'type', 'globalId', 'dob', 'bloodGroup'];

export const SUBJECT_FEE_BASIC_DETAIL = ['id', 'instituteId', 'subjectId', 'fee'];

export const FEE_COLLECTION_BASIC_DETAIL = ['id', 'feeAmount', 'discount', 'status', 'paidFee'];

export const INSTITUTE_BASIC_DETAIL = ['id', 'name', 'status', 'email', 'addressLine1', 'addressLine2', 'pinCode', 'coverImage', 'profileImage'];

export const FILE_BASIC_DETAIL = ['id', 'originalFileName', 'storageFileName', 'storagePath'];

export const USER_PAYOUT_BASIC_DETAIL = ['id', 'userId', 'userType', 'instituteId', 'totalPayableAmount', 'totalPaidAmount', 'type'];
