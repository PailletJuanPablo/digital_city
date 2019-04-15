const express = require('express');

const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken').verifyAuth;
const loginRouter = express.Router();


loginRouter.post('/register',userController.signUp);
loginRouter.post('/login',userController.login);
loginRouter.get('/me', checkToken, userController.getuserData);
// Lo exportamos para usar en app.js
module.exports = loginRouter;
