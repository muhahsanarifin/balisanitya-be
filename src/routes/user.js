const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

router.get(
  "/profile",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  controller.getProfile
);
router.patch(
  "/profile/update",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.body("full_name"),
  controller.updateProfile
);
router.delete(
  "/account/delete",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  controller.deleteAccount
);
router.patch(
  "/account/status/update",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  controller.statusAccount
);

module.exports = router;
