var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DevicesSchema = new Schema({
    deviceCode: String,         // Ex: 'ltctrl12c5'
    divceType: String,         // Ex: 'LinghtingControl', 'SensorModule'
    allowedToAccess: Boolean,
    roomId: Schema.Types.ObjectId
}, {versionKey: false});

const Devices = module.exports = mongoose.model('devices', DevicesSchema);

module.exports.scanDevices = function(newDevice, callback) {
  Devices.findOne({deviceCode: newDevice.deviceCode},(err, device)=>{
    if(err) throw err;
    if(!device){
      newDevice.save((err, doc) => {
        if(err) throw err;
        else {
          callback({success:"true", allowedToAccess: "false", msg: "detected device"});
        }
      });
    } else {
      if(device.allowedToAccess){
        callback({success:"true", allowedToAccess: "true", msg: "device is allowed to access"});
      } else {
        callback({success:"true", allowedToAccess:"false", msg: "device is not allowed to access"});
      }
    }
  })
};

module.exports.getListOfDevices = function(callback){
  Devices.find((err, listOfDevices)=>{
    if(err) {
      throw err;
      callback({success: "false", msg: "something went wrong"});
    } else {
      callback(listOfDevices);
    }
  });
}

module.exports.updateRoomId = function(deviceId, roomId, callback){
  Devices.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: "false", msg: "something went wrong"});
    }
    if(device){
      device.roomId = roomId;
      device.save((err)=>{
        if(err){
          throw err;
          callback({success: "false", msg: "something went wrong"});
        } else {
          callback({success: "true", msg: "roomId has been updated to device"});
        }
      });
    } else {
      callback({success: "false", msg: "device not found"});
    }
  })
}

module.exports.updatePermission = function(deviceId, permission, callback){
  Devices.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: "false", msg: "something went wrong"});
    }
    if(device){
      device.allowedToAccess = permission;
      device.save(err=>{
        if(err){
          throw err;
          callback({success: "false", msg: "something went wrong"});
        } else {
          callback({success: "true", msg: "device has been updated"});
        }
      })
    } else {
      callback({success: "false", msg: "module not found"});
    }
  })
}
