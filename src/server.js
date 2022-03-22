const express = require("express");
const http = require("http");

const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const routes = require("./routes");
const globalExceptionsHandler = require("./exceptions/globalExceptionsHandler");

const app = express();
const apiRoot = process.env.API_ROOT;
const server = http.createServer(app);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HackerBay Backend Task API",
    version: "1.0.0",
    description: "Simple stateless RESTFul microservice in Nodejs",
  },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/handlers/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification, {})
);
app.use(apiRoot, routes);
app.use(globalExceptionsHandler);

module.exports = server;
