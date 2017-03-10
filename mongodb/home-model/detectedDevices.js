var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetectedDevicesSchema = new Schema({
    moduleCode: String,              // Ex: 'ltctrl12c5', 'ssmdl2'
    module: String,                      // Ex: 'Lighting control', 'Sensor module', 'Buzzer', ...
    kind: String,
    connected: Boolean
}, {versionKey: false});

const DetectedDevices = module.exports = mongoose.model('DetectedDevices', DetectedDevicesSchema);

module.exports.addNewDevice = function(newDevice, callback){
  newDevice.save(callback);
}
