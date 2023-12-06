const model = require("../models/auth");

module.exports = {
  login: async (req, res) => {
    try {
      const response = await model.login(req.userData);
      res.status(201).json({
        data: response.rows[0],
        msg: "Success login",
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }
      const response = JSON.parse(error);
      res.status(500).json({
        ...response,
      });
    }
  },
  register: async (req, res) => {
    try {
      await model.register(req.body);
      res.status(201).json({
        msg: "Success create",
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }
      const response = JSON.parse(error);
      res.status(500).json({
        ...response,
      });
    }
  },
  logout: async (req, res) => {
    try {
      await model.logout(req.userPayload);

      res.status(200).json({
        msg: "Success logout",
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }
      const response = JSON.parse(error);
      res.status(500).json({
        ...response,
      });
    }
  },
};
