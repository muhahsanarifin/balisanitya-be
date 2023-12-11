const db = require("../db/index");
const category = require("../db/category");

module.exports = {
  createCNews: async (body) => {
    await db.query(category.createCNew([body.cn_name, Date.now()]));
    return JSON.stringify({ msg: "Success create" });
  },
  getCNews: async (query) => {
    const page = query.page || "";
    const limit = query.limit || "";

    const pagination =
      page &&
      limit &&
      ` LIMIT '${parseInt(limit)}' OFFSET '${
        (parseInt(page) - 1) * parseInt(limit)
      }'`;

    const result = await db.query(
      category.getCNews(
        "SELECT * FROM c_news ORDER BY created_at DESC" + pagination
      )
    );

    if (result.rows.length < 1) {
      return JSON.stringify({ data: result.rows, msg: "Data does not exist" });
    }

    const metadata = {
      page: parseInt(page),
      result_per_page: parseInt(limit),
    };

    return JSON.stringify({
      data: result.rows,
      metadata: { ...metadata },
      msg: "Data does exist",
    });
  },
  updateCNew: async (body, params) => {
    await db.query(category.updateCNew([params.id, body.cn_name, Date.now()]));
    return JSON.stringify({ msg: "Success update" });
  },
  deleteCNews: async (params) => {
    await db.query(category.deleteCNew([params.id]));
    return JSON.stringify({ msg: "Success delete" });
  },
  // It is used for validate value req.params.id
  getIdCNews: async (params) => {
    const result = await db.query(category.getIdCNews([params.id]));
    return result.rows;
  },
};
