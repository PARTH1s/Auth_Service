const { SuccessCodes, ServerErrorCodes, ClientErrorCodes } = require("../utils/error-codes");
const RolesService = require('../services/roles-service');

const rolesService = new RolesService();

const create = async (req, res) => {
    try {
        const response = await rolesService.create({
            name: req.body.name
        });
        return res.status(SuccessCodes.CREATED).json({
            status: 'success',
            message: 'Role created successfully',
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

const getById = async (req, res) => {
    try {
        const role = await rolesService.getById(req.params.id);
        if (!role) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'Role not found',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Role fetched successfully',
            data: role,
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

const getByName = async (req, res) => {
    try {
        const role = await rolesService.getByName(req.params.name);
        if (!role) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'Role not found',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Role fetched successfully',
            data: role,
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in controller layer - getByName", error);
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
        const roles = await rolesService.getAll();
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Roles fetched successfully',
            data: roles,
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
        const updated = await rolesService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'Role not found or not updated',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Role updated successfully',
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
        const deleted = await rolesService.delete(req.params.id);
        if (!deleted) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'Role not found or not deleted',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            status: 'success',
            message: 'Role deleted successfully',
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
    getByName,
    getAll,
    update,
    remove
};
