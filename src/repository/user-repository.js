const { User } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went on repository layer - create")
            throw error;
        }
    }

    async delete(userId) {
        try {
            await User.destroy({ where: { id: userId } });
            return true;
        } catch (error) {
            console.log("Something went on repository layer - delete")
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer - getById");
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer - getByEmail");
            throw error;
        }
    }

    async getAll() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.log("Something went wrong in repository layer - getAll");
            throw error;
        }
    }

    async update(userId, data) {
        try {
            const [updatedRows] = await User.update(data, { where: { id: userId } });
            return updatedRows > 0; // true if updated
        } catch (error) {
            console.log("Something went wrong in repository layer - update");
            throw error;
        }
    }
}

module.exports = UserRepository