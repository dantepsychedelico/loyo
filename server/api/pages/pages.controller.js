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
      add = 0,
      src = req.params.album+'/'+req.params.filename;
  form.on('part', function(part) {
    if (part.filename) part.resume();
    part.on('data', function(chunk) {
      chunks.push(chunk);
    });
    part.on('end', function() {
      Image.findOne({ src: src }).exec()
      .then(function(image) {
        if (!image) {
          image = new Image({
            src: src,
            album: req.params.album,
            name: req.params.filename
          });
          add += 1;
        }
        image.data = Buffer.concat(chunks);
        image.ts = new Date();
        return image.save();
      })
      .then(function(result) {
        return Album.update({
          album: req.params.album
        }, {
          $set: { coverSrc: src, },
          $inc: { count: add },
          $currentDate: { ts: true }
        }, {upsert: true}).exec();
      })
      .then(function(results) {
        res.send();
      })
      .catch(function(error) {
        console.log(error.stack);
        res.status(500).send();
      });
    });
    part.on('error', function(err) {
      console.log('[Err] part error');
      res.status(500).send();
    });
  });

  form.on('error', function(err) {
    console.log('[Err] form error' + err.stack);
    res.status(500).send();
  });
  form.parse(req);
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
