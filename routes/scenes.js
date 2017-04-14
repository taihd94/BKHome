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

router.get('/:id/devices', (req, res, next)=>{
  let sceneId = req.params.id;
  Scenes.findSceneById(sceneId, result=>{
    if(result.success){
      LightingControl.getLightsDetail(result.scene.devices, result=>{
        res.json({success: true, rooms: result});
      });
    }
  })

})

router.post('/', (req, res, next)=>{
  let newScene = req.body;
  Scenes.addNewScene(newScene, result=>{
    res.json(result);
  })
})

router.put('/:id', (req, res, next)=>{
  let sceneId = req.params.id;
  let newScene = req.body;
  Scenes.updateScene(sceneId, newScene, result=>{
    res.json(result);
  })
})

router.delete('/:id', (req, res, next)=>{
  let sceneId = req.params.id;
  Scenes.deleteScene(sceneId, result=>{
    res.json(result);
  })
})

module.exports = router;
