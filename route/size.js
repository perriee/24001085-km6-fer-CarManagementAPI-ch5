const express = require("express");
const router = express.Router();

const sizeController = require("../controller/size");

router.route("/").get(sizeController.getSizes).post(sizeController.createSize);

router
    .route("/:id")
    .get(sizeController.getSize)
    .put(sizeController.updateSize)
    .delete(sizeController.deleteSize);

module.exports = router;
