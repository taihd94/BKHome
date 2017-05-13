const mqtt = require('mqtt');
const accCtrlClient = mqtt.connect('mqtt://localhost:1883');

accCtrlClient.on('connect',  () => {
  accCtrlClient.subscribe('access-control');
  accCtrlClient.subscribe('lwt/access-control');


  accCtrlClient.publish('fgss1/authenticate', '');

})

accCtrlClient.on('message', (topic, message) => {
  console.log('--MQTT-------------------------')
  console.log("[" + topic + "]\n\r" + message);
  io.sockets.emit('access-control', message.toString());
});

module.exports = accCtrlClient;

const io = require('../socket-io/SocketIO');
