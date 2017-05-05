const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect',  () => {
  client.subscribe('access-control');
  client.subscribe('lwt/access-control');


  client.publish('fgss1/authenticate', '');

})

client.on('message', (topic, message) => {
  console.log('--MQTT-------------------------')
  console.log("[" + topic + "]\n\r" + message);
  io.sockets.emit('access-control', message.toString());
});

module.exports = client;

const io = require('../socket-io/SocketIO');
