const mqtt = require('mqtt');
client = mqtt.connect('mqtt://localhost:1883');
// const LightingControl = require('../mongodb/home-model/lightingControl');


client.on('connect',  () => {
  client.subscribe('devices/lightingControl/+');
  client.subscribe('lwt/lightingControl');
})

client.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);

});

let values = [];
module.exports.send = function(device, value){
  //console.log(message);
  if(device.dimmable){
    value = Math.round(Math.acos(Math.sqrt(value/100))/(Math.PI*50)*1000000);
    if(value<1000){
      value = 1000;
    }
  }
  client.publish('devices/' + device.deviceId, device.portId.toString() + value);
  //console.log('devices/' + device.deviceId, device.portId.toString() + value);
}
