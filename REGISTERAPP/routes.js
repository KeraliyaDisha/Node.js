const express = require("express");
const router = express.Router();
const authMiddleware= require("./middleware/auth");


router.use("/auth", require("./controllers/auth/auth.Routes"));

router.use("/categories", authMiddleware, require("./controllers/category/categoryRoutes"));
router.use("/products", authMiddleware, require("./controllers/product/productRoutes"));


module.exports = router;
