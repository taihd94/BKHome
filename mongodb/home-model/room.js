var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: String,
    floorId: Schema.Types.ObjectId,
    imgPath: String,
    modules: [{
        kind: String, // 'lightingControl', 'sersorsModule', 'cameraModule',...
        moduleId: { type: Schema.Types.ObjectId, refPath: 'modules.kind'}
    }]
}, {versionKey: false});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getListOfRooms = function(floorId, callback){
  Room.find({"floorId": floorId}, callback);
}

module.exports.deleteRoom = function(id, callback){
  Room.findByIdAndRemove(id, callback);
}

module.exports.addRoom = function(newRoom, callback){
  newRoom.save(callback);
}
