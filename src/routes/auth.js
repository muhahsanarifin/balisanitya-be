const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
const check = require("../middlewares/check");

router.post("/register", check.register, controller.register);
router.post("/login", check.login, controller.login);
router.delete("/logout", check.access, controller.logout);

module.exports = router;
