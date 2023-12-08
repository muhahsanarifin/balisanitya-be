const query = {
  createProfile: (values) => {
    return {
      text: "INSERT INTO profile (id) VALUES ($1)",
      values: values,
    };
  },
  getProfile: (values) => {
    return {
      text: "SELECT p.id, p.full_name, u.bu_id, u.bu_email, u.username, u.bu_role, u.is_verify FROM users u LEFT JOIN profile p ON p.id = u.id WHERE u.id = $1 ",
      values: values,
    };
  },
  getUserName: (values) => {
    return {
      text: "SELECT * FROM users WHERE username = $1 ",
      values: values,
    };
  },
  updateProfile: (values) => {
    return {
      text: "UPDATE profile SET full_name = $2, update_at = $3 WHERE id = $1",
      values: values,
    };
  },
  deleteAccount: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  statusAccount: (values) => {
    return {
      text: "UPDATE users SET is_verify = $2 WHERE id = $1",
      values: values,
    };
  },
  getEmail: (values) => {
    return {
      text: "SELECT * FROM users WHERE bu_email = $1",
      values: values,
    };
  },
};

module.exports = query;
