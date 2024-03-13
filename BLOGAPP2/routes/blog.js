const express = require("express");
const router = express.Router();

// import controller
const {dummylink, likePost, unlikePost} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");
const {createPost, getAllPosts} = require("../controllers/postController");


// mapping create
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
router.get("/dummyroute", dummylink);



// exports
module.exports = router;