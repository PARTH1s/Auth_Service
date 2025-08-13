const { SuccessCodes, ServerErrorCodes, ClientErrorCodes } = require("../utils/error-codes");
const RolesService = require('../services/roles-service');

const rolesService = new RolesService();

/**
 * Create a new role
 */
const create = async (req, res) => {
    try {
        const response = await rolesService.create({ name: req.body.name });
        return res.status(SuccessCodes.CREATED).json({
            success: true,
            message: 'Role created successfully',
            data: response,
            err: {}
        });
    } catch (error) {
        console.error("Controller - create role error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
            err: error.message || error
        });
    }
};

/**
 * Get role by ID
 */
const getById = async (req, res) => {
    try {
        const role = await rolesService.getById(req.params.id);
        if (!role) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: 'Role not found',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: 'Role fetched successfully',
            data: role,
            err: {}
        });
    } catch (error) {
        console.error("Controller - getById error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
            err: error.message || error
        });
    }
};

/**
 * Get role by name
 */
const getByName = async (req, res) => {
    try {
        const role = await rolesService.getByName(req.params.name);
        if (!role) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: 'Role not found',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: 'Role fetched successfully',
            data: role,
            err: {}
        });
    } catch (error) {
        console.error("Controller - getByName error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
            err: error.message || error
        });
    }
};

/**
 * Get all roles
 */
const getAll = async (req, res) => {
    try {
        const roles = await rolesService.getAll();
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: 'Roles fetched successfully',
            data: roles,
            err: {}
        });
    } catch (error) {
        console.error("Controller - getAll error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
            err: error.message || error
        });
    }
};

/**
 * Update a role by ID
 */
const update = async (req, res) => {
    try {
        const updated = await rolesService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: 'Role not found or not updated',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: 'Role updated successfully',
            data: {},
            err: {}
        });
    } catch (error) {
        console.error("Controller - update role error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
            err: error.message || error
        });
    }
};

/**
 * Delete a role by ID
 */
const remove = async (req, res) => {
    try {
        const deleted = await rolesService.delete(req.params.id);
        if (!deleted) {
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                message: 'Role not found or not deleted',
                data: {},
                err: {}
            });
        }
        return res.status(SuccessCodes.OK).json({
            success: true,
            message: 'Role deleted successfully',
            data: {},
            err: {}
        });
    } catch (error) {
        console.error("Controller - delete role error:", error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
            data: {},
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
