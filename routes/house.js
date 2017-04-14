const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const House = require('../mongodb/home-model/house');
const Floor = require('../mongodb/home-model/floor');
const Room = require('../mongodb/home-model/room');
const Devices = require('../mongodb/home-model/devices');


//------------FLOOR API--------------//
//Get list of floors
router.get('/floors', (req, res, next) => {
  Floor.getListOfFloors((result) => {
    res.json(result);
  });
});

//Add new floor
router.post('/floors', (req, res, next) => {
  let newFloor = new Floor({
      name: req.body.name,
      rooms: []
  });
  Floor.addfloor(newFloor, (result) => {
    res.json(result);
  });
});

//Delete floor
router.delete('/floors/:id', (req, res, next) => {
  floorId = req.params.id;

  Floor.deletefloor(floorId, (result) => {
    res.json(result);
  });
});



  //------------Room API--------------//
//get list of rooms in the floor which has _id = req.params.id
router.get('/floors/:floorid/rooms', (req, res, next) => {
  let floorId = req.params.floorid;
  Floor.getListOfRooms(floorId, (result) => {
    res.json(result);
  })
});

//delete room
router.delete('/floors/:floorid/rooms/:id', (req, res, next) => {
  roomId = req.params.id;
  Floor.deleteRoom(roomId, (result) => {
      res.json(result);
  });
});

//Add new room
router.post('/floors/:id/rooms', (req, res, next) => {
  let floorId = req.params.id;
  let newRoom = {
      name: req.body.name,
  };

  Floor.addNewRoom(floorId, newRoom, (result) => {
    res.json(result);
  });
});

//update imgPath to room
router.put('/floors/:floorid/rooms/:id/imgPath', (req, res, next) => {
  floorId = req.params.floorid;
  roomId = req.params.id;
  imgPath = req.body.imgPath;
  Floor.updateImgPath(floorId, roomId, imgPath, (result) => {
    res.json(result);
  });
});

// get list of devices in the room
router.get('/floors/rooms/:roomid/devices', (req, res, next) => {
  let roomId = req.params.roomid;
  Devices.getListOfDevicesInRoom(roomId, (result) => {
    res.json(result);
  })
});


//find Floor and Room by RoomId
router.get('/floors/rooms/:id',(req, res, next) => {
  let roomId = req.params.id;
  Floor.getFloorAndRoomByRoomId(roomId, result=>{
    res.json(result);
  })
})

module.exports = router;


//, passport.authenticate('authenticate', {session:false})
