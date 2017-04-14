const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const LightingControl = require('./lightingControl');
const Floor = require('./floor');

const SceneSchema = new Schema({
    name: String,
    date: String,
    time: String,
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

module.exports.findSceneById = function(id, callback){
  Scenes.findById(id, (err, scene)=>{
    if(err) throw err;
    if(scene){
      callback({success: true, scene: scene});
    } else {
      callback({success: false, msg:"scene not found"});
    }
  })
}

module.exports.addNewScene = function(newScene, callback){
  let scene = new Scenes(newScene);
  scene.save((err)=>{
    if(err) {
      throw err;
      return callback({success: false, msg:"something went wrong"});
    } else {
      return callback({success: true, msg:'Successfully added new scene'});
    }
  });
}

module.exports.updateScene = function(id, newScene, callback){
  Scenes.findById(id, (err, scene)=>{
    if(err) throw err;
    if(!!scene){
      scene.time = newScene.time;
      scene.date = newScene.date;
      scene.devices = newScene.devices;
      scene.repeat = newScene.repeat;
      scene.save((err)=>{
        if(err) throw err;
        cronJob.create(scene);
        callback({success: true, msg: "scene has been updated"});
      })
    } else {
      callback({success: false, msg: "scene not found"});
    }
  })
}

module.exports.deleteScene = function(id, callback){
  Scenes.findByIdAndRemove(id, (err)=>{
    if(err) throw err;
    cronJob.stop(id);
    callback({success: true, msg: "scene has been delete"});
  })
}

const cronJob = require('../../cron-job/scenes');
