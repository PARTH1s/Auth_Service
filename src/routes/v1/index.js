const express = require('express');
const UserController = require('../../controllers/user-controller');
const AuthRequestValidatorMiddleware = require('../../middlewares/index');

const router = express.Router();

router.post('/user/signup',AuthRequestValidatorMiddleware.validateUserAuth, UserController.create);
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.remove);
router.post('/user/signin', UserController.signIn);
router.post('/user/isAuthenticated', UserController.isAuthenticated);

module.exports = router;
