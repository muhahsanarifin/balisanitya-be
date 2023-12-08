const model = require("../models/news");

module.exports = {
  createNew: async (req, res) => {
    try {
      const response = await model.createNew(req.body);
      res.status(201).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  getNews: async (req, res) => {
    try {
      const response = await model.getNews(req.query);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  getNew: async (req, res) => {
    try {
      const response = await model.getNew(req.params);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  updateNew: async (req, res) => {
    try {
      const previousNewData = await model.getNew(req.params);

      const response = await model.updateNew(
        req.body,
        req.params,
        JSON.parse(previousNewData)
      );
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  deleteNew: async (req, res) => {
    try {
      const response = await model.deleteNew(req.params);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
};
