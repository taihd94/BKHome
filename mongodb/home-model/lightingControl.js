var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LightingControlSchema = new Schema({
    deviceCode: String,         // Ex: 'ltctrl12c5'
    deviceType: String,         // 'LightingControl'
    numberOfPorts: Number,     // Ex: '1 port', '4 port', '8 port', ...
    allowedToAccess: Boolean,
    roomId: Schema.Types.ObjectId,
    lights: [
      {
          name: String,         // Ex: 'Light 1', 'Light 2',...
          kind: String,         // Ex: 'Neon', 'Compact',...
          life_time: Number,  // Ex: 6000 hours
          power: Number,        // Ex: 60 watt
          events: [{
              value: Number,
              create_at: Date
          }]
      }
    ]
}, {collection: "devices", versionKey: false});

const LightingControl = module.exports = mongoose.model('LightingControl', LightingControlSchema);


module.exports.updateLights = function(deviceId, lightingControl, callback){
  LightingControl.findById(deviceId, (err, ltctrl)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(ltctrl){
      ltctrl.lights = lightingControl.lights;
      ltctrl.save((err)=>{
        if(err){
          throw err;
          callback({success: false, msg: "something went wrong"});
        } else {
          callback({success: true, msg: "The lights has been updated to module"});
        }
      })
    } else {
      callback({success: false, msg: "module not found"});
    }
  })
}
