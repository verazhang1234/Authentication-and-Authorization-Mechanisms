const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 定义 /login 路由
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
