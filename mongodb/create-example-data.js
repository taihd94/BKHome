var mongoose = require('mongoose');
const config = require('../config/database');
mongoose.Promise = global.Promise;

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// Drop Database
mongoose.connection.once('connected', function () {
    mongoose.connection.db.dropDatabase();
});

var User = require('./user-model/user');
var House = require('./home-model/house');
var Floor = require('./home-model/floor');
var Room = require('./home-model/room');
var LightingControl = require('./home-model/lightingControl');

var house_id = new mongoose.Types.ObjectId();
var floor_id_1 = new mongoose.Types.ObjectId();
var floor_id_2 = new mongoose.Types.ObjectId();
var floor_id_3 = new mongoose.Types.ObjectId();
var room_id_1 = new mongoose.Types.ObjectId();
var room_id_2 = new mongoose.Types.ObjectId();
var light_id_1 = new mongoose.Types.ObjectId();
var light_id_2 = new mongoose.Types.ObjectId();
var light_id_3 = new mongoose.Types.ObjectId();
var switch_id_1 = new mongoose.Types.ObjectId();
var sensor_id_1 = new mongoose.Types.ObjectId();
var sensor_id_2 = new mongoose.Types.ObjectId();


var user = [
  new User({
    name: "admin",
    email: "admin@admin.com",
    username: "admin",
    password: "$2a$10$JJFNh6sJUiTIWebFw/4NK.L7n6x3ZkjLMffsxyG8BOCeC.0iai0Wi"
  }),
  new User({
    name: "taihd",
    email: "taihd@admin.com",
    username: "taihd",
    password: "$2a$10$JJFNh6sJUiTIWebFw/4NK.L7n6x3ZkjLMffsxyG8BOCeC.0iai0Wi"
  })
]

var house = [
    new House({
        _id: house_id,
        name: "BK House",
        floors: [
          floor_id_1,
          floor_id_2,
          floor_id_3
        ]
    })
];

var floor = [
  new Floor({
      _id: floor_id_1,
      name: "Ground",
      houseId: house_id,
      rooms: [
          room_id_1,
          room_id_2
      ]
  })
]

var room = [
  new Room({
      name: 'Bedroom',
      floorId: floor_id_1,
      imgPath: "https://s-media-cache-ak0.pinimg.com/originals/a5/80/0c/a5800cb89702af494bd3ff843312cf12.jpg",
      modules: [
        {
          kind: 'lightingControl', // 'lightingControl', 'sersorsModule', 'cameraModule',...
          moduleId: switch_id_1
        },
        {
          kind: 'lightingControl', // 'lightingControl', 'sersorsModule', 'cameraModule',...
          moduleId: switch_id_1
        }
      ]
  }),
  new Room({
      name: 'Living room',
      floorId: floor_id_1,
      imgPath: "http://ghk.h-cdn.co/assets/cm/15/11/54ff822674a54-living-rooms-modern-de.jpg",
      modules: [
        {
          kind: 'lightingControl', // 'lightingControl', 'sersorsModule', 'cameraModule',...
          moduleId: switch_id_1
        },
        {
          kind: 'lightingControl', // 'lightingControl', 'sersorsModule', 'cameraModule',...
          moduleId: switch_id_1
        }
      ]
  })
]

done = 0;
for(var i = 0; i< house.length; i++) {
    house[i].save(function (err, result) {
        done++;
        if (done === house.length) {
            mongoose.disconnect();
        }
    });
}

done = 0;
for(var i = 0; i< floor.length; i++) {
    floor[i].save(function (err, result) {
        done++;
        if (done === floor.length) {
            mongoose.disconnect();
        }
    });
}

done = 0;
for(var i = 0; i< room.length; i++) {
    room[i].save(function (err, result) {
        done++;
        if (done === room.length) {
            mongoose.disconnect();
        }
    });
}

done = 0;
for(var i = 0; i< user.length; i++) {
    user[i].save(function (err, result) {
        done++;
        if (done === user.length) {
            mongoose.disconnect();
        }
    });
}
