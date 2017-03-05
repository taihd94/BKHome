var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
});

port.on('open', function() {
  port.write('ATD01678163191\r', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data: ' + data);
});

module.export = port;
