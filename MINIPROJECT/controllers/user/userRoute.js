const express = require('express');
const userRouter = express.Router();
const userController = require('./userController');
const userValidate = require("./userValidate")
const { validateHandler } = require("../../lib/helper")


userRouter.post("/signUp", [userValidate.signUp, validateHandler, userController.signUp]);
userRouter.get("/verify", userController.verify);
userRouter.post("/login", [userValidate.login, validateHandler, userController.login]);


module.exports = userRouter;