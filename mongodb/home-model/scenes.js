const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LightingControl = require('./lightingControl');
const Floor = require('./floor');

const SceneSchema = new Schema({
    name: String,
    time: Date,
    repeat: [Boolean],
    devices: [{
      _id: Schema.Types.ObjectId,
      value: Number
    }]
}, {versionKey: false});

const Scenes = module.exports = mongoose.model('scenes', SceneSchema);


module.exports.getListOfScenes = function(callback){
  Scenes.find((err, scenes)=>{
    if(err) {
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(!!scenes){
      callback(scenes);
    }
  });
}
