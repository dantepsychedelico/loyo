'use strict';

var express = require('express');
var news = require('./news.controller');

var router = express.Router();

router.get('/facebook/posts', function(req, res, next) {
  news.getFbPosts(req, res, next)
  .then(function(results) {
    res.send(results);
  });
});

module.exports = router;
