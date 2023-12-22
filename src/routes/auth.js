const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

router.post(
  "/register",
  [
    validate.body("username", "bu_email", "bu_password", "bu_role"),
    check.register,
  ],
  controller.register
);
router.post(
  "/login",
  [validate.body("bu_email", "bu_password"), check.login],
  controller.login
);
router.delete("/logout", [check.access], controller.logout);

module.exports = router;
