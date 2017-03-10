import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { HouseService} from '../../../services/httpservice/house.service';
import { DeviceService} from '../../../services/httpservice/device.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sensor-module',
  templateUrl: './sensor-module.component.html',
  styleUrls: ['./sensor-module.component.css']
})
export class SensorModuleComponent implements OnInit {
  @Input() sensorModule;
  @Input() listOfFloors;
  constructor(
              private flashMessage: FlashMessagesService,
              private houseService: HouseService,
              private deviceService: DeviceService,
              private router: Router
              ) { }

  listOfRooms: [{
    _id: String,
    name: String
  }];
  selectedFloor: String;
  selectedRoom: String;
  roomFoundFlag = false;

  ngOnInit() {
    this.houseService.getListOfFloors().subscribe(floors=>{
      this.listOfFloors = floors;
      if(this.sensorModule.roomId){
        for(let i = 0; i < this.listOfFloors.length; i++){
          for(let j = 0; j < this.listOfFloors[i].rooms.length; j++){
            if(this.listOfFloors[i].rooms[j]._id == this.sensorModule.roomId){
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
    })
  };

  selectFloor(floor){
    this.selectedFloor = floor.name;
    this.selectedRoom = "Select room";
    this.listOfRooms = floor.rooms;
  }

  selectRoom(room){
    let query = {
      moduleType: "SensorModule",
      module_id: this.sensorModule._id,
      room_id: room._id
    }
    this.deviceService.updateRoomId(this.sensorModule._id, query).subscribe(res=>{
      if(res.success){
        this.selectedRoom = room.name;
      } else {
        console.log("something went wrong");
      }
    })
  }
}
