const { getEmail, getUserName } = require("../models/user");
const { getToken } = require("../models/auth");
const { maskedEmail } = require("../helpers/email");
const password = require("../helpers/password");
const jwt = require("../helpers/jsonwebtoken");

module.exports = {
  register: async (req, res, next) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emailRegex.test(req.body.bu_email) === false) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Format email is wrong",
      });
    }

    const username = await getUserName(req.body);
    if (username.rows.length > 0) {
      return res.status(400).json({
        status: "Bad Request",
        msg: `username (${req.body.username}) has been registered`,
      });
    }

    const email = await getEmail(req.body.bu_email);
    if (email.rows.length > 0) {
      return res.status(400).json({
        status: "Bad Request",
        msg: `${maskedEmail(req.body.bu_email)} has been registered`,
      });
    }

    if (req.body.bu_password.length < 8) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Password at least eight characters",
      });
    }

    if (req.body.bu_password !== req.body.bu_confirmPassword) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Password does not match",
      });
    }

    next();
  },
  login: async (req, res, next) => {
    const result = await getEmail(req.body.bu_email);

    if (result.rows.length < 1) {
      return res.status(400).json({
        status: "Bad Request",
        msg: `${maskedEmail(req.body.bu_email)} is not registered`,
      });
    }

    if (result.rows[0].is_verify !== 1) {
      return res.status(400).json({
        status: "Bad Request",
        msg: `${maskedEmail(req.body.bu_email)} is not active`,
      });
    }

    const match = password.match(
      req.body.bu_password,
      result.rows[0].bu_password
    );

    if (!match) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Wrong password",
      });
    }

    req.userData = result.rows[0];

    next();
  },
  access: async (req, res, next) => {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      return res.status(403).json({
        status: "Forbidden",
        msg: "You have to login first!",
      });
    }

    const token = bearerToken.split(" ")[1];

    const checkToken = await getToken(token);
    if (checkToken.rows.length < 1) {
      return res.status(403).json({
        status: "Forbidden",
        msg: "You have to login first!",
      });
    }

    try {
      const decode = await jwt.decode(token, process.env.JWTPRIVATEKEY);

      const checkveriFy = await getEmail(decode.bu_email);

      if (checkveriFy.rows[0].is_verify !== 1) {
        return res.status(400).json({
          msg: `${maskedEmail(checkveriFy.rows[0].bu_email)} is not active`,
        });
      }

      req.userPayload = decode;

      next();
    } catch (error) {
      if (error && error.name) {
        return res.status(403).json({
          status: "Forbidden",
          msg: error.message,
        });
      }

      if (error) {
        return res.status(500).json({
          status: "Server Error",
          msg: error.message,
        });
      }
    }
  },

  allowedByRoles: (allowedRoles) => {
    return (req, res, next) => {
      const { bu_role } = req.userPayload;
      const hasAllowedRoles = allowedRoles.some((roles) =>
        roles.includes(bu_role)
      );

      if (hasAllowedRoles) {
        next();
      } else {
        res.status(403).json({
          status: "Forbidden",
          msg: "Access denied",
        });
      }
    };
  },
};
