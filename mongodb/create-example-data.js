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
var SensorModule = require('./home-model/sensorModule');

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
      rooms: [
        {
            _id: room_id_1,
            name: 'Bedroom',
            imgPath: "https://s-media-cache-ak0.pinimg.com/originals/a5/80/0c/a5800cb89702af494bd3ff843312cf12.jpg"

        },
        {
            _id: room_id_2,
            name: 'Living room',
            imgPath: "http://ghk.h-cdn.co/assets/cm/15/11/54ff822674a54-living-rooms-modern-de.jpg"
        }
      ]
  })
]

var lightingControl = [
  new LightingControl({
      deviceCode: 'lt01',         // Ex: 'ltctrl12c5'
      deviceType: 'LightingControl',         // 'LightingControl'
      numberOfPorts: 4,     // Ex: '1 port', '4 port', '8 port', ...
      allowToConnect: false,
      lights: [
        {
            portId: 1,
            name: 'null',                  // Ex: 'Light 1', 'Light 2',...
            typeOfLight: 'null',                  // Ex: 'Neon', 'Compact',...
            dimmable: true,         // Ex: 'ON/OFF', 'DIM'
            life_time: 000,             // Ex: 6000 hours
            power: 000,                 // Ex: 60 watt
            value: 0
        },
        {
            portId: 2,
            name: 'null',                  // Ex: 'Light 1', 'Light 2',...
            typeOfLight: 'null',                  // Ex: 'Neon', 'Compact',...
            dimmable: false,         // Ex: 'ON/OFF', 'DIM'
            life_time: 000,             // Ex: 6000 hours
            power: 000,                 // Ex: 60 watt
            value: 0
        },
        {
            portId: 3,
            name: 'null',                  // Ex: 'Light 1', 'Light 2',...
            typeOfLight: 'null',                  // Ex: 'Neon', 'Compact',...
            dimmable: false,         // Ex: 'ON/OFF', 'DIM'
            life_time: 000,             // Ex: 6000 hours
            power: 000,                 // Ex: 60 watt
            value: 0
        },
        {
            portId: 4,
            name: 'null',                  // Ex: 'Light 1', 'Light 2',...
            typeOfLight: 'null',                  // Ex: 'Neon', 'Compact',...
            dimmable: false,         // Ex: 'ON/OFF', 'DIM'
            life_time: 000,             // Ex: 6000 hours
            power: 000,                 // Ex: 60 watt
            value: 0
        }
      ]
  })
]

var sensorModule = [
  new SensorModule({
      deviceCode: 'ss01',                 // Ex: 'ss123'
      deviceType: 'SensorModule',         // 'SensorModule'
      numberOfSensors: 2,                 // Ex: '1 ss', '4 ss',
      allowedToAccess: false,
      battery: 60,      // Ex: '60%', '80%'
      sensors: [
        {},{}
      ]
  }),
  new SensorModule({
      deviceCode: 'ss02',                 // Ex: 'ss123'
      deviceType: 'SensorModule',         // 'SensorModule'
      numberOfSensors: 3,                 // Ex: '1 ss', '4 ss',
      allowedToAccess: false,
      battery: 80,      // Ex: '60%', '80%'
      sensors: [
        {},{},{}
      ]
  })
]

done = 0;
for(var i = 0; i< house.length; i++) {
    house[i].save(function (err, result) {
        if(err) throw err;
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
for(var i = 0; i< lightingControl.length; i++) {
    lightingControl[i].save(function (err, result) {
        if(err) throw err;
        done++;
        if (done === lightingControl.length) {
            mongoose.disconnect();
        }
    });
}

// done = 0;
// for(var i = 0; i< sensorModule.length; i++) {
//     sensorModule[i].save(function (err, result) {
//         done++;
//         if (done === sensorModule.length) {
//             mongoose.disconnect();
//         }
//     });
// }

done = 0;
for(var i = 0; i< user.length; i++) {
    user[i].save(function (err, result) {
        done++;
        if (done === user.length) {
            mongoose.disconnect();
        }
    });
}
