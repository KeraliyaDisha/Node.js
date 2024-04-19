const express = require("express")
const router = express.Router();
const authMiddleware = require("./middleware/auth")

router.use("/auth",  require("./controllers/auth/authRoute"));
router.use("/branch", authMiddleware, require("./controllers/branch/branchRoutes"));
router.use("/faculty", authMiddleware, require("./controllers/faculty/facultyRouter"));

module.exports = router;