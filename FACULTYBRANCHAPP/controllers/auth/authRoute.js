const express = require("express");
const authRouter = express.Router();
const authValidate = require("./authValidate");
const {validateHandler}  = require("../../lib/helper");

const authController = require('./authController');

authRouter.post("/signup", [authValidate.signUp , validateHandler, authController.signUp]);
authRouter.post("/login", [ authValidate.login , validateHandler, authController.login]);


module.exports = authRouter;