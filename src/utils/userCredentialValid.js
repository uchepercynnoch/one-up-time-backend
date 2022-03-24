const userCredentialValid = (credentials) => {
  const usernameExist = Object.keys(credentials).includes("username");
  const passwordExist = Object.keys(credentials).includes("password");

  const username = credentials.username;
  const password = credentials.password;

  return (
    usernameExist && passwordExist && username.length > 0 && password.length > 0
  );
};

module.exports = userCredentialValid;
