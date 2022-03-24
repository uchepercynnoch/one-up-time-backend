const jsonpatch = require("jsonpatch");
const { mongoose } = require("mongoose");

const isObjectEmpty = require("../utils/isObjectEmpty");
const { User } = require("../models/User");

class UserController {
  static async updateUser(req) {
    try {
      const id = req.params.id;
      const patch = req.body;

      if (isObjectEmpty(patch))
        return Promise.reject({
          code: 400,
          message: "Request body cannot be empty",
        });

      if (!mongoose.Types.ObjectId.isValid(id))
        return Promise.reject({
          code: 400,
          message: "Id is invalid",
        });

      const user = await User.findById(id).exec();

      if (!user)
        return Promise.reject({
          code: 404,
          message: "Id not found",
        });

      const _user = {
        username: user.username, //Use object literal because result from 'user' query is immutable
        password: user.password,
      };

      const patchedUser = jsonpatch.apply_patch(_user, patch);

      await User.findByIdAndUpdate(id, patchedUser).exec();

      return await User.findById(id, "username password").exec();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

module.exports = UserController;
