const express = require('express');
const UserController = require('../../controllers/user-controller');
const RolesController = require('../../controllers/roles-controller');
const AuthRequestValidator = require('../../middlewares/index');

const router = express.Router();

/* =====================
      User Routes
===================== */
// Signup user
router.post('/user/signup', AuthRequestValidator.validateUserAuth, UserController.create);

// Check if user is admin
router.post('/user/isAdmin', AuthRequestValidator.validateisAdminUserRequest, UserController.isAdmin);

// Get all users
router.get('/user', UserController.getAll);

// Get a user by ID
router.get('/user/:id', UserController.getById);

// Update a user
router.put('/user/:id', UserController.update);

// Delete a user
router.delete('/user/:id', UserController.remove);

// User signin
router.post('/user/signin', UserController.signIn);

// Check user authentication
router.post('/user/isAuthenticated', UserController.isAuthenticated);

/* =====================
      Role Routes
===================== */
// Create a role
router.post('/role', RolesController.create);

// Get all roles
router.get('/role', RolesController.getAll);

// Get role by ID
router.get('/role/:id', RolesController.getById);

// Get role by name
router.get('/role/name/:name', RolesController.getByName);

// Update a role
router.put('/role/:id', RolesController.update);

// Delete a role
router.delete('/role/:id', RolesController.remove);

module.exports = router;
