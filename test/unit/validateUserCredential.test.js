const userCredentialValid = require("../../src/utils/userCredentialValid");
const credentials = Object.freeze({
  username: "johnDoe",
  password: "welcome",
});

describe("userCredentialValid", () => {
  it("should return truthy if user credential is valid", function () {
    const userCredential = userCredentialValid(credentials);

    expect(userCredential).toBeTruthy();
  });

  it("should return falsy if user credential is invalid", function () {
    const _credentials = Object.assign({ ...credentials }, { password: "" });

    const userCredential = userCredentialValid(_credentials);

    expect(userCredential).toBeFalsy();
  });

  it("should return falsy if user credential is empty", function () {
    const _credentials = {};

    const userCredential = userCredentialValid(_credentials);

    expect(userCredential).toBeFalsy();
  });
});
