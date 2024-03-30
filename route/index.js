const express = require("express");
const router = express.Router();

const manufacture = require("./manufacture");
const size = require("./size");
const type = require("./type");
const transmission = require("./transmission");
const car = require("./car");

router.use("/manufactures", manufacture);
router.use("/sizes", size);
router.use("/types", type);
router.use("/transmissions", transmission);
router.use("/cars", car);

module.exports = router;
