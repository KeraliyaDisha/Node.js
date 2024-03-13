const express = require("express");
const authRouter = express.Router();
const authController = require('./auth.Controller');
const authValidate = require('./auth.Validate');

const { validateHandler } = require("../../lib/helper");

authRouter.post('/login', [ authValidate.login, validateHandler, authController.login]);
authRouter.post('/signup', [authValidate.signup, validateHandler, authController.signup]);


module.exports = authRouter;