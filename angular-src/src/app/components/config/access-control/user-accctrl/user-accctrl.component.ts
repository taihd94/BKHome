import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AccessControlService } from '../../../../services/rest-api/access-control.service';
import { MessageEventService } from '../../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-user-accctrl',
  templateUrl: './user-accctrl.component.html',
  styleUrls: ['./user-accctrl.component.css']
})
export class UserAccctrlComponent implements OnInit, OnChanges {
  @Input() user;
  @Output() deleteUserEvent = new EventEmitter();

  constructor(
    public accessControlService: AccessControlService,
    public messageEvent: MessageEventService
  ) { }

  row_1_hidden = false;
  row_2_hidden = true;
  grayFilter = {filter: 'grayscale(100%)', color: 'gray'};
  isRFIDAvailable = false;
  isFingerprintAvailable = false;
  avatar: String;
  sensorMessage: String;
  sensorMessage2: String;
  messageHandle: any;

  ngOnInit() {
    if(!this.user.imgPath){
      this.user.imgPath = "./assets/images/avatars/NoAvatar.jpg";
    }

    this.avatar = this.user.imgPath;
    this.sensorMessage = "Place your finger";
    this.sensorMessage2 = "on the sensor";
  }

  ngOnChanges(){
    console.log("changed")
  }

  addImgSubmit(imgPath){
    this.user.imgPath = imgPath;
    let body = {
      imgPath: imgPath
    }
    this.accessControlService.updateImgPath(this.user._id, body).subscribe(res=>{
      if(!res.success){
        console.log(res.msg)
      }
    })
  }

  connectSensor(){
    this.sensorMessage = "Place your finger";
    this.sensorMessage2 = "on the sensor";

    this.messageHandle = this.messageEvent.on('access-control/receive').subscribe((message:String)=>{
      console.log(message);
      this.sensorMessage2 = '';
      this.sensorMessage = message;
      if(message==="Complete!"){
        this.messageHandle.unsubscribe();
      }
    })
    let message = {
      sensor: 'fingerprint',
      command: 'enrol'
    }
    this.messageEvent.emit('access-control', message);
  }

  unSubscribe(){
    this.messageHandle.unsubscribe();
  }

  deleteUser(){
    this.accessControlService.deleteUser(this.user._id).subscribe(res=>{
      console.log(res);
      this.deleteUserEvent.emit();
    })
  }

}