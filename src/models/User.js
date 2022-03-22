const jsonwebtoken = require("jsonwebtoken");
const { mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  username: mongoose.SchemaTypes.String,
  password: mongoose.SchemaTypes.String,
});

Schema.methods.generateToken = function () {
  return jsonwebtoken.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const User = mongoose.model("User", Schema);

module.exports.User = User;
