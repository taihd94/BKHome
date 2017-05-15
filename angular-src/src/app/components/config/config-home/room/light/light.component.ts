import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {MessageEventService} from '../../../../../services/broadcast/message-event.service';
import {BroadcasterService} from '../../../../../services/broadcast/broadcaster.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit, OnDestroy {
  @Input() light;

  messageEvent: any;
  lightValue: Number;
  preLightValue: Number;
  switchValue: Number;

  constructor(
    private messageSerivce: MessageEventService,
    private broadcaster: BroadcasterService
  ) {}

  ngOnInit() {
    this.lightValue = this.switchValue = this.light.value;
    this.messageEvent = this.messageSerivce.on(this.light._id)
     .subscribe((message:any) => {
       this.lightValue = message;
       this.preLightValue = this.switchValue = this.lightValue;
       console.log(message);
    });
  }

  ngOnDestroy(){
    this.messageEvent.unsubscribe();
  }


  sendMessage(value){
    let message = {
        _id: this.light._id,
        value: value
    }
    this.messageSerivce.emit("device-event", message);
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
