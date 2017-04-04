const express = require('express');
const ltctrMqttClient = require('../mqtt/lightingControl');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Devices = require('../mongodb/home-model/devices');
const LightingControl = require('../mongodb/home-model/lightingControl');

io.on('connection', (socket) => {
  console.log('Socket.IO: user connected');

  socket.on('disconnect', function(){
    console.log('Socket.IO: user disconnected');
  });

  socket.on('device-event', (message) => {
    socket.broadcast.emit(message.lightId, {type:'new-message', text: message});
    console.log(message);
    LightingControl.findAndUpdateLight(message.lightId, message.value, result => {
      ltctrMqttClient.send(result, message.value);
    });
  });
});

// Port Number
const port = 4000;

// Start Server
http.listen(port, () => {
  console.log('Socket started on port '+ port);
});
