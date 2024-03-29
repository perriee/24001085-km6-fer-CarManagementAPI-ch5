const express = require("express");
const router = express.Router();

const manufacture = require("./manufacture");

router.use("/manufacture", manufacture);

module.exports = router;
