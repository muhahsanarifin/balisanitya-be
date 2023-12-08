const model = require("../models/auth");

module.exports = {
  login: async (req, res) => {
    try {
      const response = await model.login(req.userData);
      res.status(201).json({
        status: "Ok",
        data: response.rows[0],
        msg: "Success login",
      });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      await model.register(req.body);
      res.status(201).json({
        status: "Ok",
        msg: "Success create",
      });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  logout: (req, res) => {
    Promise.allSettled([
      model.logout(req.userPayload),
      model.lastActiveAt(req.userPayload),
    ])
      .then((response) => {
        res
          .status(200)
          .json({ ...JSON.parse(response[0].value), status: "Ok" });
      })
      .catch((error) => {
        res.status(500).json({
          status: "Server Error",
          msg: error.message,
        });
      });
  },
};
