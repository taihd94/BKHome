import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { HouseService} from '../../services/httpservice/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  floorId: String;
  rooms: [{
    name: String,
    floorId: String,
    imgPath: String,
    modules: [String]
  }];
  checkClick = true;
  checkFloor = true;
  roomDeletedName: String;
  roomDeletedId: String;
  roomAddedName: String;
  roomUrlName: String;

  constructor(
                private validateService: ValidateService,
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private router: Router
             ) { }

  ngOnInit() {
  }

  getRooms(floorId) {
    this.checkFloor = false;
    this.floorId = floorId;
    this.houseService.getRooms(floorId).subscribe(rooms => {
      if(rooms.length){
        this.rooms = rooms;
      } else {
        this.rooms = null;
        this.flashMessage.show('Not found any rooms. Please add new room', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  getDeletedRoom(id, name) {
    this.roomDeletedName = name;
    this.roomDeletedId = id;
  }

  deleteRoom(){
    this.houseService.deleteRoom({"id":this.roomDeletedId}).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.houseService.getRooms(this.floorId).subscribe(rooms => {
          if(rooms.length){
            this.rooms = rooms;
          } else {
            this.rooms = null;
            this.flashMessage.show('Not found any rooms. Please add new room', {cssClass: 'alert-danger', timeout: 3000});
          }
        })
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  addRoomSubmit(){
    this.checkClick = true;
    let newRoom = {
      "name": this.roomAddedName,
      "floorId": this.floorId,
      "imgPath": this.roomUrlName
    }
    this.houseService.addRoom(newRoom).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.houseService.getRooms(this.floorId).subscribe(rooms => {
          if(rooms.length){
            this.rooms = rooms;
          } else {
            this.rooms = null;
            this.flashMessage.show('Not found any rooms. Please add new room', {cssClass: 'alert-danger', timeout: 3000});
          }
        })
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    })
  }
}
