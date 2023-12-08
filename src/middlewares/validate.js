const { getBunIdNews } = require("../models/news");

const body = (...allowedKeys) => {
  return (req, res, next) => {
    const { body } = req;

    if (!body || Object.keys(body).length === 0) {
      res.status(400).json({
        status: "Bad Request",
        msg: "Request body is missing",
      });
    }

    const sanitizedKey = Object.keys(body).filter((key) =>
      allowedKeys.includes(key)
    );

    const newBody = {};
    for (let key of sanitizedKey) {
      Object.assign(newBody, {
        [key]:
          typeof body[key] === "string" ? body[key].trimStart() : body[key],
      });
    }

    req.body = newBody;

    next();
  };
};

const params = async (req, res, next) => {
  const bunIdNews = await getBunIdNews();

  if (!bunIdNews.map((value) => value.bun_id).includes(req.params.id)) {
    return res.status(400).json({
      status: "Bad request",
      msg: "Value of (id) key path variable does not exist",
    });
  }

  next();
};

module.exports = {
  params,
  body,
};
