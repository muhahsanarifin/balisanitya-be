const express = require("express");
const router = express.Router();
const controller = require("../controllers/captcha");

router.post("/verify", controller.captcha);

module.exports = router;
