const express = require("express");
const router = express.Router();

const manufacture = require("./manufacture");
const size = require("./size");

router.use("/manufactures", manufacture);
router.use("/sizes", size);

module.exports = router;
