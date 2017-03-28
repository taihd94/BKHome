var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorModuleSchema = new Schema({
    deviceCode: String,         // Ex: 'ss123'
    deviceType: String,         // 'SensorModule'
    numberOfSensors: Number,    // Ex: '1 ss', '4 ss', ...
    allowToConnect: Boolean,
    battery: Number,      // Ex: '60%', '80%'
    roomId: Schema.Types.ObjectId,
    sensors: [
      {
          name: String,         // Ex: 'Light sensor 1', 'Light sensor 2', 'Temperature sensor 2',...
          kind: String,         // Ex: 'Light sensor', 'Temperature sensor',...
          value: Number
      }
    ]
}, {collection: "devices", versionKey: false});

const SensorModule = module.exports = mongoose.model('SensorModule', SensorModuleSchema);


module.exports.updateSensors = function(deviceId, sensorModule, callback){
  SensorModule.findById(deviceId, (err, sensor)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(sensor){
      sensor.sensors = sensorModule.sensors;
      sensor.save((err)=>{
        if(err){
          throw err;
          callback({success: false, msg: "something went wrong"});
        } else {
          callback({success: true, msg: "The sensors has been updated to device"});
        }
      })
    } else {
      callback({success: false, msg: "module not found"});
    }
  })
}
