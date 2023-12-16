const express = require("express");
const router = express.Router();

const controller = require("../controllers/product");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

router.post(
  "/create",
  [
    check.access,
    check.allowedByRoles(["admin", "owner"]),
    validate.body("title", "description"),
  ],
  controller.createProduct
);
router.get("/", controller.getProductsView);
router.get("/:id", controller.getProductView);
router.patch(
  "/update/:id",
  [
    check.access,
    check.allowedByRoles(["admin", "owner"]),
    validate.body("title", "description"),
  ],
  controller.updateProductView
);
router.delete(
  "/delete/:id",
  [check.access, check.allowedByRoles(["admin", "owner"])],
  controller.deleteProductView
);

module.exports = router;
