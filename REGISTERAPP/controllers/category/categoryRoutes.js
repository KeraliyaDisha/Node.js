const express = require("express");
const categoryController = require("./categoryController");
const categoryValidate = require('./categoryValidate');

const categoryRouter = express.Router();
const { validateHandler } = require("../../lib/helper");


categoryRouter.post("/create",[categoryValidate.create, validateHandler, categoryController.create]);
categoryRouter.get("/getAll", categoryController.getAll);
categoryRouter.put("/update",categoryController.update);
categoryRouter.delete("/delete",categoryController.delete);
categoryRouter.get("/get/categoryId", categoryController.getByCategoryId);



module.exports = categoryRouter;


