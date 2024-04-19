const express = require('express');
const facultyController = require('./facultyController');
const facultyRouter = express.Router();
const facultyValidate = require('./facultyValidate');

const { validateHandler } = require("../../lib/helper")

facultyRouter.post("/create", [facultyValidate.create, validateHandler, facultyController.create]);
facultyRouter.get("/getAll", facultyController.getAll);
facultyRouter.get("/getById/:id", facultyController.getById);
facultyRouter.put("/update/:id",facultyController.update);
facultyRouter.delete("/delete/:id",facultyController.delete);



module.exports = facultyRouter;