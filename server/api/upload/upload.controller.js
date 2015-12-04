'use strict';

var multiparty = require('multiparty');

exports.saveImage = function(req, res, next) {
  var form = new multiparty.Form();
  form.on('part', function(part) {

    if (part.filename) {
      part.resume();
    }
    part.on('error', function(err) {
      console.log('[Err] part error');
    });
  });

  form.on('close', function() {
    res.send({res: 0});
  });

  form.on('error', function(err) {
    console.log('[Err] form error' + err.stack);
  });
  form.parse(req);
};
