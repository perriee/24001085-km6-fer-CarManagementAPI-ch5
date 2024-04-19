const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controller/auth");
const { createAdmin } = require("../controller/admin/auth");
const { authMiddleware } = require("../middleware/auth");

// admin
router.post("/admin", authMiddleware(["superadmin"]), createAdmin);

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware(["user", "admin", "superadmin"]), profile);

module.exports = router;
