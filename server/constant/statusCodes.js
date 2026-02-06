/**
 * ============================================================
 * HTTP STATUS CODES
 * ============================================================
 * Centralized HTTP status codes for consistent API responses
 */
module.exports.statusCode = {
     // Success responses
    OK: 200, // Request succeeded
    CREATED: 201, // Resource successfully created
    ACCEPTED: 202,  // Request accepted for processing

    //  Client error responses
    BAD_REQUEST: 400, // Invalid request data
    UNAUTHORIZED: 401, // Authentication required or failed
    PERMISSION_DENIED: 403, // Insufficient permissions
    FORBIDDEN: 403, // Access to the resource is forbidden
    NOT_FOUND: 404, // Resource not found
    ALREADY_EXIST:422,//ALREADY EXIST

    // Server error responses
    INTERNAL_SERVER_ERROR: 500, // Generic server error
};
