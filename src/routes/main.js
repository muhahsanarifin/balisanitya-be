const express = require("express");

const mainRouter = express.Router();
const newsRouter = require("../routes/news");
const authRouter = require("../routes/auth");
const captchaRouter = require("../routes/captcha");
const userRouter = require("../routes/user");

mainRouter.use("/auth", authRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/captcha", captchaRouter);
mainRouter.use("/users", userRouter);

mainRouter.use("/", (req, res) => {
  res.send("Welcome to Balisanitya API 🖐.");
});

module.exports = mainRouter;
