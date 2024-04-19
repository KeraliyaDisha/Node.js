const express = require('express');
const commentRoute = express.Router();

const commentController = require('./commentController');

commentRoute.post('/create', commentController.create);
commentRoute.put('/update/:id', commentController.update);
commentRoute.delete('/delete/:id', commentController.delete);
commentRoute.get('/getByPostId', commentController.getByPostId);




module.exports = commentRoute;