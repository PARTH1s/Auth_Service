// Service layer handling role-related operations (create, read, update, delete)
const RolesRepository = require('../repository/roles-repository');

class RolesService {
    constructor() {
        this.rolesRepository = new RolesRepository(); // Initialize roles repository
    }

    async create(data) {
        try {
            return await this.rolesRepository.create(data); // Create a new role
        } catch (error) {
            console.error("Service Layer Error - create:", error);
            throw error;
        }
    }

    async getById(roleId) {
        try {
            return await this.rolesRepository.getById(roleId); // Fetch role by ID
        } catch (error) {
            console.error("Service Layer Error - getById:", error);
            throw error;
        }
    }

    async getByName(name) {
        try {
            return await this.rolesRepository.getByName(name); // Fetch role by name
        } catch (error) {
            console.error("Service Layer Error - getByName:", error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.rolesRepository.getAll(); // Fetch all roles
        } catch (error) {
            console.error("Service Layer Error - getAll:", error);
            throw error;
        }
    }

    async update(roleId, data) {
        try {
            return await this.rolesRepository.update(roleId, data); // Update role by ID
        } catch (error) {
            console.error("Service Layer Error - update:", error);
            throw error;
        }
    }

    async delete(roleId) {
        try {
            return await this.rolesRepository.delete(roleId); // Delete role by ID
        } catch (error) {
            console.error("Service Layer Error - delete:", error);
            throw error;
        }
    }
}

module.exports = RolesService;
