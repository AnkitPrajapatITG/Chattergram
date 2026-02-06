
/**
 * Centralized HTTP response handler.
 * Ensures a consistent API response structure across the application.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 200, 400, 500)
 * @param {boolean|string} status - Operation status (true/false or 'success'/'error')
 * @param {string} message - Human-readable response message
 * @param {*} result - Payload/data to be returned in the response
 */

module.exports = {
    sendResponse: function (res, statusCode, status, message, result) {
        res.status(statusCode).json({ status, message, result });
    },
};