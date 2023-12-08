const { verify } = require("hcaptcha");

module.exports = {
  captcha: async (body) => {
    const { secret, token } = body;

    const result = await verify(secret, token);
    if (result.sucess !== true) {
      throw JSON.stringify({ msg: "verification failed" });
    }
    return result;
  },
};
