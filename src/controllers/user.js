const model = require("../models/user");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const response = await model.getProfile(req.userPayload);
      res.status(200).json({
        status: "Ok",
        data: response.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      await model.updateProfile(req.body, req.userPayload);
      res.status(200).json({
        status: "Ok",
        msg: "Success update",
      });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const response = await model.deleteAccount(req.userPayload);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  statusAccount: async (req, res) => {
    try {
      const response = await model.statusAccount(req.body, req.userPayload);
      res.status(200).json({
        ...JSON.parse(response),
        status: "Ok",
      });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
};
