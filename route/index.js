const express = require("express");
const router = express.Router();

const manufacture = require("./manufacture");
const size = require("./size");
const type = require("./type");
const transmission = require("./transmission");

router.use("/manufactures", manufacture);
router.use("/sizes", size);
router.use("/types", type);
router.use("/transmissions", transmission);

module.exports = router;
