'use strict';

var express = require('express');
var router = express.Router();
var auth = require('./auth.ctrl');
var passport = require('./auth.passport');

router.post('/login', function(req, res, next) {
    res.send('hi');
});
router.post('/register', function(req, res, next) {
    auth
    .checkLogout()
    .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(function() {
        res.status(200);
    });
});

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'public_profile', 'user_friends'],
    failureRedirect: '/account/signin', 
}), function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('/account/signin');
});

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/account/signin'
}));

module.exports = router;
