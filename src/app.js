const express = require('express');
const cors = require('cors');
const app = express();
const jotzRouter = require('./jotz/jotz-router');

app.use(cors());
app.use('/api/jotz', jotzRouter);



app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});

module.exports = app;