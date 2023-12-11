const express = require("express");
const router = express.Router();

const controller = require("../controllers/category");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

router.post(
  "/news/create",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.body("cn_name"),
  controller.createCNew
);
router.get("/news", controller.getCNews);
router.patch(
  "/news/update/:id",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.params.category,
  validate.body("cn_name"),
  controller.updateCNew
);
router.delete(
  "/news/:id",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.params.category,
  controller.deleteCNew
);

module.exports = router;
