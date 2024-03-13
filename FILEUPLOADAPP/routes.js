const express = require("express");
const router = express.Router();

router.use("/upload", require("./routes/fileUpload"));


module.exports = router;