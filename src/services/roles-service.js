const RolesRepository = require('../repository/roles-repository');

class RolesService {
    constructor() {
        this.rolesRepository = new RolesRepository();
    }

    async create(data) {
        try {
            const role = await this.rolesRepository.create(data);
            return role;
        } catch (error) {
            console.log("Something went wrong in service layer - create");
            throw error;
        }
    }

    async getById(roleId) {
        try {
            const role = await this.rolesRepository.getById(roleId);
            return role;
        } catch (error) {
            console.log("Something went wrong in service layer - getById");
            throw error;
        }
    }

    async getByName(name) {
        try {
            const role = await this.rolesRepository.getByName(name);
            return role;
        } catch (error) {
            console.log("Something went wrong in service layer - getByName");
            throw error;
        }
    }

    async getAll() {
        try {
            const roles = await this.rolesRepository.getAll();
            return roles;
        } catch (error) {
            console.log("Something went wrong in service layer - getAll");
            throw error;
        }
    }

    async update(roleId, data) {
        try {
            const updated = await this.rolesRepository.update(roleId, data);
            return updated;
        } catch (error) {
            console.log("Something went wrong in service layer - update");
            throw error;
        }
    }

    async delete(roleId) {
        try {
            const deleted = await this.rolesRepository.delete(roleId);
            return deleted;
        } catch (error) {
            console.log("Something went wrong in service layer - delete");
            throw error;
        }
    }
}

module.exports = RolesService;
