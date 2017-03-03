const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const House = require('../mongodb/home-model/house');
const Floor = require('../mongodb/home-model/floor');
const Room = require('../mongodb/home-model/room');

router.get('/gethouse', passport.authenticate('gethouse', {session:false}), (req, res, next) => {
  res.json({house: req.user});
});

//------------FLOOR API--------------//
//Get list of floors
router.get('/floors/getfloors', passport.authenticate('getListOfFloors', {session:false}), (req, res, next) => {
  res.json({floors: req.user});
});

//Add new floor
router.post('/floors/addfloor', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
  let newFloor = new Floor({
      name: req.body.name,
      rooms: []
  });

  Floor.addfloor(newFloor, (err, user) => {
    if(err){
      throw err;
      console.log("Add new floor: failed");
      res.json({success: false, msg:'Failed to add new floor'});
    } else {
      console.log("Add new floor: success");
      res.json({success: true, msg:'Successfully added new floor'});
    }
  });
});

//Delete floor
router.post('/floors/deletefloor', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
  let query = {
      name: req.body.name
  };

  Floor.deletefloor(query, (err, floor) => {
    if(err){
      throw err
      res.json({success: false, msg:'Failed to delete floor: ' + query.name});
    } else {
      console.log('Deleted ' + query.name);
      res.json({success: true, msg:'Deleted floor: ' + query.name});
    }
  });
});



  //------------Room API--------------//
  //get list of rooms in the floor which has _id = req.params.id
router.get('/floors/:floorid/getrooms', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
  let floorId = req.params.floorid;
  Room.getListOfRooms(floorId, (err, rooms) => {
    if(err){
      throw err;
    }
    if(!rooms) {
      console.log("Not room found");
    }else {
      res.json(rooms);
    }
  })
});

  //delete room
  router.post('/rooms/deleteroom', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
    roomId = req.body.id;

    Room.deleteRoom(roomId, (err, room) => {
      if(err){
        throw err;
        res.json({success: false, msg:'Failed to delete room'});
      } else {
        console.log('Deleted room');
        res.json({success: true, msg:'Deleted room'});
      }
    });
  });

  //Add new room
  router.post('/rooms/addroom', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
    let newRoom = new Room({
        name: req.body.name,
        floorId: req.body.floorId,
        imgPath: req.body.imgPath,
        modules: []
    });

    Room.addRoom(newRoom, (err, room) => {
      if(err){
        throw err;
        res.json({success: false, msg:'Failed to add new room'});
      } else {
        res.json({success: true, msg:'Successfully added new room'});
      }
    });
  });

  //Add imgPath to room
  router.post('/rooms/updateimg', passport.authenticate('authenticate', {session:false}), (req, res, next) => {
    imgPath = req.body.imgPath;
    roomId = req.body.roomId;
    Room.updateImgPath(roomId, imgPath, (err, room) => {
      if(err){
        throw err;
        res.json({success: false, msg:'Failed to update imgPath'});
      } else {
        res.json({success: true, msg:'Successfully updated imgPath'});
      }
    });
  });
module.exports = router;
