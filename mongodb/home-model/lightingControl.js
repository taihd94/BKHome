var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LightingControlSchema = new Schema({
    kind: String,               // Ex: '1 port', '4 port', '8 port', ...
    lights: [
      {
          name: String,         // Ex: 'Light 1', 'Light 2',...
          kind: String,         // Ex: 'Neon', 'Compact',...
          life_circle: Number,  // Ex: 6000 hours
          power: Number,        // Ex: 60 watt
          events: [{
              value: Number,
              create_at: Date
          }]
      }
    ]
}, {versionKey: false});

const LightingControl = module.exports = mongoose.model('LightingControl', LightingControlSchema);
