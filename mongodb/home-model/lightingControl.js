const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LightingControlSchema = new Schema({
    deviceCode: String,         // Ex: 'ltctrl12c5'
    deviceType: String,         // 'LightingControl'
    numberOfPorts: Number,     // Ex: '1 port', '4 port', '8 port', ...
    allowToConnect: Boolean,
    roomId: Schema.Types.ObjectId,
    lights: [
      {
          portId: Number,
          name: String,                  // Ex: 'Light 1', 'Light 2',...
          typeOfLight: String,          // Ex: 'Neon', 'Compact',...
          dimmable: Boolean,            // Ex: 'ON/OFF', 'DIM'
          life_time: Number,             // Ex: 6000 hours
          power: Number,                 // Ex: 60 watt
          value: Number
      }
    ]
}, {collection: "devices", versionKey: false});


const LightingControl = module.exports = mongoose.model('LightingControl', LightingControlSchema);
const Floor = require('./floor');

module.exports.findAndUpdateLight = function (lightId, value, callback) {
  LightingControl.findOne({'lights._id' : lightId}, (err, device)=>{
    if (err) throw err;
    if(!!device){
      let light = device.lights.id(lightId);
      light.value = value;
      device.save((err,doc)=>{
        if(err) throw err;
      })
      callback({deviceId: device._id, portId: light.portId, dimmable: light.dimmable});
    } else {
      callback({success: false, msg: "device not found"});
    }
  })
}

module.exports.authenticateDevices = function(newDevice, callback) {
  LightingControl.findOne({deviceCode: newDevice.deviceCode},(err, device)=>{
    if(err) throw err;
    if(!device){
      newDevice.save((err, doc) => {
        if(err) throw err;
        else {
          callback(doc._id);
        }
      });
    } else {
      callback(device._id);
    }
  })
};

module.exports.updateLights = function(deviceId, lightingControl, callback){
  LightingControl.findById(deviceId, (err, ltctrl)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(ltctrl){
      ltctrl.lights = lightingControl.lights;
      ltctrl.save((err)=>{
        if(err){
          throw err;
          callback({success: false, msg: "something went wrong"});
        } else {
          callback({success: true, msg: "The lights has been updated to module"});
        }
      })
    } else {
      callback({success: false, msg: "module not found"});
    }
  })
}

module.exports.getLightDetails = function(lightId, callback){
  LightingControl.findOne({"lights._id": lightId}, (err,device)=>{
    if(err) throw err;
    if(!!device){
      let light = device.lights.id(lightId);
      callback({success: true, light: light});
    } else {
      callback({success: false, msg: 'Light not found'});
    }
  })
}

module.exports.getLightsDetails = function(listOfLights, callback){
  let rooms = [];
  let roomIndexArr = [];
  let index = 0;
  let forLoopFinshCheck = 0;
  for(let lightOfScene of listOfLights){
    let lightId = lightOfScene._id;
    LightingControl.findOne({"lights._id": lightId}, (err, device)=>{
      if(err) throw err;
      if(device){
        let light = device.lights.id(lightId);
        light.value = lightOfScene.value;
        let roomId = device.roomId;
        if(!!roomId){
          Floor.getFloorAndRoomByRoomId(device.roomId, result=>{
            let floorName = result.floorName;
            let roomName = result.roomName;
            let roomFilter = roomIndexArr.filter(room=>{
              return room.roomId == roomId.toString();
            }).pop();
            if(!!roomFilter){
              let index = roomFilter.index;
              rooms[index].devices.push(light);
            } else {
              roomIndexArr.push({roomId: roomId, index: index});
              rooms.push({roomId: roomId, roomName: roomName, floorName:floorName, devices: [light]});
              index++;
            };
            if(++forLoopFinshCheck===listOfLights.length){
              for(let room of rooms){
                room.devices.sort((a, b)=>{
                  return a.portId - b.portId;
                })
              }
              callback(rooms);
            }
          })
        }
      }
    })

  }
}
