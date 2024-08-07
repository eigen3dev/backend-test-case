const express = require("express");
const AuthController = require("../../controllers/Auth/AuthController");
const { validateUserLogin } = require("../../validators/Auth/AuthValidation");
const authenticateToken = require("../../middlewares/AuthMiddleware");

// Auth Route

const router = express.Router();

router.post("/login", validateUserLogin, AuthController.login);
router.post("/logout", authenticateToken, AuthController.logout);

module.exports = router;
