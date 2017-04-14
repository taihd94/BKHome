import { Component, OnInit, Input } from '@angular/core';
import {MessageEvent} from '../../../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  @Input() light;
  message;
  lightValue: Number;
  preLightValue: Number;
  switchValue: Number;

  constructor(
    private messageEvent: MessageEvent,
  ) { }

  ngOnInit() {
    this.lightValue = this.switchValue = this.light.value;
    this.messageEvent.emit("socketOn", this.light._id);
    this.messageEvent.on(this.light._id)
     .subscribe(message => {
       this.message = message;
       this.lightValue = this.message.value;
       this.preLightValue = this.switchValue = this.lightValue;
       console.log(message);
    });
  }


  sendMessage(value){
    let message = {
        _id: this.light._id,
        value: value
    }
    this.messageEvent.emit("socketEmit", message);
  }

  getValue(value){
    this.preLightValue = this.switchValue = value;

    if(!this.light.dimmable){
      value = value&1;
    }
    this.sendMessage(value);
  }

  getSwitchValue(value){
    if(!value){
      this.lightValue = 0;
    } else {
      if(this.preLightValue == 0){
        this.lightValue = 50;
      } else {
        this.lightValue = this.preLightValue;
      }
    }
    this.sendMessage(this.lightValue);
  }

}
