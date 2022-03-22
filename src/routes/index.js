const express = require("express");
const endpoints = require("./endpoints");
const errorAsyncMiddleware = require("../middleware/errorAsyncMiddleware");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const routes = express.Router();

endpoints.forEach((route) => {
  if (route.name !== "login") {
    routes[route.method](
      route.path,
      authenticationMiddleware,
      errorAsyncMiddleware(route.handler)
    );
  } else routes[route.method](route.path, errorAsyncMiddleware(route.handler));
});

module.exports = routes;
