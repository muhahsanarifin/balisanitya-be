const express = require("express");
const router = express.Router();

const controller = require("../controllers/news");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

router.post(
  "/create",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.body("c_news_id", "title", "description", "author"),
  controller.createNew
);
router.get("/", controller.getNews);
router.get("/:id", controller.getNew);
router.patch(
  "/update/:id",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.params,
  validate.body("c_news_id", "title", "description", "author"),
  controller.updateNew
);
router.delete(
  "/delete/:id",
  check.access,
  check.allowedByRoles(["admin", "owner"]),
  validate.params,
  controller.deleteNew
);

module.exports = router;
