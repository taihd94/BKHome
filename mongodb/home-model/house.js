const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Floor = require('./floor');
const Room = require('./room');
const LightingControl = require('./lightingControl');
const SensorModule = require('./sensorModule');

const HouseSchema = new Schema({
    name: String,
    floors: [
      { type: Schema.Types.ObjectId, ref: 'Rooms' }
    ]
}, {versionKey: false});

const House = module.exports = mongoose.model('House', HouseSchema);

module.exports.getHouse = function(callback){
  House.find(callback);
}
