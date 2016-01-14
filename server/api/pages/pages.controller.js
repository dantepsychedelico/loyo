'use strict';

require('./model');
var multiparty = require('multiparty'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    Album = mongoose.model('Album'),
    Page = mongoose.model('Page'),
    Airplane = mongoose.model('Airplane'),
    History = mongoose.model('History'),
    Slide = mongoose.model('Slide'),
    PageSlide = mongoose.model('PageSlide'),
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
        res.sendStatus(500);
      });
    });
    part.on('error', function(err) {
      console.log('[Err] part error');
      res.sendStatus(500);
    });
  });

  form.on('error', function(err) {
    console.log('[Err] form error' + err.stack);
    res.sendStatus(500);
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
    res.sendStatus(500);
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
    res.sendStatus(500);
  });
};

exports.updatePageField = function(req, res, next) {
  Page.findOne({ _id: req.params.pageid }).exec()
  .then(function(page) {
    if (!page) {
      res.sendStatus(500);
      return;
    }
    var field = req.params.field;
    switch (field) {
      case 'airplanes':
      case 'details':
      case 'feature':
      case 'intro':
      case 'specialize':
          page[field] = req.body[field];
          page.ts = new Date();
          break;
    }
    return page.save();
  })
  .then(function(results) {
    res.send();
    recordReq(req);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.updatePage = function(req, res, next) {
  Page.findOne({ _id: req.params.pageid }).exec()
  .then(function(page) {
    if (!page) {
      res.sendStatus(500);
      return;
    }
    var ts = new Date();
    if (page.pname !== req.body.pname) {
      page.pname = req.body.pname;
      Airplane.update({pageid: req.params.pageid}, {
        $set: { '產品名稱': req.body.pname }
      }, {multi: true}).exec();
    }
    page.priority = req.body.priority;
    page.feature = req.body.feature;
    page.specialize = req.body.specialize;
    page.details = req.body.details;
    page.intro = req.body.intro;
    page.airplanes = req.body.airplanes;
    page.ts = ts;
    return page.save()
      .then(function(results) {
        res.send({ts: ts});
        recordReq(req);
      });
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.createPage = function(req, res, next) {
  Page.findOne({ pname: req.body.pname }).exec()
  .then(function(page) {
    if (page) {
      res.sendStatus(500);
    } else {
      page = new Page({
        pname: req.body.pname,
        ts: new Date()
      })
      return page.save()
        .then(function(result){
          res.json({
            _id: page._id, 
            pname: page.pname,
            ts: page.ts
          });
        });
    }
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
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
      res.sendStatus(404);
      return;
    }
    res.json({
      pname: page.pname,
      priority: page.priority,
      feature: page.feature,
      specialize: page.specialize,
      details: page.details,
      intro: page.intro,
      airplanes: page.airplanes,
      productions: results[1],
      ts: page.ts
    });
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.getNavBar = function(req, res, next) {
  Page.find({}, {
    'intro.category': 1, 
    'intro.subcategory': 1,
    'intro.title': 1,
    pname: 1,
    priority: 1,
    ts: 1
  }).sort({ts:-1}).exec()
  .then(function(pages) {
    res.json(_.map(pages, function(page) {
      return {
        _id: page._id,
        category: page.intro.category,
        subcategory: page.intro.subcategory,
        title: page.intro.title,
        pname: page.pname,
        priority: page.priority,
        ts: page.ts
      };
    }));
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.saveSlide = function(req, res, next) {
  var deferred = Q.defer();
  if (req.body._id) {
    Slide.findOne({_id: req.body._id}).exec()
    .then(function(slide) {
      deferred.resolve(_.merge(slide, req.body));
    });
  } else {
    var slide = new Slide(req.body);
    deferred.resolve(slide);
  }
  deferred.promise
  .then(function(slide) {
    return slide.save()
    .then(function() {
      res.send(slide._id);
    });
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.getSlides = function(req, res, next) {
  Slide.find().exec()
  .then(function(slides) {
    res.send(slides);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.getSlide = function(req, res, next) {
  Slide.findOne({_id: req.params.id}).exec()
  .then(function(slide) {
    res.send(slide);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.savePageSlide = function(req, res, next) {
  PageSlide.findOne({_id: req.params.id}).exec()
  .then(function(pageSlide) {
    if (!pageSlide) pageSlide = new PageSlide({_id: req.params.id});
    pageSlide.options = req.body.options || {};
    pageSlide.slides = req.body.slides;
    return pageSlide.save()
  })
  .then(function() {
    res.sendStatus(200);
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};

exports.getPageSlide = function(req, res, next) {
  PageSlide.findOne({_id: req.params.id}).exec()
  .then(function(pageSlide) {
    pageSlide = pageSlide || {_id: req.params.id, options: {}, slides: []};
    return Slide.find({_id: {$in: pageSlide.slides}})
    .then(function(slides) {
      res.json({
        _id: pageSlide._id,
        options: pageSlide.options,
        slides: slides
      });
    });
  })
  .catch(function(err) {
    console.log(err.stack);
    res.sendStatus(500);
  });
};
