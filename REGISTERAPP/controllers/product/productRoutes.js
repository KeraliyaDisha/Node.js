const express = require("express");
const productController = require("./productController");
const productValidate = require('./productValidate');
const productRouter = express.Router();

const { validateHandler } =  require("../../lib/helper")

productRouter.post("/create",[productValidate.create, validateHandler, productController.create]);
productRouter.get("/getAll", [productController.getAll]);
productRouter.put("/update/:id",[productValidate.paramId, validateHandler, productController.update]);
productRouter.delete("/delete/:id", [productValidate.paramId, validateHandler, productController.delete]);
productRouter.get("/get/byCategoryId", [productController.getBycategoryId]);


module.exports = productRouter;