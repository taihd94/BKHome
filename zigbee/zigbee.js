var serialport = require("serialport");
var SerialPort = serialport;

var serialPort = new SerialPort("/dev/cu.usbmodem14131", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});
