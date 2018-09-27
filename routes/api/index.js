const router = require("express").Router();
const exerciseRoutes = require("./exercise");

// Exercise routes
router.use("/exercises", exerciseRoutes);

module.exports = router;
