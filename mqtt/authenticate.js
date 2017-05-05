const mqtt = require('mqtt');
client = mqtt.connect('mqtt://localhost:1883');
const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');


client.on('connect',  () => {
  client.subscribe('authenticate');
})

client.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);
    try{
      let json = JSON.parse(message);
      console.log(json);
      switch(json.deviceType){
        case 'LightingControl':
            let device = new LightingControl(json);
            return LightingControl.authenticateDevices(device)
            .then(result=>{
              client.publish('authenticate/' + device.deviceCode, result.toString());
            })
            break;
        case 'SensorModule':
            let ssModule = new SensorModule(json);
            return SensorModule.authenticateDevices(ssModule)
            .then(result=>{
              client.publish('authenticate/' + ssModule.deviceCode, result.toString());
              console.log("publish:" + 'authenticate/' + ssModule.deviceCode)
            })
            break;
      }
    }
    catch(err) {
      console.log(err);
    }
});
