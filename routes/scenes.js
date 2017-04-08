 const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');
const Scenes = require('../mongodb/home-model/scenes');



router.get('/', (req, res, next)=>{
  Scenes.getListOfScenes((result)=>{
    res.json(result);
  })
})

module.exports = router;
