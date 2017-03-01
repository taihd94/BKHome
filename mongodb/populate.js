var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

var user_model = require('../mongodb/model').user_model;
var floor_model = require('../mongodb/model').floor_model;
var room_model = require('../mongodb/model').room_model;
var sensor_model = require('../mongodb/model').sensor_model;
var switch_model = require('../mongodb/model').switch_model;
var light_model = require('../mongodb/model').light_model;

room_model
    .findOne({})
    .populate('devices.item')
    .exec(function (err, docs) {
        if(err) throw err;
        console.log(docs);
    });
console.log('////////////////////////');

room_model.find(function (err, users) {
    room_model.populate(users, 'devices.item', function (err, docs) {
        if(err) throw err;
        console.log(docs[0].devices[0].item.events[0]);
    })
});
