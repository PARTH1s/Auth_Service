const UserRepository = require('../repository/user-repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        // Create a new user
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer - create");
            throw error;
        }
    }

    async getById(userId) {
        // Get user by ID
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer - getById");
            throw error;
        }
    }

    async getByEmail(email) {
        // Get user by email
        try {
            const user = await this.userRepository.getByEmail(email);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer - getByEmail");
            throw error;
        }
    }

    async getAll() {
        // Get all users
        try {
            const users = await this.userRepository.getAll();
            return users;
        } catch (error) {
            console.log("Something went wrong in service layer - getAll");
            throw error;
        }
    }

    async update(userId, data) {
        // Update user by ID
        try {
            const updated = await this.userRepository.update(userId, data);
            return updated;
        } catch (error) {
            console.log("Something went wrong in service layer - update");
            throw error;
        }
    }

    async delete(userId) {
        // Delete user by ID
        try {
            const deleted = await this.userRepository.delete(userId);
            return deleted;
        } catch (error) {
            console.log("Something went wrong in service layer - delete");
            throw error;
        }
    }
}

module.exports = UserService;
