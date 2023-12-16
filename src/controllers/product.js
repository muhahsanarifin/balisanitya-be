const model = require("../models/product");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const response = await model.createProduct(req.body);

      res.status(201).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  getProductsView: async (req, res) => {
    try {
      const response = await model.getProductsView(req.query);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  getProductView: async (req, res) => {
    try {
      const response = await model.getProductView(req.params);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  updateProductView: async (req, res) => {
    try {
      const previousProductViewData = await model.getProductView(req.params);

      const response = await model.updateProductView(
        req.body,
        req.params,
        JSON.parse(previousProductViewData)
      );
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
  deleteProductView: async (req, res) => {
    try {
      const response = await model.deleteProductView(req.params);
      res.status(200).json({ ...JSON.parse(response), status: "Ok" });
    } catch (error) {
      res.status(500).json({
        status: "Server Error",
        msg: error.message,
      });
    }
  },
};
