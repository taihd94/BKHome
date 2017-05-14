const mqtt = require('mqtt');
ssmdClient = mqtt.connect('mqtt://localhost:1883');
const socket = require('../socket-io/socketio-client');

const SensorModule = require('../mongodb/home-model/sensorModule');

ssmdClient.on('connect',  () => {
  ssmdClient.subscribe('devices/sensorModule/+');
  ssmdClient.subscribe('lwt/sensorModule');
})

ssmdClient.on('message', (topic, message) => {
    console.log("[" + topic + "]\n\r");
    deviceId = topic.split("/")[2];
    let promise = new Promise((resolve, reject)=>{
      resolve(JSON.parse(message))
    })
    promise.then(module=>{
      console.log('//////////////')
      console.log(module)
      return SensorModule.updateSensorValue(deviceId, module)
    })
    .then(module=>{
      // console.log(module.sensors)
      for(let sensor of module.sensors){
        socket.emit('sensor-event', sensor);
      }
    })
    .catch(err=> {
      console.log(err);
    })
});
