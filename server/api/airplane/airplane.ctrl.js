'use strict';

var mongoose = require('mongoose');
var Airplane = mongoose.model('Airplane');
var _ = require('lodash');
var moment = require('moment');

exports.search = function(query) {
  var start = moment(query.start, 'YYYY-MM-DD/HH:mm');
  var end = moment(query.end, 'YYYY-MM-DD/HH:mm');
  var key = query.key || '';
  var page = _.isNaN(+query.page) ? 0 : +query.page;
  var size = 20;
  start = start.isValid() ? start : moment();
  end = end.isValid() ? end : moment().add(3, 'month');
  return Airplane.find({
    '出發日期': { $gte: start },
    '回程日期': { $lte: end },
    $or: _.flatten(_.map(key.split(' '), function(key) {
      return _.map(['產品名稱', '備註'], function(field) {
        return _.set({}, field, {$regex: new RegExp(key)});
      });
    }))
  }, {
    _id: 0,
    '出發日期': 1,
    '天數': 1,
    '產品名稱': 1,
    '團費售價': 1,
    '可報名': 1,
    '備註': 1,
    '回程日期': 1
  }).sort({'出發日期': 1})
  .skip(page*size).limit(size).exec();
};
