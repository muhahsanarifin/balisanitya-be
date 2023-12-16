const express = require("express");

const mainRouter = express.Router();
const newsRouter = require("../routes/news");
const authRouter = require("../routes/auth");
const captchaRouter = require("../routes/captcha");
const userRouter = require("../routes/user");
const categoryRouter = require("../routes/category");
const productRouter = require("../routes/product");

mainRouter.use("/auth", authRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/captcha", captchaRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/products", productRouter);

mainRouter.use("/balisanitya-api", (req, res) => {
  res.send("Welcome to Balisanitya API 🖐.");
});

mainRouter.use("*", (req, res) => {
  res.status(400).json({
    status: "Not Found",
    msg: "Server cannot find your requested resource",
  });
});

module.exports = mainRouter;
