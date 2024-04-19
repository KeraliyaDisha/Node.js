const express = require('express');
const postRouter = express.Router();
const postController = require('./postController');


postRouter.post("/create", postController.create);
postRouter.get("/getall", postController.getAll);
postRouter.get("/getbyid/:id", postController.getById);
postRouter.put("/update/:id", postController.update);
postRouter.delete("/delete/:id", postController.delete);

module.exports = postRouter;