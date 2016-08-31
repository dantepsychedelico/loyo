'use strict';

var https = require('https');
var qs = require('querystring');
var Q = require('q');
var request = require('request');
  

exports.getFbPosts = function() {
    var deferred = Q.defer();
    request.get({
        url: 'https://graph.facebook.com/v2.5/565567036875754/feed',
        qs: {
            fields: 'full_picture,description,created_time,story,message,name,link',
            access_token: process.env.FACEBOOK_APP_ID + '|' +  process.env.FACEBOOK_APP_SECRET,
            limit: 10
        },
        json: true
    }, function(err, res, body) {
        if (err) deferred.reject(err);
        deferred.resolve(body.data);
    });
    return deferred.promise;
};
