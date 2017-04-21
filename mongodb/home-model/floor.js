var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FloorSchema = new Schema({
    name: String,
    rooms: [
      {
          name: String,
          imgPath: String,
          devices: [{type: Schema.Types.ObjectId, ref: 'devices'}]
      }
    ]
}, {versionKey: false});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);
const Devices = require('./devices');
const LightingControl = require('./lightingControl');
const SensorModule = require('./sensorModule');

module.exports.getListOfFloors = function(callback){
  Floor.find((err, floors)=>{
    if(err) {
      throw err;
      return callback({success: false, msg:"something went wrong"});
    } else {
      return callback({success:true, floors: floors});
    }
  });
}

module.exports.addfloor = function(newFloor, callback){
  newFloor.save((err)=>{
    if(err) {
      throw err;
      return callback({success: false, msg:"something went wrong"});
    } else {
      return callback({success: true, msg:'Successfully added new floor'})
    }
  });
}

module.exports.deletefloor = function(id, callback){
  Floor.findByIdAndRemove(id, (err, floor)=>{
    if(err){
      throw err;
      return callback({success: false, msg:"something went wrong"});
    }
    if(floor) {
      return callback({success: true, msg:'Floor has been deleted'})
    } else {
      return callback({success: false, msg:'Floor not found'})
    }
  });
}

module.exports.getListOfRooms = function(floorId, callback){
  if (floorId.match(/^[0-9a-fA-F]{24}$/)) {
    Floor.findById(floorId, (err, floor)=>{
      if(err) throw err;
      if(floor){
        return callback(floor.rooms);
      } else{
        return callback({success: false, msg:"Floor not found"});
      }
    })
  }else {
    return callback({success: false, msg:"FloorId is invalid"});
  }
}

module.exports.deleteRoom = function(roomId, callback){
  Floor.findOne({"rooms._id": roomId}, (err, floor)=>{
    if(err) throw err;
    if(floor){
      floor.rooms.id(roomId).remove();
      floor.save((err)=>{
        if(err) throw err;
        return callback({success: "true", msg:"room has been deleted"})
      });
    } else {
      return callback({success: false, msg:"room not found"})
    }
  })
}

module.exports.addNewRoom = function(floorId, newRoom, callback){
  Floor.findById(floorId, (err, floor)=>{
    if(err) throw err;
    if(floor){
      floor.rooms.push(newRoom);
      floor.save((err)=>{
        if(err) throw err;
        return callback({success: "true", msg:"room has been added"})
      });
    } else{
      return callback({success: false, msg:"floor not found"})
    }
  })
}

module.exports.updateImgPath = function(floorId, roomId, imgPath, callback) {
  Floor.findOne({"_id": floorId, "rooms._id": roomId}, (err, floor)=>{
    if(err) throw err;
    if(floor){
      floor.rooms.id(roomId).imgPath = imgPath;
      floor.save((err)=>{
        if(err) throw err;
        return callback({success: "true", msg:"imgPath has been updated"});
      });
    } else {
      return callback({success: false, msg:"floor or room not found"});
    }
  })
}

module.exports.getFloorAndRoomByRoomId = function(roomId, callback){
  Floor.findOne({'rooms._id': roomId}, (err,floor)=>{
    if(err) throw err;
    if(floor){
      let room = floor.rooms.id(roomId);
      callback({floorName: floor.name, roomName: room.name});
    } else {
      callback({success: false, msg: 'room not found'});
    }
  })
}

module.exports.updateDeviceToRoom = function (deviceId, roomId, callback) {
  Floor.findOne({'rooms.devices': deviceId}, (err, floor)=>{
    if(err) throw err;
    if(!!floor){
      let rooms = floor.rooms;
      let forLoopFinshCheck = 0;
      for(let room of rooms){
        let devices = room.devices
        let deviceFilter = devices.filter(device=>{
          return device.toString() === deviceId.toString();
        }).pop();
        if(!!deviceFilter){
          if(room._id != roomId){
            let index = devices.indexOf(deviceId);
            floor.rooms.id(room._id).devices.splice(index, 1);
            floor.rooms.id(roomId).devices.push(deviceId);
            floor.save(err=>{
              if(err) throw err;
              callback('Successfully saved deviceId to new room');
            })
          }
        }
      }
    } else {
      Floor.findOne({'rooms._id': roomId}, (err,floor)=>{
        if(err) throw err;
        if(!!floor){
          floor.rooms.id(roomId).devices.push(deviceId);
          floor.save(err=>{
            if(err) throw err;
            callback('Successfully saved deviceId to room');
          })
        }
      })
    }
  })
}

module.exports.getListOfItemsInHouse = function (callback) {
  Floor
    .find()
    .populate({
      path: 'rooms.devices',
      select: 'deviceType sensors.name sensors._id lights.name lights._id'
    })
    .exec((err, floors)=>{
      if(err) callback(err);
      else callback({success: true, house: floors});
    })
}
