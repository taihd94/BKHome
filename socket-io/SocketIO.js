const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const LightingControl = require('../mongodb/home-model/lightingControl');
const Rules = require('../mongodb/home-model/rules');

const ltctrlMQTT = require('../mqtt/lightingControl');
const accctrlMQTT = require('../mqtt/accessControl');


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
    socket.broadcast.emit('device-event', light);
    LightingControl.findAndUpdateLight(light._id, light.value)
    .then(result=>{
      ltctrlMQTT.send(result, light.value)
      return Promise.resolve(true)
    })
    .then(()=>{
      return Rules.checkOperations(light)
    })
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err);
    })
  });

  socket.on('access-control', message=>{
    let sensor = message.sensor;
    let command = message.command;
    switch (sensor) {
      case 'fingerprint':
        accctrlMQTT.publish('fgss1/' + command, '')
        break;
      default:
    }
  })
});


// Port Number
const port = 4000;

// Start Server
http.listen(port, () => {
  console.log('Socket started on port '+ port);
});

module.exports = io;
