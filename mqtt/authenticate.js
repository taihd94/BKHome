const mqtt = require('mqtt');
authClient = mqtt.connect('mqtt://localhost:1883');
const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');


authClient.on('connect',  () => {
  authClient.subscribe('authenticate');
})

authClient.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);
    let promise = new Promise((resolve, reject)=>{
      let device = JSON.parse(message);
      switch(device.deviceType){
        case 'LightingControl':
            return LightingControl.authenticateDevices(device)
            .then(result=>{
              console.log('authenticate/' + device.deviceCode, result.toString());
              authClient.publish('authenticate/' + device.deviceCode, result.toString());
              // authClient.publish('helloasdfasfefadf/lt04', '59117556dca0240a35657120');
            })
            break;
        case 'SensorModule':
            let ssModule = new SensorModule(json);
            SensorModule.authenticateDevices(ssModule)
            .then(result=>{
              authClient.publish('authenticate/' + ssModule.deviceCode, result.toString());
              console.log("publish:" + 'authenticate/' + ssModule.deviceCode)
            })
            break;
      }
    })
    .catch(err=>{
      console.log(err)
    })


});
