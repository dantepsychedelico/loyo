/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var glob = require('glob');

module.exports = function(app) {

    glob.sync('server/*/*/*model.js').forEach(function(file) {
        require('./'+path.relative('server', file));
    });
    var passport = require('./api/auth/auth.passport');

    // Insert routes below
    app.post('/api/*', passport.authenticate('bearer', {session: false}));
    app.use('/api/airplane', require('./api/airplane'));
    app.use('/api/news', require('./api/news'));
    app.use('/api/pages', require('./api/pages'));
    app.use('/api/images', require('./api/pages/images'));
    app.use('/auth', require('./api/auth'));
    
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
 
    // All other routes should redirect to the index.html
    app.route('/*')
    .get(function(req, res) {
        res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
