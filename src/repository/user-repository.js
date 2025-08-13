const { User, Role } = require("../models/index");

class UserRepository {
    // Create a new user
    async create(data) {
        try {
            return await User.create(data);
        } catch (error) {
            console.error("Error in repository - create:", error);
            throw error;
        }
    }

    // Delete a user by ID
    async delete(userId) {
        try {
            const deleted = await User.destroy({ where: { id: userId } });
            return deleted > 0;
        } catch (error) {
            console.error("Error in repository - delete:", error);
            throw error;
        }
    }

    // Get user by ID
    async getById(userId) {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            console.error("Error in repository - getById:", error);
            throw error;
        }
    }

    // Get user by email
    async getByEmail(email) {
        try {
            return await User.findOne({ where: { email } });
        } catch (error) {
            console.error("Error in repository - getByEmail:", error);
            throw error;
        }
    }

    // Get all users
    async getAll() {
        try {
            return await User.findAll();
        } catch (error) {
            console.error("Error in repository - getAll:", error);
            throw error;
        }
    }

    // Update user by ID
    async update(userId, data) {
        try {
            const [updatedRows] = await User.update(data, { where: { id: userId } });
            return updatedRows > 0;
        } catch (error) {
            console.error("Error in repository - update:", error);
            throw error;
        }
    }

    // Check if user has ADMIN role
    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) return false;

            const adminRole = await Role.findOne({ where: { name: "ADMIN" } });
            if (!adminRole) return false;

            return await user.hasRole(adminRole);
        } catch (error) {
            console.error("Error in repository - isAdmin:", error);
            throw error;
        }
    }
}

module.exports = UserRepository;
