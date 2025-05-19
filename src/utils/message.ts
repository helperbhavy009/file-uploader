export enum ERROR_MESSAGES {
    INTERNAL_SERVER_ERROR = `Internal Server Error`,
    PASSWORD_PATTERN_ERROR = '{entity} must have {data}',
    INVALID_JSON = 'Invalid JSON',
    ACCOUNT_NOT_FOUND = 'Account not found',
  }
  
  export enum SUCCESS_MESSAGES {
    REQUEST_SUCCESS = 'Request Successfull',
    CREATED_SUCCESS = '{entity} Created successfully',
    UPDATED_SUCCESS = '{entity} Updated successfully',
    FETCHED_SUCCESS = '{entity} fetched successfully'
  }