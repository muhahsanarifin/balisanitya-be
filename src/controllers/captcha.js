const model = require("../models/captcha");

module.exports = {
  captcha: async (req, res) => {
    try {
      const response = await model.captcha(req.body);
      res.status(200).json({
        status: "Ok",
        data: response,
        msg: "Verified",
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
