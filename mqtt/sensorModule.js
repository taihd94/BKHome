const mqtt = require('mqtt');
sensorClient = mqtt.connect('mqtt://localhost:1883');
const SensorModule = require('../mongodb/home-model/sensorModule');


sensorClient.on('connect',  () => {
  sensorClient.subscribe('devices/sensorModule/+');
  sensorClient.subscribe('lwt/sensorModule');
})

sensorClient.on('message', (topic, message) => {
    console.log("[" + topic + "]\n\r" + message);
    deviceId = topic.split("/")[2];
    let json = JSON.parse(message);
    SensorModule.updateSensors(deviceId, json, result=>{
      console.log(result);
    })
});
