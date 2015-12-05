'use strict';

var mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    Album = mongoose.model('Album');

exports.getImage = function(req, res, next) {
  Image.findOne({ src: req.params.album+'/'+req.params.filename })
  .exec()
  .then(function(image) {
    if (image) {
      res.send(image.data);
    } else {
      res.status(404).send();
    }
  })
  .catch(function(err) {
    console.log(err);
    res.send();
  });
};
