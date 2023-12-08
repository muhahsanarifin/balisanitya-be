const db = require("../db/index");
const user = require("../db/user");

module.exports = {
  getProfile: async (payload) => {
    const result = await db.query(user.getProfile([payload.id]));
    return result;
  },

  getUserName: async (body) => {
    const result = await db.query(user.getUserName([body.username]));
    return result;
  },

  updateProfile: async (body, payload) => {
    const { full_name } = body;

    const result = await db.query(
      user.updateProfile([payload.id, full_name, Date.now()])
    );
    return result;
  },

  deleteAccount: async (payload) => {
    await db.query(
      user.deleteAccount(
        "DELETE FROM log_login USING users WHERE users.id = users.id AND log_login.user_id = $1",
        [payload.id]
      )
    );

    await db.query(
      user.deleteAccount(
        "DELETE FROM profile USING users WHERE profile.id = users.id AND profile.id = $1",
        [payload.id]
      )
    );

    await db.query(
      user.deleteAccount("DELETE FROM users WHERE users.id = $1", [payload.id])
    );
    return JSON.stringify({ msg: "Success Delete" });
  },

  statusAccount: async (body, payload) => {
    await db.query(user.statusAccount([payload.id, body.is_verify]));
    return JSON.stringify({
      msg: `${payload.bu_email} is not active`,
    });
  },

  // This function is used for check email.
  getEmail: async (bu_email) => {
    const values = [bu_email];
    const result = await db.query(user.getEmail(values));
    return result;
  },
};
