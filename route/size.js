const express = require("express");
const router = express.Router();

const sizeController = require("../controller/size");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(["user", "admin", "superadmin"]), sizeController.getSizes)
    .post(authMiddleware(["admin", "superadmin"]), sizeController.createSize);

router
    .route("/:id")
    .get(authMiddleware(["user", "admin", "superadmin"]), sizeController.getSize)
    .put(authMiddleware(["admin", "superadmin"]), sizeController.updateSize)
    .delete(authMiddleware(["admin", "superadmin"]), sizeController.deleteSize);

module.exports = router;
