var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FloorSchema = new Schema({
    name: String,
    houseId: Schema.Types.ObjectId,
    rooms: [
        { type: Schema.Types.ObjectId, ref: 'Rooms' }
    ]
}, {versionKey: false});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);

module.exports.getListOfFloors = function(callback){
  Floor.find(callback);
}

module.exports.addfloor = function(newFloor, callback){
  newFloor.save(callback);
}

module.exports.deletefloor = function(query, callback){
  Floor.remove(query, callback);
}
