const db = require("../db/index");
const news = require("../db/news");
const { v4: uuidv4 } = require("uuid");
const value = require("../helpers/value");

const { usePreviousValue } = require("../helpers/value");

module.exports = {
  createNew: async (body) => {
    const { c_news_id, title, description, author } = body;
    const values = [
      uuidv4(),
      c_news_id,
      title,
      description,
      author,
      Date.now(),
    ];

    await db.query(news.createNew(values));
    return JSON.stringify({ msg: "Success create" });
  },
  getNews: async (query) => {
    const page = query.page;
    const limit = query.limit;
    const sort_by = query.sort_by;
    const order = query.order;
    const filter = query.title;

    const sorting =
      sort_by && order
        ? ` ORDER BY ${sort_by} ${order}`
        : " ORDER BY created_at DESC";

    const filtering = filter ? ` WHERE title ILIKE '%${filter}%'` : "";

    const pagination =
      page && limit
        ? ` LIMIT '${parseInt(limit)}' OFFSET '${
            (parseInt(page) - 1) * parseInt(limit)
          }'`
        : "";

    const result = await db.query(
      news.getNews("SELECT * FROM news" + filtering + sorting + pagination)
    );

    const data = await db.query(news.getNews("SELECT * FROM news"));

    if (result.rows.length < 1) {
      return JSON.stringify({ data: result.rows, msg: "Data does not exist" });
    }

    const metadata = {
      page: parseInt(page),
      result_per_page: parseInt(limit),
      total_results: parseInt(data.rowCount),
      total_pages: filter
        ? Math.ceil(parseInt(result.rowCount) / parseInt(limit))
        : Math.ceil(parseInt(data.rowCount) / parseInt(limit)),
    };

    return JSON.stringify({
      data: result.rows,
      metadata: { ...metadata },
      msg: "Data does exist",
    });
  },
  getNew: async (params) => {
    const result = await db.query(news.getNew([params.id]));

    if (result.rows.length < 1) {
      return JSON.stringify({ data: result.rows, msg: "Data does not exist" });
    }

    return JSON.stringify({ data: result.rows[0], msg: "Data does exist" });
  },
  updateNew: async (body, params, previousNewData) => {
    const { c_news_id, title, description, author } = body;

    body.c_news_id = usePreviousValue(
      c_news_id,
      previousNewData.data.c_news_id
    );

    body.title = usePreviousValue(title, previousNewData.data.title);

    body.description = usePreviousValue(
      description,
      previousNewData.data.description
    );

    body.author = usePreviousValue(author, previousNewData.data.author);

    await db.query(
      news.updateNew(
        "UPDATE news SET c_news_id = $2, title = $3, description = $4, author = $5, updated_at = $6 WHERE bun_id = $1",
        [
          params.id,
          body.c_news_id,
          body.title,
          body.description,
          body.author,
          Date.now(),
        ]
      )
    );

    return JSON.stringify({ msg: "Success update" });
  },
  deleteNew: async (params) => {
    await db.query(news.deleteNew([params.id]));
    return JSON.stringify({ msg: "Success delete" });
  },
  // It is used for validate value req.params.id
  getBunIdNews: async () => {
    const result = await db.query("SELECT bun_id FROM news");

    return result.rows;
  },
};
