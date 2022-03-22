require("dotenv").config();
const { mongoose } = require("mongoose");
const supertest = require("supertest");

const database = require("../../../src/config/database");
const server = require("../../../src/server");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../../../src/models/User");

const API_ROOT = process.env.API_ROOT;

let request;

const credentials = Object.freeze({
  username: "johnDoe",
  password: "welcome123",
});

describe("/api/v1/login", () => {
  beforeEach(async () => {
    request = supertest(server);
    await database.init();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return 400 if request body is empty", async function () {
    const requestBody = {};

    const response = await request.post(`${API_ROOT}/login`).send(requestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Request body must not be empty");
  });

  it("should return 400 if username and password properties are not in request body", async function () {
    const requestBody = { name: "johnDoe", email: "johnDoe@lorem.com" };

    const response = await request.post(`${API_ROOT}/login`).send(requestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Username and password are required");
  });

  it("should return 400 if username is empty", async function () {
    const requestBody = Object.assign({ ...credentials }, { username: "" });

    const response = await request.post(`${API_ROOT}/login`).send(requestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Username cannot be empty");
  });

  it("should return 400 if password is empty", async function () {
    const requestBody = Object.assign({ ...credentials }, { password: "" });

    const response = await request.post(`${API_ROOT}/login`).send(requestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Password cannot be empty");
  });

  it("should login, return 200, and jsonwebtoken", async function () {
    const response = await request.post(`${API_ROOT}/login`).send(credentials);

    const user = await User.findOne({ username: credentials.username });

    const jwt = response.text;

    const payload = jsonwebtoken.verify(jwt, process.env.JWT_KEY);

    expect(response.status).toBe(200);
    expect(payload._id).toEqual(user._id.toHexString());
  });
});
