const UserService = require('../services/user-service');

const create = async (req, res) => {
    try {
        const response = await new UserService().create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - create", error);
        return res.status(500).json({
            message: 'Something went wrong.',
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
            return res.status(404).json({
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
        return res.status(500).json({
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
        return res.status(200).json({
            status: 'success',
            message: 'Users fetched successfully',
            data: users,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getAll", error);
        return res.status(500).json({
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
            return res.status(404).json({
                status: 'fail',
                message: 'User not found or not updated',
                data: {},
                err: {}
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: {},
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - update", error);
        return res.status(500).json({
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
            return res.status(404).json({
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
        return res.status(500).json({
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
    remove
};
