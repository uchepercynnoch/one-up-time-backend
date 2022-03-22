const settings = {
  development: { url: process.env.DB_DEV_URL },
  production: { url: process.env.DB_PROD_URL },
  test: { url: process.env.DB_TEST_URL },
};

module.exports = settings;
