const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticationMiddleware = async (req, res, next) => {
  try {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).send("Unauthorized");
    }

    const jwt = headers.authorization.split(" ")[1];

    const payload = jsonwebtoken.verify(jwt, process.env.JWT_KEY);

    const user = await User.findOne({ _id: payload._id });

    if (!user) {
      return res.status(401).send("Unauthorized");
    }
  } catch (e) {
    return res.status(401).send(e);
  }
  next();
};

module.exports = authenticationMiddleware;
