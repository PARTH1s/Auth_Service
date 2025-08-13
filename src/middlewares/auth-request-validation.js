const { ClientErrorCodes } = require("../utils/error-codes");

/**
 * Middleware to validate user authentication input.
 * Ensures both email and password are provided in the request body.
 */
const validateUserAuth = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            message: "Email and password are required",
            data: {},
            err: {}
        });
    }
    next();
};

/**
 * Middleware to validate admin user request.
 * Ensures userId is provided in the request body.
 */
const validateIsAdminUserRequest = (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            message: "User ID is required",
            data: {},
            err: {}
        });
    }
    next();
};

module.exports = { validateUserAuth, validateIsAdminUserRequest };
