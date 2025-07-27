const express = require('express');
const UserController = require('../../controllers/user-controller');

const router = express.Router();

router.post('/user/signup', UserController.create);
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.remove);
router.post('/user/signin', UserController.signIn);

module.exports = router;
