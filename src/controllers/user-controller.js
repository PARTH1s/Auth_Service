const {
    SuccessCodes,
    ServerErrorCodes,
    ClientErrorCodes,
} = require("../utils/error-codes");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(SuccessCodes.CREATED).json({
            success: true,
            message: "User created successfully",
            data: response,
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - create", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const signIn = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(ClientErrorCodes.BAD_REQUEST).json({
                success: false,
                message: "Email and Password are required",
                data: {},
                err: {},
            });
        }

        const token = await userService.signIn(email, password);

        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "User signed in successfully",
            data: { token },
            err: {},
        });
    } catch (error) {
        console.log("Sign-in error", error);
        const statusCode =
            error.error === "User not found!"
                ? ClientErrorCodes.NOT_FOUND
                : error.error === "Incorrect Password!"
                    ? ClientErrorCodes.UNAUTHORIZED
                    : ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            success: false,
            message: error.error || "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(ClientErrorCodes.UNAUTHORIZED).json({
                success: false,
                message: "No token provided",
                data: {},
                err: {},
            });
        }

        const response = await userService.isAuthenticated(token);
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "Token verified successfully",
            data: response,
            err: {},
        });
    } catch (error) {
        console.log("Token verification error", error);
        return res.status(ClientErrorCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid or expired token",
            data: {},
            err: error.message || error,
        });
    }
};

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
                data: {},
                err: {},
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "User fetched successfully",
            data: user,
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getById", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getAll", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const update = async (req, res) => {
    try {
        const updated = await userService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: "User not found or not updated",
                data: {},
                err: {},
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "User updated successfully",
            data: {},
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - update", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await userService.delete(req.params.id);
        if (!deleted) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: "User not found or not deleted",
                data: {},
                err: {},
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "User deleted successfully",
            data: {},
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - delete", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
        });
    }
};

const isAdmin = async (req, res) => {
    try {
        const userId = req.body.id;
        const response = await userService.isAdmin(userId);
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "Admin status checked successfully",
            data: response,
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - isAdmin", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong.",
            data: {},
            err: error.message || error,
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
    isAuthenticated,
    isAdmin,
};
