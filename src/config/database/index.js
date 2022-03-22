const { mongoose } = require("mongoose");

const settings = require("./settings");
const { url } = settings[process.env.NODE_ENV];

const database = {
  init: async () => {
    return mongoose.connect(url);
  },
};

module.exports = database;
