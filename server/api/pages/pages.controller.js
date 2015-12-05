'use strict';

require('./model');
var multiparty = require('multiparty'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    Album = mongoose.model('Album'),
    Q = require('q');


exports.saveImage = function(req, res, next) {
  var form = new multiparty.Form(),
	    chunks = [],
      idx = 0,
      src = req.params.album+'/'+req.params.filename;
  Q.all([Image.findOne({ src: src }).exec(), 
    Album.findOne({ album: req.params.album }).exec()])
    .then(function(results) {
      var image = results[0];
      var album = results[1];
      var add = 0;
      if (!image) {
        image = new Image({
          src: req.params.album+'/'+req.params.filename,
          album: req.params.album,
          name: req.params.filename,
          ts: new Date()
        });
        add += 1;
      }
      if (!album) {
        album = new Album({
          album: req.params.album,
          count: 0
        });
      }
      form.on('part', function(part) {
        if (part.filename) part.resume();
        part.on('data', function(chunk) {
          chunks[idx] = chunk;
          idx += 1;
        });
        part.on('end', function() {
          image.data = Buffer.concat(chunks);
          image.ts = new Date();
          image.save()
          .catch(function(error) {
            console.log(error);
          });
          album.coverSrc = image.src;
          album.ts = new Date();
          album.count += add;
          album.save()
          .catch(function(err) {
            console.log(err);
          });
        });
        part.on('error', function(err) {
          console.log('[Err] part error');
        });
      });

      form.on('close', function() {
        res.send();
      });

      form.on('error', function(err) {
        console.log('[Err] form error' + err.stack);
      });
      form.parse(req);
    })
    .fail(function(err) {
      console.log(err);
      res.status(500).send();
    });
};

exports.getAlbumSummary = function(req, res, next) {
  Album.find({}, {_id: 0, __v: 0}).exec()
  .then(function(albums) {
    res.send(albums);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send();
  });
};

exports.getAlbumSrcs = function(req, res, next) {
  Image.find({album: req.params.album}, {_id: 0, src:1, ts:1})
  .sort({ts:-1}).exec()
  .then(function(images) {
    res.json(images);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send();
  });
};
