var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: String,
    modules: [{
        kind: String, // 'lightingControl', 'sersorsModule', 'cameraModule',...
        moduleId: { type: Schema.Types.ObjectId, refPath: 'modules.kind'}
    }
    ]
}, {versionKey: false});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.getRoomById = function(id, callback){
  Room.findById(id, callback);
}

module.exports.addRoom = function(newRoom, callback){
      newRoom.save(callback);
};
