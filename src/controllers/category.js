const model = require("../models/category");

module.exports = {
  createCNew: async (req, res) => {
    try {
      const response = await model.createCNews(req.body);
      res.status(201).json({
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
  getCNews: async (req, res) => {
    try {
      const response = await model.getCNews(req.query);

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
  updateCNew: async (req, res) => {
    try {
      const response = await model.updateCNew(req.body, req.params);
      
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
  deleteCNew: async (req, res) => {
    try {
      const response = await model.deleteCNews(req.params);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
};
