const axios = require("axios");

axios.defaults.headers.post["content-type"] = "application/json";
axios.defaults.headers.get["accept"] = "application/json";
axios.defaults.timeout = 60000;

module.exports = axios;
