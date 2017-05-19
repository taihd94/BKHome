const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const io = require('../socket-io/SocketIO');

const SensorModule = require('../mongodb/home-model/sensorModule');

client.on('connect',  () => {
  client.subscribe('devices/sensorModule/+');
  client.subscribe('lwt/sensorModule');
})

client.on('message', (topic, message) => {
    // console.log("log from sensor module")
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
      console.log(module.sensors)
      for(let sensor of module.sensors){
        io.sockets.emit('device-event', sensor);
      }
    })
    .catch(err=> {
      console.log(err);
    })
});

module.exports = client;
