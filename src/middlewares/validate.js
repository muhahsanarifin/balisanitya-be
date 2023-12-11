const { getBunIdNews, getTitleNews } = require("../models/news");
const { getIdCNews } = require("../models/category");

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

const duplicate = {
  body: async (req, res, next) => {
    const titleNews = await getTitleNews(req.body);

    if (
      titleNews
        .map((value) => value.title.toLowerCase())
        .includes(req.body.title.toLowerCase())
    ) {
    return res.status(400).json({
        status: "Bad request",
        msg: `(${req.body.title}), The title already exists`,
      });
    }
    next();
  },
};

const news = async (req, res, next) => {
  const bunIdNews = await getBunIdNews(req.params);

  if (!bunIdNews.map((value) => value.bun_id).includes(req.params.id)) {
    return res.status(400).json({
      status: "Bad request",
      msg: "Value of (id) key path variable does not exist",
    });
  }

  next();
};

const category = async (req, res, next) => {
  const idCNews = await getIdCNews(req.params);

  if (!idCNews.map((value) => value.id).includes(+req.params.id)) {
    return res.status(400).json({
      status: "Bad request",
      msg: "Value of (id) key path variable does not exist",
    });
  }

  next();
};

const params = {
  news,
  category,
};

module.exports = {
  duplicate,
  params,
  body,
};
