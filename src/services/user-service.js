const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');

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

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userinpuplainpassword, encryptedpassword) {
        try {
            return bcrypt.compare(userinpuplainpassword, encryptedpassword);
        } catch (error) {
            console.log("Something went wrong in password checking.");
            throw error;
        }
    }

    async signIn(email, plainpassword) {
        try {
            const user = await this.userRepository.getByEmail(email);

            if (!user) {
                throw { error: "User not found!" };
            }

            const passwordMatch = await this.checkPassword(plainpassword, user.password);
            if (!passwordMatch) {
                throw { error: "Incorrect Password!" };
            }

            const token = this.createToken({ email: user.email, id: user.id });
            return token;

        } catch (error) {
            console.error("Sign-in error:", error);
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if (!response) {
                throw new Error('Invalid Token!');
            }

            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw new Error('User not found');
            }
            return {
                id: user.id,
                email: user.email
            };

        } catch (error) {
            console.error("Token authentication error:", error);
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
