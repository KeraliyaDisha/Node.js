const express = require('express');
const likeRouter = express.Router();

const likeController = require('./likeController');

likeRouter.post('/create', likeController.create);
likeRouter.delete('/delete/:id', likeController.delete)


module.exports = likeRouter;