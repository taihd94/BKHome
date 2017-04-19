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
          _type: String,         // Ex: 'Light sensor', 'Temperature sensor',...
          value: Number
      }
    ]
}, {collection: "devices", versionKey: false});

const SensorModule = module.exports = mongoose.model('SensorModule', SensorModuleSchema);

module.exports.updateSensorName = function(deviceId, sensors, callback){
  SensorModule.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(device){
      for(i=0; i< device.sensors.length; i++){
        device.sensors[i].name = sensors[i].name;
      }
      device.save(err=>{
        if(err)
          throw err;
        else {
          callback({success: true, msg: "sensors have been updated"});
        }
      })
    }
  })
}

module.exports.updateSensorValue = function(deviceId, sensorModule, callback){
  SensorModule.findById(deviceId, (err, device)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    if(device){
      device.battery = sensorModule.battery;
      for(i=0; i< device.sensors.length; i++){
        device.sensors[i].value = sensorModule.sensors[i].value;
      }
      device.save(err=>{
        if(err)
          throw err;
        else {
          callback(device);
        }
      })
    }
  })
}

module.exports.updateSensors = function(deviceId, sensorModule, callback){
  SensorModule.findByIdAndUpdate(deviceId, sensorModule, (err, device)=>{
    if(err){
      throw err;
      callback({success: false, msg: "something went wrong"});
    }
    else {
      callback({success: true, msg: "device has been updated"});
    }
  })
}


module.exports.authenticateDevices = function(newDevice, callback) {
  SensorModule.findOne({deviceCode: newDevice.deviceCode},(err, device)=>{
    if(err) throw err;
    if(!device){
      newDevice.save((err, doc) => {
        if(err) throw err;
        else {
          callback(doc._id);
        }
      });
    } else {
      callback(device._id);
    }
  })
};

module.exports.getSensorDetails = function(sensorId, callback){
  SensorModule.findOne({"sensors._id": sensorId}, (err,device)=>{
    if(err) throw err;
    if(!!device){
      let sensor = device.sensors.id(sensorId);
      callback({success: true, sensor: sensor});
    } else {
      callback({success: false, msg: 'Sensor not found'});
    }
  })
}
