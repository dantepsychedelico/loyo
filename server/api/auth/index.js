'use strict';

var express = require('express');
var router = express.Router();
var auth = require('./auth.ctrl');

router.get('/login', function(req, res, next) {
    res.send('hi');
});

module.exports = router;
