var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorModuleSchema = new Schema({
    kind: String,
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
}, {versionKey: false});

const SensorModule = module.exports = mongoose.model('SensorModule', SensorModuleSchema);
