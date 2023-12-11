module.exports = {
  createCNew: (values) => {
    return {
      text: "INSERT INTO c_news (cn_name, created_at) VALUES ($1, $2)",
      values: values,
    };
  },
  getCNews: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  updateCNew: (values) => {
    return {
      text: "UPDATE c_news SET cn_name = $2, updated_at = $3 WHERE id = $1",
      values: values,
    };
  },
  deleteCNew: (values) => {
    return {
      text: "DELETE FROM c_news WHERE id = $1",
      values: values,
    };
  },
  getIdCNews: (values) => {
    return {
      text: "SELECT id from c_news WHERE id = $1",
      values: values,
    };
  },
};
