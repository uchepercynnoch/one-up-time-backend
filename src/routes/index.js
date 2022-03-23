const express = require("express");
const endpoints = require("./endpoints");
const errorAsyncMiddleware = require("../middleware/errorAsyncMiddleware");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const routes = express.Router();

endpoints.forEach((route) => {
  switch (route.name) {
    case "createThumbnail":
    case "updateUser":
      routes[route.method](
        route.path,
        authenticationMiddleware,
        errorAsyncMiddleware(route.handler)
      );
      break;
    default:
      routes[route.method](route.path, errorAsyncMiddleware(route.handler));
  }
});

module.exports = routes;
