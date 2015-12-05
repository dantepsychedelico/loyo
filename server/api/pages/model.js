'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema; 

var Image = new Schema({
  src: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  album: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String
  },
  data: {
    type: Buffer
  },
  ts: {
    type: Date,
    default: Date.now
  }
});

var Album = new Schema({
  album: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  coverSrc: {
    type: String
  },
  count: {
    type: Number
  },
  ts: {
    type: Date
  }
});

var Page = new Schema({
  pname: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  feature: String,
  specialize: String,
  details: [ new Schema({
    date: String,
    slides: [
      new Schema({
        title: String,
        src: String 
    })],
    title: String,
    context: String,
    hotel: String,
    breakfast: String,
    lunch: String,
    dinner: String
  })],
  intro: {
    title: String,
    price: String,
    location: String,
    city: String,
    days: String,
    airplane: String
  },
  airplanes: [
    new Schema({
      through: [
        new Schema({
          day: String,
          from: String,
          to: String,
          time: String,
          airplane: String,
          flightNo: String,
        })
      ]
    })
  ]
});

// var Navbar = new Schema({
// });
// 
var UploadHistory = new Schema({
  req: Schema.Types.Mixed,
  cs: String,
  ts: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Image', Image);
mongoose.model('Album', Album);
mongoose.model('Page', Page);
mongoose.model('UploadHistory', UploadHistory);
