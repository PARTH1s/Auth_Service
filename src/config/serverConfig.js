const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Load environment variables from .env file
dotenv.config();

module.exports = {
    // Server port
    PORT: process.env.PORT || 3000,

    // Salt for hashing passwords
    SALT: bcrypt.genSaltSync(10),

    // Secret key for JWT signing
    JWT_KEY: process.env.JWT_KEY
};
