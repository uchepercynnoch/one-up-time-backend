const updateUser = require("./handlers/userRouteHandler");
const createThumbnail = require("./handlers/imageRouteHandler");
const loginUser = require("./handlers/authenticationRouteHandler");

const endpoints = [
  { name: "login", method: "post", path: "/login", handler: loginUser },
  {
    name: "createThumbnail",
    method: "post",
    path: "/thumbnails",
    handler: createThumbnail,
  },
  {
    name: "updateUser",
    method: "patch",
    path: "/users/:id",
    handler: updateUser,
  },
];

module.exports = endpoints;
