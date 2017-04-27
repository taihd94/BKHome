const mqtt = require('mqtt');
authClient = mqtt.connect('mqtt://localhost:1883');
const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');


authClient.on('connect',  () => {
  authClient.subscribe('authenticate');
})

authClient.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);
    try{
      let json = JSON.parse(message);
      console.log(json);
      switch(json.deviceType){
        case 'LightingControl':
            let device = new LightingControl(json);
            return LightingControl.authenticateDevices(device)
            .then(result=>{
              authClient.publish('authenticate/' + device.deviceCode, result.toString());
            })
            break;
        case 'SensorModule':
            let ssModule = new SensorModule(json);
            return SensorModule.authenticateDevices(ssModule)
            .then(result=>{
              authClient.publish('authenticate/' + ssModule.deviceCode, result.toString());
              console.log("publish:" + 'authenticate/' + ssModule.deviceCode)
            })
            break;
      }
    }
    catch(err) {
      console.log(err);
    }
});
