import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { HouseService} from '../../../../services/httpservice/house.service';
import { DeviceService} from '../../../../services/httpservice/device.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';

@Component({
  selector: 'app-lightingcontrol',
  templateUrl: './lightingcontrol.component.html',
  styleUrls: ['./lightingcontrol.component.css']
})
export class LightingcontrolComponent implements OnInit {
  @Input() lightingControl;
  constructor(
              private flashMessage: FlashMessagesService,
              private houseService: HouseService,
              private deviceService: DeviceService,
              private router: Router
              ) { }

  listOfFloors: [{
    name: String
    rooms: [{
      _id
      name: String
    }]
  }];
  listOfRooms: [{
    _id: String,
    name: String
  }];
  selectedFloor: String;
  selectedRoom: String;
  roomFoundFlag = false;
  saveBtnHidden = true;
  permission: Boolean;

  ngOnInit() {
    this.houseService.getListOfFloors().subscribe(floors=>{
      this.listOfFloors = floors;
      if(this.lightingControl.roomId){
        for(let i = 0; i < this.listOfFloors.length; i++){
          for(let j = 0; j < this.listOfFloors[i].rooms.length; j++){
            if(this.listOfFloors[i].rooms[j]._id == this.lightingControl.roomId){
              this.selectedRoom = this.listOfFloors[i].rooms[j].name;
              this.selectedFloor = this.listOfFloors[i].name;
              this.listOfRooms = this.listOfFloors[i].rooms;
              this.roomFoundFlag = true;
              break;
            }
          }
        }
      }
      if(!this.roomFoundFlag) {
        this.selectedFloor = "Select floor";
        this.selectedRoom = "Select room";
      }
      this.permission = this.lightingControl.allowedToAccess;
    })
  };

  selectFloor(floor){
    this.selectedFloor = floor.name;
    this.selectedRoom = "Select room";
    this.listOfRooms = floor.rooms;
  }

  selectRoom(room){
    let query = {
      roomId: room._id
    }
    this.deviceService.updateRoomId(this.lightingControl._id, query).subscribe(res=>{
      if(res.success){
        this.selectedRoom = room.name;
      } else {
        console.log("something went wrong");
      }
    })
  }

  values = '';

  lookup(lightId){
    for(let i = 0; i < this.lightingControl.lights.length; i++){
      if(this.lightingControl.lights[i]._id == lightId){
        return i;
      }
    }
    console.log("lightId not found");
  }

  edit(lightId, event: any) { // without type info
    let field = event.target.name;
    let value = event.target.value;
    let index = this.lookup(lightId);
    switch(field){
      case "name":
        this.lightingControl.lights[index].name = value;
        break;
      case "kind":
        this.lightingControl.lights[index].kind = value;
        break;
      case "power":
        this.lightingControl.lights[index].power = Number(value);
        break;
      case "life_time":
        this.lightingControl.lights[index].life_time = Number(value);
        break;
    }
  }

  selectKindOfLight(lightId, value){
    let index = this.lookup(lightId);
    this.lightingControl.lights[index].kind = value;
    this.saveBtnHidden = false;
  }

  save(){
    this.deviceService.updateLights(this.lightingControl._id, this.lightingControl).subscribe(res=>{
      if(!res.success){
        console.log("something went wrong");
      }
    })
    this.saveBtnHidden = true;
  }

  showSaveBtn(){
    this.saveBtnHidden = false;
  }

  changePermission(){
    let json = {
      'permission': this.permission
    }
    this.deviceService.updatePermission(this.lightingControl._id, json).subscribe(res=>{
      console.log(res);
    })
  }

}
