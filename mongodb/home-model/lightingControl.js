var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LightingControlSchema = new Schema({
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

module.exports.findAndUpdateLight = function (lightId, value, callback) {
  LightingControl.findOne({'lights._id' : lightId}, (err, device)=>{
    if (err) throw err;
    let light = device.lights.id(lightId);
    light.value = value;
    device.save((err,doc)=>{
      if(err) throw err;
    })
    callback({deviceId: device._id, portId: light.portId, dimmable: light.dimmable});
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
