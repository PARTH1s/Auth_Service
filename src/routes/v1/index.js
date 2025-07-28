const express = require('express');
const UserController = require('../../controllers/user-controller');
const RolesController = require('../../controllers/roles-controller');

const AuthRequestValidatorMiddleware = require('../../middlewares/index');

const router = express.Router();

router.post('/user/signup',AuthRequestValidatorMiddleware.validateUserAuth, UserController.create);
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.remove);
router.post('/user/signin', UserController.signIn);
router.post('/user/isAuthenticated', UserController.isAuthenticated);

router.post('/role', RolesController.create);
router.get('/role', RolesController.getAll);
router.get('/role/:id', RolesController.getById);
router.get('/role/name/:name', RolesController.getByName);
router.put('/role/:id', RolesController.update);
router.delete('/role/:id', RolesController.remove);


module.exports = router;
