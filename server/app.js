/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var fs = require('fs');

mongoose.Promise = require('q').Promise;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
mongoose.connection.on('connected', function() {
  console.log('\x1b[33m%s\x1b[0m', 'MongoDB connection success: '+config.mongo.uri);
});
mongoose.set('debug', config.mongoDebug);
// Setup server
var app = express();
var server;
if (config.https) {
  server = require('https').createServer({
    key: fs.readFileSync(config.https.ssl.key),
    cert: fs.readFileSync(config.https.ssl.cert)
  }, app);
} else {
  server = require('http').createServer(app);
}
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
