require("dotenv").config();
const { mongoose } = require("mongoose");
const supertest = require("supertest");

const database = require("../../../src/config/database");
const server = require("../../../src/server");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../../../src/models/User");

const API_ROOT = process.env.API_ROOT;

let request;

const patch = [
  {
    op: "replace",
    path: "/username",
    value: "sarahMiller",
  },
];

const credentials = Object.freeze({
  username: "johnDoe",
  password: "welcome123",
});

const createUser = async () => User.create(credentials);

const login = async () => {
  const response = await request.post(`${API_ROOT}/login`).send(credentials);

  return response.text;
};

describe("/api/v1/users", () => {
  beforeEach(async () => {
    request = supertest(server);
    await database.init();
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return 401 if authorization is not in headers", async function () {
    const response = await request.patch(`${API_ROOT}/users/${1}`).send(patch);

    expect(response.status).toBe(401);
    expect(response.headers.authorization).toBeUndefined();
    expect(response.text).toBe("Unauthorized");
  });

  it("should return 401 if jsonwebtoken is invalid", async function () {
    const response = await request
      .patch(`${API_ROOT}/users/${1}`)
      .set("Authorization", "Bearer invalidJwt")
      .send(patch);

    expect(response.status).toBe(401);
    expect(JSON.parse(response.text).message).toBe("jwt malformed");
  });

  it("should return 401 if user with id in jsonwebtoken payload, does not exist", async function () {
    const jwt = jsonwebtoken.sign(
      { _id: "6238bd1ef41bfca220172caf" },
      process.env.JWT_KEY
    );

    const response = await request
      .patch(`${API_ROOT}/users/${1}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(patch);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  it("should return 400 if request body is empty", async function () {
    const jwt = await login();

    const emptyRequestBody = {};

    const response = await request
      .patch(`${API_ROOT}/users/${1}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(emptyRequestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Request body cannot be empty");
  });

  it("should return 400 if id is invalid", async function () {
    const jwt = await login();

    const response = await request
      .patch(`${API_ROOT}/users/${1}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(patch);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Id is invalid");
  });

  it("should return 404 if id does not exist", async function () {
    const jwt = await login();

    const response = await request
      .patch(`${API_ROOT}/users/623b9f5a3be41de45e4bbc28`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(patch);

    expect(response.status).toBe(404);
    expect(response.text).toBe("Id not found");
  });

  it("should return 200 with updated User", async function () {
    const jwt = await login();

    const { _id } = jsonwebtoken.verify(jwt, process.env.JWT_KEY);

    const response = await request
      .patch(`${API_ROOT}/users/${_id}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(patch);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(_id);
    expect(response.body.username).not.toBe(credentials.username);
    expect(response.body.username).toBe(patch[0].value);
    expect(response.body.password).toBe(credentials.password);
  });
});
