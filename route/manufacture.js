const express = require("express");
const router = express.Router();

const manufactureController = require("../controller/manufacture");

router.route("/").get(manufactureController.getManufactures);

// router
//     .route("/:id")
//     .get(classController.getClass)
//     .put(classController.updateClass)
//     .delete(classController.deleteClass);

module.exports = router;
