const { SuccessCodes, ServerErrorCodes, ClientErrorCodes } = require("../utils/error-codes")

const UserService = require('../services/user-service');

const create = async (req, res) => {
    try {
        const response = await new UserService().create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(SuccessCodes.CREATED).json({
            status: 'success',
            message: 'User created successfully',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - create", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(ClientErrorCodes.BAD_REQUEST).json({
                message: 'Email and Password are required',
                data: {},
                success: false,
                err: {}
            });
        }

        const token = await new UserService().signIn(email, password);

        return res.status(SuccessCodes.OK).json({
            message: 'User signed in successfully',
            data: { token },
            success: true,
            err: {}
        });

    } catch (error) {
        console.log('Sign-in error', error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};


const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(ClientErrorCodes.UNAUTHORIZED).json({
                message: 'No token provided',
                data: {},
                success: false,
                err: {}
            });
        }

        const response = await userService.isAuthenticated(token); 
        return res.status(SuccessCodes.OK).json({
            message: 'Token verified successfully',
            data: response,
            success: true,
            err: {}
        });

    } catch (error) {
        console.log('Token verification error', error);
        return res.status(ClientErrorCodes.UNAUTHORIZED).json({
            message: 'Invalid or expired token',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};


const getById = async (req, res) => {
    try {
        const user = await new UserService().getById(req.params.id);
        if (!user) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found',
                data: {},
                err: {}
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'User fetched successfully',
            data: user,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getById", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await new UserService().getAll();
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Users fetched successfully',
            data: users,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getAll", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};

const update = async (req, res) => {
    try {
        const updated = await new UserService().update(req.params.id, req.body);
        if (!updated) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found or not updated',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'User updated successfully',
            data: {},
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - update", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await new UserService().delete(req.params.id);
        if (!deleted) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found or not deleted',
                data: {},
                err: {}
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: {},
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - delete", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong.',
            data: {},
            success: false,
            err: error.message || error
        });
    }
};

module.exports = {
    create,
    getById,
    getAll,
    update,
    remove,
    signIn,
    isAuthenticated
};
