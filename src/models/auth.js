const db = require("../db/index");
const auth = require("../db/auth");
const user = require("../db/user");
const { hash } = require("../helpers/password");
const { v4: uuidv4 } = require("uuid");
const jwt = require("../helpers/jsonwebtoken");

module.exports = {
  register: async (body) => {
    const { username, bu_email, bu_password, bu_role } = body;

    const hashPassword = await hash(bu_password, 16); // Hash

    const userResult = await db.query(
      auth.register([
        username,
        bu_email,
        hashPassword,
        bu_role,
        uuidv4(),
        Date.now(),
        1,
      ])
    );
    if (!userResult) {
      throw JSON.stringify(userResult);
    }

    await db.query(user.createProfile([userResult.rows[0].id]));

    const result = userResult;

    return result;
  },

  login: async (userData) => {
    const { id } = userData;

    const token = await jwt.token({ ...userData }, process.env.JWTPRIVATEKEY);
    if (!token) {
      throw JSON.stringify(result);
    }

    const result = await db.query(auth.login([id, token, Date.now()]));
    if (!result) {
      throw JSON.stringify(result);
    }
    return result;
  },

  logout: async (payload) => {
    const result = await db.query(auth.logout([payload.id]));
    if (!result) {
      throw JSON.stringify(result);
    }
  },
  getToken: async (bl_token) => {
    const result = await db.query(auth.getToken(bl_token));
    if (!result) {
      throw JSON.stringify(result);
    }
    return result;
  },
};
