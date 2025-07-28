const { Role } = require('../models/index');

class RolesRepository {

    async create(data) {
        try {
            const role = await Role.create(data);
            return role;
        } catch (error) {
            console.log("Something went wrong in repository layer - create");
            throw error;
        }
    }

    async delete(roleId) {
        try {
            await Role.destroy({ where: { id: roleId } });
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer - delete");
            throw error;
        }
    }

    async getById(roleId) {
        try {
            const role = await Role.findByPk(roleId);
            return role;
        } catch (error) {
            console.log("Something went wrong in repository layer - getById");
            throw error;
        }
    }

    async getByName(name) {
        try {
            const role = await Role.findOne({ where: { name } });
            return role;
        } catch (error) {
            console.log("Something went wrong in repository layer - getByName");
            throw error;
        }
    }

    async getAll() {
        try {
            const roles = await Role.findAll();
            return roles;
        } catch (error) {
            console.log("Something went wrong in repository layer - getAll");
            throw error;
        }
    }

    async update(roleId, data) {
        try {
            const [updatedRows] = await Role.update(data, { where: { id: roleId } });
            return updatedRows > 0; // true if updated
        } catch (error) {
            console.log("Something went wrong in repository layer - update");
            throw error;
        }
    }
}

module.exports = RolesRepository;
