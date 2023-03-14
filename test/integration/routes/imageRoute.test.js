require("dotenv").config();
const { mongoose } = require("mongoose");
const supertest = require("supertest");

const database = require("../../../src/config/database");
const server = require("../../../src/server");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { User } = require("../../../src/models/User");
const { Image } = require("../../../src/models/Image");

const API_ROOT = process.env.API_ROOT;

let request;

const requestBody = Object.freeze({
  url: "https://picsum.photos/200/300",
});

const credentials = Object.freeze({
  username: "johnDoe",
  password: "welcome123",
});

const login = async () => {
  const response = await request.post(`${API_ROOT}/login`).send(credentials);

  return response.text;
};

describe("/api/v1/thumbnails", () => {
  beforeEach(async () => {
    request = supertest(server);
    await database.init();
    await Image.deleteMany({});
    await User.deleteMany({});
  });

  afterEach(async () => {
    await Image.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return 401 if authorization is not in headers", async function () {
    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(response.headers.authorization).toBeUndefined();
    expect(response.text).toBe("Unauthorized");
  });

  it("should return 401 if jsonwebtoken is invalid", async function () {
    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .set("Authorization", "Bearer invalidJwt")
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(JSON.parse(response.text).message).toBe("jwt malformed");
  });

  it("should return 401 if user with id in jsonwebtoken payload, does not exist", async function () {
    const jwt = jsonwebtoken.sign(
      { _id: "6238bd1ef41bfca220172caf" },
      process.env.JWT_KEY
    );

    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  it("should return 400 if request body is empty", async function () {
    const jwt = await login();

    const emptyRequestBody = {};

    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(emptyRequestBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Request body cannot be empty");
  });

  it("should return 400 if request body contains invalid url", async function () {
    const jwt = await login();

    const requestBodyWithInvalidUrls = [
      { url: "" },
      { url: false },
      { url: "saraSmith" },
      { url: "https://" },
      { url: "http://" },
    ];

    for (let i = 0; i < requestBodyWithInvalidUrls.length; i++) {
      const response = await request
        .post(`${API_ROOT}/thumbnails`)
        .set("Authorization", `Bearer ${jwt}`)
        .send(requestBodyWithInvalidUrls[i]);

      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid url");
    }
  });

  it("should return 400 if request body does not have url property", async function () {
    const jwt = await login();

    const requestBodyWithNoUrlParameter = { name: "john doe" };

    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(requestBodyWithNoUrlParameter);

    expect(response.status).toBe(400);
    expect(response.text).toBe("'url' property not present in request body");
  });

  it("should return 200 with image buffer if valid jsonwebtoken is provided", async function () {
    const jwt = await login();

    const response = await request
      .post(`${API_ROOT}/thumbnails`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(requestBody);

    const image = fs.readFileSync(
      path.resolve(__dirname, "../../../src/resources/images/image.png")
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Buffer));
    expect(response.body).not.toEqual(image); //Since they have different dimensions; (50x50) against (200x300)
  });
});
