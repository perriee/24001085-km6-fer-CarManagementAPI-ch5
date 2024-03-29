const express = require("express");
const router = express.Router();

const manufacture = require("./manufacture");
const size = require("./size");
const type = require("./type");

router.use("/manufactures", manufacture);
router.use("/sizes", size);
router.use("/types", type);

module.exports = router;
