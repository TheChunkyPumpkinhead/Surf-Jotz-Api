module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://chris@localhost/jotz',
  TEST_DATABASE_URL:process.env.DATABASE_URL || 'postgresql://chris@localhost/jotz'
};