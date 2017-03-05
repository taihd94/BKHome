var sim900 = import(../sim900/sim900);

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
});

port.on('open', function() {

});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data: ' + data);

  //{sensor1: {value: 1}}
  if(data.value == 1){
    sim900.on('open', function() {
      port.write('ATD01678163191\r', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
    });
  }
});
