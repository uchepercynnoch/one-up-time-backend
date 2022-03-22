const { mongoose } = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    url: mongoose.SchemaTypes.String,
  })
);

module.exports.Image = Image;
