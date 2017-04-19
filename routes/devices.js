 const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');
const Devices = require('../mongodb/home-model/devices');


router.post('/authenticate', (req,res,next)=>{
  console.log(req.body);
  let device = new LightingControl(req.body);

  LightingControl.authenticateDevices(device, result => {
    res.json(result);
  })
});

router.get('/', (req, res, next)=>{
  Devices.getListOfDevices((result)=>{
    res.json(result);
  })
})


router.put('/:id/room-id', (req, res, next) => {
  let deviceId = req.params.id;
  let roomId = req.body.roomId;

  if(roomId){
    Devices.updateRoomId(deviceId, roomId, (result)=>{
      res.json(result);
    })
  }else {
    res.json({success: false, msg:"roomId is not defined"})
  }
})

router.put('/:id/permission', (req, res, next) => {
  let deviceId = req.params.id;
  let permission = req.body.permission;

  Devices.updatePermission(deviceId, permission, result=>{
    res.json(result);
  })
})

router.put('/:id/lights', (req, res, next) => {
  let deviceId = req.params.id;
  let lightingcontrol = req.body;
  LightingControl.updateLights(deviceId, lightingcontrol, result=>{
    res.json(result);
  })
})

router.put('/:id/sensors', (req, res, next) => {
  let deviceId = req.params.id;
  let sensorModule = req.body;
  SensorModule.updateSensorName(deviceId, sensorModule, result=>{
    res.json(result);
  })
})

router.get('/lighting-controls/lights/:id', (req, res, next)=>{
  let lightId = req.params.id;
  LightingControl.getLightDetails(lightId, result=>{
    res.json(result);
  })
})

router.get('/sensor-modules/sensors/:id', (req, res, next)=>{
  let sensorId = req.params.id;
  SensorModule.getSensorDetails(sensorId, result=>{
    res.json(result);
  })
})

router.get('/items/:id', (req, res, next)=>{
  let itemId = req.params.id;
  LightingControl.getLightDetails(itemId, result=>{
    if(result.success){
      result._type = 'light';
      res.json(result);
    } else {
      SensorModule.getSensorDetails(itemId, result=>{
        result._type = 'sensor';
        res.json(result);
      })
    }
  })
})


module.exports = router;
