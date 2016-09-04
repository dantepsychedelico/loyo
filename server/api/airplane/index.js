'use strict';

var express = require('express');
var airplain = require('./airplane.ctrl');

var router = express.Router();

router.get('/projects', function(req, res, next) {
  airplain.search(req.query)
  .then(function(airplanes) {
    res.send(airplanes);
  });
});

module.exports = router;
