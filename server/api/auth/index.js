'use strict';

var express = require('express');
var router = express.Router();
var auth = new require('./auth.ctrl')();
var passport = require('./auth.passport');

auth.create({
    name: process.env.ADMIN_NAME, 
    username: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
});

router.post('/login', passport.authenticate('local', {
    failureFlash: false,
    session: false
}), function(req, res) {
    res.json({ 
        token: auth.getToken(req.user),
        user: req.user 
    });
});

router.get('/logout', function(req, res, next) {
    res.send();
});

// router.post('/register', function(req, res, next) {
//     auth
//     .create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     })
//     .then(function() {
//         res.status(200);
//     });
// });

router.get('/me', passport.authenticate('bearer', {session: false}), function(req, res, next) {
    res.json({ 
        token: auth.getToken(req.user),
        user: req.user 
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
