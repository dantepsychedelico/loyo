'use strict';

var express = require('express');
var pages = require('./pages.controller');

var router = express.Router();

router.get('/detail', function(req, res, next) {
  pages.search(req.query)
  .then(function(airplanes) {
    res.send(airplanes);
  });
});

module.exports = router;

