'use strict';

var express = require('express');
var news = require('./news.controller');

var router = express.Router();

router.get('/facebook/posts', function(req, res, next) {
  news.getFbPosts()
  .then(function(results) {
    res.send(results);
  });
});

module.exports = router;
