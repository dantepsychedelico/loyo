'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Airplane = new Schema({
  pageid: {
    type: Schema.Types.ObjectId,
    index: true
  },
  '雜支': String,
  '去程航班': String,
  '飯店': String,
  '產品名稱': String,
  '候補': Number,
  '航班': String,
  '住宿': String,
  '銷售說明': String,
  '出發日期': Date,
  '總機位': String,
  '回程航班' : String,
  '天數': Number,
  '狀態': String,
  '備註': String,
  '抵台日期': Date,
  '報名': String,
  '團費售價': Number,
  '可報名': Number,
  '詳細內容': String,
  '團號': String,
  '回程日期': Date
});

module.exports = mongoose.model('Airplane', Airplane);
