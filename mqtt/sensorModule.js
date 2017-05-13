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
