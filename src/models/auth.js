const db = require("../db/index");
const auth = require("../db/auth");
const user = require("../db/user");
const { hash } = require("../helpers/password");
const { v4: uuidv4 } = require("uuid");
const jwt = require("../helpers/jsonwebtoken");
const email = require("../helpers/email");

module.exports = {
  register: async (body) => {
    const { username, bu_email, bu_password, bu_role } = body;

    const hashPassword = await hash(bu_password, 16); // Hash password

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

    await db.query(user.createProfile([userResult.rows[0].id]));

    return userResult;
  },

  login: async (userData) => {
    const { id } = userData;

    const token = await jwt.token({ ...userData }, process.env.JWTPRIVATEKEY);

    const result = await db.query(auth.login([id, token, Date.now()]));

    return result;
  },

  logout: async (payload) => {
    await db.query(
      auth.logout("DELETE FROM log_login WHERE user_id = $1", [payload.id])
    );

    return JSON.stringify({ msg: "Success logout" });
  },

  getToken: async (bl_token) => {
    const result = await db.query(auth.getToken(bl_token));
    return result;
  },

  lastActiveAt: async (payload) => {
    await db.query(
      auth.logout("UPDATE users SET last_active_at = $2 WHERE bu_id = $1", [
        payload.bu_id,
        Date.now(),
      ])
    );

    return JSON.stringify({
      msg: `Success update last active user ${email.maskedEmail(
        payload.bu_email
      )}`,
    });
  },
};
