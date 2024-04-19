const express = require("express");
const router = express.Router();

const typeController = require("../controller/type");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(["user", "admin", "superadmin"]), typeController.getTypes)
    .post(authMiddleware(["admin", "superadmin"]), typeController.createType);

router
    .route("/:id")
    .get(authMiddleware(["user", "admin", "superadmin"]), typeController.getType)
    .put(authMiddleware(["admin", "superadmin"]), typeController.updateType)
    .delete(authMiddleware(["admin", "superadmin"]), typeController.deleteType);

module.exports = router;
