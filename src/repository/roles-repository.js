const { Role } = require('../models/index');

/**
 * Repository for Role entity operations.
 */
class RolesRepository {
    // Create a new role
    async create(data) {
        try {
            return await Role.create(data);
        } catch (error) {
            console.error("Error creating role:", error);
            throw error;
        }
    }

    // Delete a role by ID
    async delete(roleId) {
        try {
            const deleted = await Role.destroy({ where: { id: roleId } });
            return deleted > 0;
        } catch (error) {
            console.error("Error deleting role:", error);
            throw error;
        }
    }

    // Get a role by ID
    async getById(roleId) {
        try {
            return await Role.findByPk(roleId);
        } catch (error) {
            console.error("Error fetching role by ID:", error);
            throw error;
        }
    }

    // Get a role by name
    async getByName(name) {
        try {
            return await Role.findOne({ where: { name } });
        } catch (error) {
            console.error("Error fetching role by name:", error);
            throw error;
        }
    }

    // Get all roles
    async getAll() {
        try {
            return await Role.findAll();
        } catch (error) {
            console.error("Error fetching all roles:", error);
            throw error;
        }
    }

    // Update a role by ID
    async update(roleId, data) {
        try {
            const [updated] = await Role.update(data, { where: { id: roleId } });
            return updated > 0;
        } catch (error) {
            console.error("Error updating role:", error);
            throw error;
        }
    }
}

module.exports = RolesRepository;
