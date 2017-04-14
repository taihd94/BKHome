const mqtt = require('mqtt');
sensorClient = mqtt.connect('mqtt://localhost:1883');
var socket = require('../socket-io/socketio-client');

const SensorModule = require('../mongodb/home-model/sensorModule');

sensorClient.on('connect',  () => {
  sensorClient.subscribe('devices/sensorModule/+');
  sensorClient.subscribe('lwt/sensorModule');
})

sensorClient.on('message', (topic, message) => {
    console.log("[" + topic + "]\n\r");
    deviceId = topic.split("/")[2];
    let sensorModule = JSON.parse(message);
    SensorModule.updateSensorValue(deviceId, sensorModule, result=>{
      for(let sensor of result.sensors){
        socket.emit('sensor-event', sensor);
      }
    })
});
