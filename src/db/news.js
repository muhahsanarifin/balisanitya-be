module.exports = {
  createNew: (values) => {
    return {
      text: "INSERT INTO news (bun_id, c_news_id, title, description, author, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      values: values,
    };
  },
  getNews: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getNew: (values) => {
    return {
      text: "SELECT * FROM news WHERE bun_id = $1",
      values: values,
    };
  },
  updateNew: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  deleteNew: (values) => {
    return {
      text: "DELETE FROM news WHERE bun_id = $1",
      values: values,
    };
  },
  getBunIdNews: (values) => {
    return {
      text: "SELECT bun_id from news WHERE bun_id = $1",
      values: values,
    };
  },
  getTitleNews: (values) => {
    return {
      text: "SELECT title from news WHERE title = $1",
      values: values,
    };
  },
};
