var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FloorSchema = new Schema({
    name: String,
    rooms: [
      {
          name: String,
          imgPath: String,
          devices: [{type: Schema.Types.ObjectId, unique: true, ref: 'devices'}]
      }
    ]
}, {versionKey: false});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);
const Devices = require('./devices');
const LightingControl = require('./lightingControl');
const SensorModule = require('./sensorModule');

module.exports.getListOfFloors = function(){
  return Floor.find()
}

module.exports.addfloor = function(newFloor){
  return newFloor.save()
  .then(floor=>{
    return Promise.resolve('Successfully added new floor')
  })
}

module.exports.deletefloor = function(id){
  return Floor.findByIdAndRemove(id)
  .then(()=>{
    return Promise.resolve('Floor has been deleted')
  })
}

module.exports.getListOfRooms = function(floorId){
  return Floor.findById(floorId)
  .then(floor=>{
    if(!floor) throw new Error('Floot not found: ' + floorId)
    return Promise.resolve(floor.rooms)
  })
}

module.exports.deleteRoom = function(roomId){
  return Floor.findOne({"rooms._id": roomId})
  .then(floor=>{
    if(!floor) throw new Error('No floor contains room: ' + roomId)
    floor.rooms.id(roomId).remove()
    return floor.save()
  })
  .then(floor=>{
    return Promise.resolve('room has been deleted')
  })
}

module.exports.addNewRoom = function(floorId, newRoom){
  return Floor.findById(floorId)
  .then(floor=>{
    if(!floor) throw new Error('Floor not found: ' + floorId)
    floor.rooms.push(newRoom);
    return floor.save()
  })
  .then(floor=>{
      return Promise.resolve('room has been added')
  })
}

module.exports.updateImgPath = function(floorId, roomId, imgPath) {
  return Floor.findOne({"_id": floorId, "rooms._id": roomId})
  .then(floor=>{
    if(!floor) throw new Error('Floor not found: ' + floorId)
    floor.rooms.id(roomId).imgPath = imgPath;
    return floor.save()
  })
  .then(floor=>{
    return Promise.resolve('imgPath has been updated')
  })
}

module.exports.getFloorAndRoomByRoomId = function(roomId){
  return Floor.findOne({'rooms._id': roomId})
  .then(floor=>{
    if(!floor) return Promise.reject('No floor contains room: ' + roomId)
    let room = floor.rooms.id(roomId);
    return Promise.resolve({floorName: floor.name, roomName: room.name})
  })
}

module.exports.updateDeviceToRoom = function (deviceId, roomId) {
  return Floor.findOne({'rooms.devices': deviceId})
  .then(floor=>{
    if(!!floor){
      floor.rooms.forEach(room=>{
        let index = room.devices.indexOf(deviceId);
        if(index!=-1) floor.rooms.id(room._id).devices.splice(index,1)
      })
      floor.save()
    }
    return Floor.findOne({'rooms._id': roomId})
  })
  .then(floor=>{
    if(!floor) throw new Error('No floor contains room: ' + roomId)
    floor.rooms.id(roomId).devices.push(deviceId);
    floor.save()
  })
  .then(()=>{
    return Promise.resolve('Successfully saved deviceId to room');
  })
}

module.exports.getListOfItemsInHouse = function (callback) {
  return Floor.find()
  .populate({
    path: 'rooms.devices',
    select: 'deviceType sensors.name sensors._id sensors._type lights.name lights._id lights.dimmable'
  })
}
