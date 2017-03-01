const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const House = require('../mongodb/home-model/house');
const Floor = require('../mongodb/home-model/floor');


router.get('/gethouse', passport.authenticate('gethouse', {session:false}), (req, res, next) => {
  res.json({house: req.user});
});

router.get('/floors', passport.authenticate('getListOfFloors', {session:false}), (req, res, next) => {
  res.json({floors: req.user});
});

router.post('/floors/addfloor', (req, res, next) => {

  let newFloor = new Floor({
      name: req.body.name,
      rooms: [
      ]
  });

  Floor.addfloor(newFloor, (err, user) => {
    if(err){
      console.log("Failed");
      res.json({success: false, msg:'Failed to add new floor'});
    } else {
      console.log("success");
      res.json({success: true, msg:'success'});
    }
  });
});
module.exports = router;
