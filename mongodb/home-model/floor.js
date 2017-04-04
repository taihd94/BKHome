var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FloorSchema = new Schema({
    name: String,
    rooms: [
      {
          name: String,
          imgPath: String
          // modules: [{
          //     kind: String, // 'lightingControl', 'sersorsModule', 'cameraModule',...
          //     moduleId: { type: Schema.Types.ObjectId, refPath: 'modules.kind'}
          // }]
      }
    ]
}, {versionKey: false});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);

module.exports.getListOfFloors = function(callback){
  Floor.find((err, floors)=>{
    if(err) {
      throw err;
      return callback({success: false, msg:"something went wrong"});
    } else {
      return callback(floors);
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
