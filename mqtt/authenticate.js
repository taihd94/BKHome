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
      resolve(JSON.parse(message))
    })
    promise.then(device=>{
      switch(device.deviceType){
        case 'LightingControl':
            return LightingControl.authenticateDevices(device)
        case 'SensorModule':
            return SensorModule.authenticateDevices(device)
      }
    })
    .then(device=>{
      console.log(device)
      console.log('authenticate/' + device.deviceCode, device._id.toString());
      authClient.publish('authenticate/' + device.deviceCode, device._id.toString());
      // authClient.publish('helloasdfasfefadf/lt04', '59117556dca0240a35657120');
    })
    .catch(err=>{
      console.log(err)
    })
});
