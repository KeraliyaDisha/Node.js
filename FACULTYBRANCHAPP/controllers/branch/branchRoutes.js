const express = require('express');
const branchRouter = express.Router();
const branchValidate = require('./branchValidate');
const { validateHandler } = require("../../lib/helper")

const branchController = require("./branchController");

branchRouter.post("/create", [branchValidate.create, validateHandler, branchController.create]);
branchRouter.get("/getAll", branchController.getAll);
branchRouter.get("/getById/:id", branchController.getById);
branchRouter.put("/update/:id", branchController.update);
branchRouter.delete("/delete/:id", branchController.delete);



module.exports = branchRouter;