const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const LightingControl = require('../mongodb/home-model/lightingControl');

client.on('connect',  () => {
  client.subscribe('devices/+/+');
  client.subscribe('lwt/lightingControl');
})

client.on('message', (topic, message) => {
    // console.log("log from lightingcontrol")
    console.log(topic + ": " + message);
    let arr = topic.split('/')
    let deviceId = arr[1]
    let portId = arr[2]
    let value = parseInt(message.toString())
    LightingControl.getLightIdByDeviceId(deviceId, portId)
    .then(lightId=>{
      let message = {
        _id: lightId,
        value: value
      }
      console.log(message)
      io.sockets.emit('device-event', message)
    })
    .catch(err=>{
      console.log(err)
    })
});

module.exports = client
const io = require('../socket-io/SocketIO');
