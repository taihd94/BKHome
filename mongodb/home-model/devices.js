const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
    deviceCode: String,         // Ex: 'ltctrl12c5'
    deviceType: String,         // Ex: 'LightingControl', 'SensorModule'
    allowToConnect: Boolean,
    roomId: Schema.Types.ObjectId
}, {versionKey: false});

const Devices = module.exports = mongoose.model('devices', DevicesSchema);
const Floors = require('./floor');

module.exports.getDevice = function(deviceId, callback){
  Devices.findById(deviceId, (err, device)=>{
    if(err) throw err;
    if(device){
      callback({success: true, device: device});
    } else {
      callback({success: false, msg: "device not found"});
    }
  })
}

module.exports.authenticateDevices = function(newDevice, callback) {
  Devices.findOne({deviceCode: newDevice.deviceCode},(err, device)=>{
    if(err) throw err;
    if(!device){
      newDevice.save((err, doc) => {
        if(err) throw err;
        else {
          callback({success:true, allowToConnect: false, msg: "new device detected"});
        }
      });
    } else {
      if(device.allowToConnect){
        callback({success:true, allowToConnect: true, msg: "device is allowed to connect"});
      } else {
        callback({success:true, allowToConnect:false, msg: "device is not allowed to connect"});
      }
    }
  })
};

module.exports.getListOfDevices = function(callback){
  Devices.find((err, listOfDevices)=>{
    if(err) {
      throw err;
      callback({success: false, msg: "something went wrong"});
    } else {
      callback(listOfDevices);
    }
  });
}

module.exports.updateRoomId = function(deviceId, roomId, callback){
  Devices.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(device){
      device.roomId = roomId;
      device.save((err)=>{
        if(err){
          throw err;
          callback({success: false, msg: "something went wrong"});
        } else {
          callback({success: true, msg: "roomId has been updated to device"});
        }
      });

    } else {
      callback({success: false, msg: "device not found"});
    }
  })
}

module.exports.updatePermission = function(deviceId, permission, callback){
  Devices.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(device){
      device.allowToConnect = permission;
      device.save(err=>{
        if(err){
          throw err;
          callback({success: false, msg: "something went wrong"});
        } else {
          callback({success: true, msg: "device has been updated"});
        }
      })
    } else {
      callback({success: false, msg: "module not found"});
    }
  })
}

module.exports.getListOfDevicesInRoom = function(roomId, callback){
  Devices.find({'roomId': roomId}, (err, devices)=>{
    if(err) throw err;
    if(devices.length){
      callback({success: true, msg: "devices found", devices: devices});
    } else {
      callback({success: false, msg: "No device found"});
    }
  })
}

module.exports.getListOfDevicesInHouse = function(callback){
  Floors.getListOfFloors(result=>{
    if(result.success){
      let listOfFloors = result.floors;
      for(let i=0; i<listOfFloors.length; i++){
        let rooms = listOfFloors[i].rooms;
        for(let j=0; j<rooms.length; j++){
          let roomId = rooms[j]._id;
          Devices.getListOfDevicesInRoom(roomId, result=>{
            if(result.success){
              let devices = result.devices;
              listOfFloors[i].rooms[j].devices = devices;
              if(((i+1)*(j+1))==((listOfFloors.length)*(rooms.length))){
                callback({success: true, listOfDevices: listOfFloors});
              }
            }
          })
        }
      }
    }
  })
}
