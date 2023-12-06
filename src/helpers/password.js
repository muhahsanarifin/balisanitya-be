const bcrypt = require("bcrypt");

module.exports = {
  hash: async (myPlaintextPassword, saltRounds) => {
    return await bcrypt.hash(myPlaintextPassword, saltRounds);
  },
  match: async (myPlaintextPassword, hash) => {
    return await bcrypt.compare(myPlaintextPassword, hash);
  },
};
