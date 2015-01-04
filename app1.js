var express = require('express');
var APIv1 = express.Router();

APIv1.get('/names', function(req, res) {
  res.send('from API 1');
});

module.exports = APIv1;
