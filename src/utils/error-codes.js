// HTTP client-side error codes
const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,       // Invalid request from client
    UNAUTHORIZED: 401,      // Authentication required or failed
    FORBIDDEN: 403,         // Access forbidden
    NOT_FOUND: 404          // Resource not found
});

// HTTP server-side error codes
const ServerErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500, // General server error
    NOT_IMPLEMENTED: 501        // Feature not implemented
});

// HTTP success codes
const SuccessCodes = Object.freeze({
    OK: 200,           // Request succeeded
    CREATED: 201       // Resource created successfully
});

module.exports = {
    ClientErrorCodes,
    ServerErrorCodes,
    SuccessCodes
};
