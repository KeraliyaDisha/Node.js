const express = require('express');
const router = express.Router();
const userMiddleware = require("./middleware/user")

router.use("/user", require('./controllers/user/userRoute'));
router.use("/post", userMiddleware, require('./controllers/post/postRoute'));
router.use("/like", userMiddleware, require('./controllers/like/likeRoute'));
router.use("/comment", userMiddleware, require('./controllers/comment/commentRoute'));

router.use("/", require('./controllers/user/userRoute'));

module.exports = router;