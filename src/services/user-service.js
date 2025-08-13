const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository(); // Initialize user repository
  }

  async create(data) {
    // Create a new user
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      console.error("Service Layer Error - create:", error);
      throw error;
    }
  }

  createToken(user) {
    // Generate JWT token for a user
    try {
      return jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
    } catch (error) {
      console.error("Token creation error:", error);
      throw error;
    }
  }

  verifyToken(token) {
    // Verify JWT token
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  }

  checkPassword(inputPassword, hashedPassword) {
    // Compare plain password with hashed password
    try {
      return bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      console.error("Password comparison error:", error);
      throw error;
    }
  }

  isAdmin(userId) {
    // Check if the user has admin role
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.error("Service Layer Error - isAdmin:", error);
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    // Sign in a user and return JWT token
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) throw { error: "User not found!" };

      const passwordMatch = await this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) throw { error: "Incorrect Password!" };

      return this.createToken({ email: user.email, id: user.id });
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    // Validate token and return authenticated user info
    try {
      const decoded = this.verifyToken(token);
      if (!decoded) throw new Error("Invalid Token!");

      const user = await this.userRepository.getById(decoded.id);
      if (!user) throw new Error("User not found");

      return { id: user.id, email: user.email };
    } catch (error) {
      console.error("Token authentication error:", error);
      throw error;
    }
  }

  async getById(userId) {
    // Get user by ID
    try {
      return await this.userRepository.getById(userId);
    } catch (error) {
      console.error("Service Layer Error - getById:", error);
      throw error;
    }
  }

  async getByEmail(email) {
    // Get user by email
    try {
      return await this.userRepository.getByEmail(email);
    } catch (error) {
      console.error("Service Layer Error - getByEmail:", error);
      throw error;
    }
  }

  async getAll() {
    // Get all users
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      console.error("Service Layer Error - getAll:", error);
      throw error;
    }
  }

  async update(userId, data) {
    // Update user by ID
    try {
      return await this.userRepository.update(userId, data);
    } catch (error) {
      console.error("Service Layer Error - update:", error);
      throw error;
    }
  }

  async delete(userId) {
    // Delete user by ID
    try {
      return await this.userRepository.delete(userId);
    } catch (error) {
      console.error("Service Layer Error - delete:", error);
      throw error;
    }
  }
}

module.exports = UserService;
