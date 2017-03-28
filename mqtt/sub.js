var mqtt = require('mqtt')

client = mqtt.connect('mqtt://localhost:1883');

client.on('connect',  () => {
  client.subscribe('devices/58d9d7bdcd7ada2f6f6a28ef');
  client.subscribe('lwt')
})

client.on('message', (topic, message) => {
    console.log("[" + topic + "]" + message);
});

console.log('Client started...');

module.exports = client;
