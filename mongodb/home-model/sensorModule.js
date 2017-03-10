var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorModuleSchema = new Schema({
    deviceCode: String,         // Ex: 'ss123'
    deviceType: String,         // 'SensorModule'
    numberOfSensors: Number,    // Ex: '1 ss', '4 ss', ...
    allowedToAccess: Boolean,
    battery: Number,      // Ex: '60%', '80%'
    roomId: Schema.Types.ObjectId,
    sensors: [
      {
          name: String,         // Ex: 'Light sensor 1', 'Light sensor 2', 'Temperature sensor 2',...
          kind: String,         // Ex: 'Light sensor', 'Temperature sensor',...
          events: [{
              value: Number,
              create_at: Date
          }]
      }
    ]
}, {collection: "devices", versionKey: false});

const SensorModule = module.exports = mongoose.model('SensorModule', SensorModuleSchema);

module.exports.getListOfDevices = function(callback){
  SensorModule.find((err, listOfModules)=>{
    if(err) throw err;
    callback(listOfModules);
  });
}

module.exports.updateRoomId = function(moduleId, roomId, callback){
  console.log(moduleId);
  SensorModule.findById(moduleId, (err, sensorModule)=>{
    if(err) throw err;
    if(sensorModule){
      sensorModule.roomId = roomId;
      sensorModule.save((err)=>{
        if(err){
          throw err;
          callback({success: "false", msg: "something went wrong"});
        } else {
          callback({success: "true", msg: "roomId has been updated to module"});
        }
      });
    } else {
      callback({success: "false", msg: "module not found"});
    }
  })
}
