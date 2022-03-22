const isObjectEmpty = require("../utils/isObjectEmpty");
const { User } = require("../models/User");

class AuthenticationController {
  static async login(req) {
    try {
      const credentials = req.body;

      if (isObjectEmpty(credentials))
        return Promise.reject({
          code: 400,
          message: "Request body must not be empty",
        });

      const usernameExist = Object.keys(credentials).includes("username");
      const passwordExist = Object.keys(credentials).includes("password");

      if (!usernameExist && !passwordExist)
        return Promise.reject({
          code: 400,
          message: "Username and password are required",
        });

      const username = credentials.username;
      const password = credentials.password;

      if (username.length === 0)
        return Promise.reject({
          code: 400,
          message: "Username cannot be empty",
        });

      if (password.length === 0)
        return Promise.reject({
          code: 400,
          message: "Password cannot be empty",
        });

      //create user with credentials
      const user = await User.create(credentials);

      return user.generateToken();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

module.exports = AuthenticationController;
