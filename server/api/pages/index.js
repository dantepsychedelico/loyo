'use strict';

var express = require('express');
var pages = require('./pages.controller');

var router = express.Router();

router.post('/image/:album/:filename', function(req, res, next) {
  pages.saveImage(req, res, next);
});

router.post('/context/:pageid/:field', function(req, res, next) {
  pages.updatePageField(req, res, next);
});

router.post('/context/:pageid', function(req, res, next) {
  pages.updatePage(req, res, next);
});

router.post('/context', function(req, res, next) {
  pages.createPage(req, res, next);
});

router.get('/context/:pageid', function(req, res, next) {
  pages.getPage(req, res, next);
});

router.get('/albums', function(req, res, next) {
  pages.getAlbumSummary(req, res, next);
});

router.get('/albums/:album', function(req, res, next) {
  pages.getAlbumSrcs(req, res, next);
});

router.get('/navbar', function(req, res, next) {
  pages.getNavBar(req, res, next);
});

router.post('/slide', function(req, res, next) {
  pages.saveSlide(req, res, next);
});

router.get('/slide', function(req, res, next) {
  pages.getSlides(req, res, next);
});

module.exports = router;

