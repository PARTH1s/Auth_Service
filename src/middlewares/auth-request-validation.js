const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Email and Password are required',
            data: {},
            success: false,
            err: {}
        });
    }
    next();
};

const validateisAdminUserRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            message: 'UserId is not given',
            data: {},
            success: false,
            err: {}
        });
    }
    next();
};

module.exports = { validateUserAuth, validateisAdminUserRequest };
