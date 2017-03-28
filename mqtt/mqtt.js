const mqtt = require('mqtt');
client = mqtt.connect('mqtt://localhost:1883');
const Devices = require('../mongodb/home-model/devices');
const LightingControl = require('../mongodb/home-model/lightingControl');


client.on('connect',  () => {
  client.subscribe('authenticate');
  client.subscribe('lwt')
})

client.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);
    switch(topic){
      case "authenticate":
        try{
          let device = new LightingControl(JSON.parse(message));
          switch(device.deviceType){
            case 'LightingControl':
                LightingControl.authenticateDevices(device, result => {
                  client.publish('authenticate/' + device.deviceCode, result.toString());
                });
                break;
            case 'SensorModule':
                break;
          }

        }
        catch(err) {
          console.log(err);
        }
        break;
    }
});

let values = [];
module.exports.publish = function(device, value){
  //console.log(message);
  if(device.dimmable){
    value = Math.round(Math.acos(Math.sqrt(value/100))/(Math.PI*50)*1000000);
    if(value<1000){
      value = 1000;
    }
  }
  client.publish('devices/' + device.deviceId, device.portId.toString() + value);
  console.log('devices/' + device.deviceId, device.portId.toString() + value);

}
