'use strict';

require('./model');
var multiparty = require('multiparty'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    Album = mongoose.model('Album'),
    Page = mongoose.model('Page'),
    Airplane = mongoose.model('Airplane'),
    History = mongoose.model('History'),
    _ = require('lodash'),
    Q = require('q');

function recordReq(req) {
  History.collection.insert({ 
    peername: req.connection._peername,
    headers: req.headers,
    url: req.url,
    method: req.method,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    startAt: req._startAt,
    startTime: req.startTime
  });
}

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
        var deferred = Q.defer();
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
        image.save()
        .then(function() {
          deferred.resolve();
        })
        .catch(function(error) {
          deferred.resolve();
          console.log(error.stack);
        });
        return deferred.promise;
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
        recordReq(req);
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
  Album.find({}, {_id: 0, __v: 0}).sort({ts:-1}).exec()
  .then(function(albums) {
    res.json(albums);
  })
  .catch(function(err) {
    console.log(err.stack);
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
    console.log(err.stack);
    res.status(500).send();
  });
};

exports.updatePage = function(req, res, next) {
  Page.findOne({ _id: req.params.pageid }).exec()
  .then(function(page) {
    if (!page) {
      res.status(500).send();
      return;
    }
    var modify = false;
    var field = req.params.field;
    if (req.body[field]) {
      page[field] = req.body[field];
      modify = true;
    }
    if (modify) page.ts = new Date();
    return page.save();
  })
  .then(function(results) {
    res.send();
    recordReq(req);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.status(500).send();
  });
};

exports.getPage = function(req, res, next) {
  Q.all([Page.findOne({_id: req.params.pageid}).exec(),
    Airplane.find({ 
      pageid: req.params.pageid,
      '出發日期': { $gte: new Date() }
    }, {
      _id: 0,
      '出發日期': 1,
      '天數': 1,
      '產品名稱': 1,
      '團費售價': 1,
      '可報名': 1,
      '備註': 1,
      '回程日期': 1
    }).sort({'出發日期': 1}).exec()])
  .then(function(results) {
    var page = results[0];
    if (!page) {
      res.status(404).send();
      return;
    }
    res.json({
      pname: page.pname,
      feature: page.feature,
      specialize: page.specialize,
      details: page.details,
      intro: page.intro,
      airplanes: page.airplanes,
      productions: results[1]
    });
  })
  .catch(function(err) {
    console.log(err.stack);
    res.status(500).send();
  });
};

exports.getNavBar = function(req, res, next) {
  Page.find({}, {
    'intro.category':1, 
    'intro.subcategory':1
  }).exec()
  .then(function(pages) {
    res.json(pages);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.status(500).send();
  });
};
