'use strict';

var https = require('https');
var querystring = require('querystring');
var Q = require('q');
  

exports.getFbPosts = function() {
  var deferred = Q.defer();
  https.get({
    hostname: 'graph.facebook.com',
    path: '/v2.5/565567036875754/feed?' + 
      querystring.stringify({
        fields: 'full_picture,description,created_time,story,message,name,link',
        access_token: '914232871945661|GDprdujSfhFChugjNJEA5AT2cbA',
        limit: 10
      })
  }, function(results) {
    var data = []
    results.on('data', function(d) {
      data.push(d);
    });
    results.on('end', function(d) {
      data = JSON.parse(Buffer.concat(data));
      deferred.resolve(data.data);
      console.log(data.data.length);
    });
  })
  .on('error', function(err) {
    console.log(err.stack)
    deferred.resolve([]);
  });
  return deferred.promise;
};
