const jwt = require("jsonwebtoken");

const token = async (payload, privateKey) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ ...payload }, privateKey, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        return reject(JSON.stringify(err));
      }
      return resolve(token);
    });
  });
};

const decode = async (token, privateKey) => {
  return Promise.resolve(jwt.verify(token, privateKey));
};

module.exports = {
  token,
  decode,
};
