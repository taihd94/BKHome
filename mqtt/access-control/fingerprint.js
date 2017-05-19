const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const io = require('../../socket-io/SocketIO');

client.on('connect',  () => {
  client.subscribe('access-control/fingerprint/#');
  client.subscribe('lwt/access-control/fingerprint');
  client.publish('fgss1/authenticate', '');
})

client.on('message', (topic, message) => {
  // console.log("log from fingerprint")
  console.log('--MQTT-------------------------')
  console.log("[" + topic + "]\n\r" + message);
  io.sockets.emit('access-control/fingerprint/message', message.toString());
});

module.exports = client;
