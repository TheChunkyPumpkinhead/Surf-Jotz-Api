module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://test_9h1s_user:gG4otHQbfPA4Bo56YdV2kpnSRelzjS55@dpg-cppq4flds78s73ecrpk0-a.oregon-postgres.render.com/test_9h1s",
  TEST_DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://dev_lmqw_user:ViHS0rsgcXH7NChIlKJ9nnDJqppN2GEi@dpg-cph964ocmk4c73ecvs2g-a.oregon-postgres.render.com/dev_lmqw",
};
