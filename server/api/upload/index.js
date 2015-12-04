'use strict';

var express = require('express');
var upload = require('./upload.controller');

var router = express.Router();

router.post('/image/:album/:filename', function(req, res, next) {
  upload.saveImage(req, res, next);
});

module.exports = router;

