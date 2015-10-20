'use strict';

var https = require('https');
var querystring = require('querystring');
var Q = require('q');
  

exports.getFbPosts = function() {
  var defered = Q.defer();
  https.get({
    hostname: 'graph.facebook.com',
    path: '/v2.5/565567036875754/feed?' + 
      querystring.stringify({
        fields: 'full_picture,description,created_time,story,message,name,link',
        access_token: '914232871945661|GDprdujSfhFChugjNJEA5AT2cbA',
        limit: 5
      })
  }, function(results) {
    var data = []
    results.on('data', function(d) {
      data.push(d);
    });
    results.on('end', function(d) {
      data = JSON.parse(Buffer.concat(data));
      defered.resolve(data.data);
      console.log(data.data.length);
    });
  });
  return defered.promise;
}
