'use strict';

var express = require('express');
var images = require('./images.controller');

var router = express.Router();

router.get('/:album/:filename', function(req, res, next) {
  images.getImage(req, res, next);
});

module.exports = router;
