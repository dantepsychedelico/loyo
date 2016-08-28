'use strict';

var express = require('express');
// var airplain = require('./airplane.controller');

var router = express.Router();

router.get('/login', function(req, res, next) {
//   airplain.search(req.query)
//   .then(function(airplanes) {
//     res.send(airplanes);
//   });
});

module.exports = router;

