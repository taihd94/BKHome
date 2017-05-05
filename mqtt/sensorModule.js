const mqtt = require('mqtt');
client = mqtt.connect('mqtt://localhost:1883');
const socket = require('../socket-io/socketio-client');

const SensorModule = require('../mongodb/home-model/sensorModule');

client.on('connect',  () => {
  client.subscribe('devices/sensorModule/+');
  client.subscribe('lwt/sensorModule');
})

client.on('message', (topic, message) => {
    console.log("[" + topic + "]\n\r");
    deviceId = topic.split("/")[2];
    try{
      let sensorModule = JSON.parse(message);
      return SensorModule.updateSensorValue(deviceId, sensorModule)
      .then(sensors=>{
        for(let sensor of sensors){
          socket.emit('sensor-event', sensor);
        }
      })
    }catch(err) {
      console.log(err);
    }
});
