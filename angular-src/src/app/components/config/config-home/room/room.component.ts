import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { HouseService} from '../../../../services/rest-api/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})

export class RoomComponent implements OnInit, OnDestroy {
  @Input() floorId;
  @Input() room;
  @Output() roomChange = new EventEmitter();

  roomId: String;
  checkClick = true;
  roomDeletedName: String;
  roomDeletedId: String;
  roomUrlName: String;
  imgUrl: String;
  devices: any;
  lightingControls = [];
  sensorModules = [];

  constructor(
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private router: Router
             ) {}


  ngOnInit() {
    this.roomId = this.room._id;
    this.houseService.getListOfDevicesInRoom(this.room._id).subscribe(res=>{
        this.devices = res.devices;
        if(this.devices){
          for(let device of this.devices){
            switch(device.deviceType){
              case "LightingControl":
                this.lightingControls.push(device);
                break;
              case "SensorModule":
                this.sensorModules.push(device);
                break;
            }
          }
        }
    });
  }

  ngOnDestroy() {
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


  addImgSubmit(imgUrl) {
    let query = {
      "roomId": this.roomId,
      "imgPath": imgUrl
    }
    this.houseService.updateImgPath(this.floorId, this.roomId, query).subscribe(res=>{
      if(!res.success){
        console.log(res.msg);
      } else {
        this.room.imgPath = imgUrl;
      }
    })
  }

}
