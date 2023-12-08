const query = {
  login: (values) => {
    return {
      text: "INSERT INTO log_login (user_id, bl_token, login_at) VALUES ($1, $2, $3) RETURNING *",
      values: values,
    };
  },
  register: (values) => {
    return {
      text: "INSERT INTO users (username, bu_email, bu_password, bu_role, bu_id, created_at, is_verify) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: values,
    };
  },
  logout: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getToken: (values) => {
    return {
      text: "SELECT * FROM log_login WHERE bl_token =" +` '${values}'`,
    };
  },
};

module.exports = query;
