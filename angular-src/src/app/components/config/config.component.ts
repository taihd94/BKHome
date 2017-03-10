import { Component, OnInit } from '@angular/core';
import { HouseService} from '../../services/httpservice/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  floorId: String;
  rooms: [{
    name: String,
    imgPath: String,
    modules: [String]
  }];
  checkClick = true;
  roomDeletedName: String;
  roomDeletedId: String;
  roomAddedName: String;
  roomUrlName: String;
  imgUrl: String;

  constructor(
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private router: Router
             ) { }

  ngOnInit() {
    console.log(environment.baseURL);
  }

  getRooms(floorId) {
    this.floorId = floorId;
    this.houseService.getListOfRooms(floorId).subscribe(rooms => {
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
    this.houseService.deleteRoom(this.floorId, this.roomDeletedId).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getRooms(this.floorId);
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  addRoomSubmit(){
    this.checkClick = true;
    let newRoom = {
      "name": this.roomAddedName,
      "imgPath": this.roomUrlName
    }
    this.houseService.addNewRoom(this.floorId, newRoom).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getRooms(this.floorId);
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    })
  }

  addImgSubmit(roomId) {
    console.log(roomId);
    console.log(this.imgUrl);
    let query = {
      "roomId": roomId,
      "imgPath": this.imgUrl
    }
    this.houseService.updateImgPath(this.floorId, roomId, query).subscribe(res=>{
      console.log(res);
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getRooms(this.floorId);
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    })
  }
}
