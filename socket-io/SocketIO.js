const express = require('express');
const ltctrMqttClient = require('../mqtt/lightingControl');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const LightingControl = require('../mongodb/home-model/lightingControl');


io.on('connection', (socket) => {
  console.log('Socket.IO: user connected');

  socket.on('disconnect', function(){
    console.log('Socket.IO: user disconnected');
  });

  socket.on('test', message=>{
    console.log("---------------------------------")
    console.log(message);
  })

  socket.on('sensor-event', message=>{
    console.log(message);
    socket.broadcast.emit(message._id, message.value);
  })

  socket.on('device-event', (light) => {
    console.log(light);
    socket.broadcast.emit(light._id, light);
    LightingControl.findAndUpdateLight(light._id, light.value, result => {
      ltctrMqttClient.send(result, light.value);
    });
  });
});


// Port Number
const port = 4000;

// Start Server
http.listen(port, () => {
  console.log('Socket started on port '+ port);
});

module.exports = io;
