const db = require("../db/index");
const product = require("../db/product");
const { v4: uuidv4 } = require("uuid");
const { usePreviousValue } = require("../helpers/value");

module.exports = {
  createProduct: async (body) => {
    const { title, description } = body;

    const result = await db.query(
      product.createProduct([uuidv4(), title, description, Date.now()])
    );

    await db.query(
      product.createProductView([...Object.values(result.rows[0])])
    );

    return JSON.stringify({ msg: "Success create" });
  },
  getProductsView: async (query) => {
    const page = query.page;
    const limit = query.limit;
    const sort_by = query.sort_by || "created_at";
    const order = query.order || "DESC";
    const title = query.title || "";

    const filtering = title && ` WHERE title ILIKE '%${title}%'`;

    const pagination =
      page && limit
        ? ` LIMIT '${parseInt(limit)}' OFFSET '${
            (parseInt(page) - 1) * parseInt(limit)
          }'`
        : "";

    const result = await db.query(
      product.getProductViews(
        "SELECT * FROM services_view" +
          filtering +
          " ORDER BY" +
          ` ${sort_by}` +
          ` ${order}` +
          pagination
      )
    );

    const data = await db.query(
      product.getProductViews("SELECT * FROM services_view")
    );

    if (result.rows.length < 1) {
      return JSON.stringify({ data: result.rows, msg: "Data does not exist" });
    }

    const metadata = {
      page: parseInt(page),
      result_per_page: parseInt(limit),
      total_results: parseInt(data.rowCount),
      total_pages: title
        ? Math.ceil(parseInt(result.rowCount) / parseInt(limit))
        : Math.ceil(parseInt(data.rowCount) / parseInt(limit)),
    };

    return JSON.stringify({
      data: result.rows,
      metadata: { ...metadata },
      msg: "Data does exist",
    });
  },

  getProductView: async (params) => {
    const result = await db.query(product.getProductView([params.id]));

    if (result.rows.length < 1) {
      return JSON.stringify({ data: result.rows, msg: "Data does not exist" });
    }

    return JSON.stringify({ data: result.rows[0], msg: "Data does exist" });
  },
  updateProductView: async (body, params, previousProductViewData) => {
    const { title, description } = body;

    body.title = usePreviousValue(title, previousProductViewData.data.title);
    body.description = usePreviousValue(
      description,
      previousProductViewData.data.description
    );

    await db.query(
      product.updateProductView([
        params.id,
        body.title,
        body.description,
        Date.now(),
      ])
    );

    return JSON.stringify({ msg: "Success update" });
  },
  deleteProductView: async (params) => {
    await db.query(product.deleteProductView([params.id]));
    return JSON.stringify({ msg: "Success delete" });
  },
};
