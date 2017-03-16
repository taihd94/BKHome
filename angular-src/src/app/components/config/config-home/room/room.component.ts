import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { HouseService} from '../../../../services/httpservice/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  @Input() floorId;
  @Input() room;
  @Output() roomChange = new EventEmitter();

  checkClick = true;
  roomDeletedName: String;
  roomDeletedId: String;
  roomUrlName: String;
  imgUrl: String;
  devices: [Object];
  device: {
    deviceType: String
  }

  constructor(
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private router: Router
             ) { }

  ngOnInit() {
    this.houseService.getListOfDevicesInRoom(this.floorId, this.room._id).subscribe(res=>{
        this.devices = res.devices;
        if(this.devices){
          this.devices.forEach(function (value: {deviceType: String}) {
            // console.log(value.deviceType);
          });
        }
    });
  }


  getDeletedRoom(id, name) {
    this.roomDeletedName = name;
    this.roomDeletedId = id;
  }

  deleteRoom(){
    this.houseService.deleteRoom(this.floorId, this.roomDeletedId).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        //this.test = !this.test;
        this.roomChange.emit();
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
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
        //this.getRooms(this.floorId);
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    })
  }

}