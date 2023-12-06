const query = {
  createProfile: (values) => {
    return {
      text: "INSERT INTO profile (id) VALUES ($1)",
      values: values,
    };
  },
  getProfile: (values) => {
    return {
      text: "",
      values: values,
    };
  },
  updateProfile: (values) => {
    return {
      text: "",
      values: values,
    };
  },
  deleteAccount: (values) => {
    return {
      text: "",
      values: values,
    };
  },
  statusAccount: (values) => {
    return {
      text: "",
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
