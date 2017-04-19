import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessageEventService} from '../../../../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-light-scene',
  templateUrl: './light-scene.component.html',
  styleUrls: ['./light-scene.component.css']
})
export class LightSceneComponent implements OnInit {

    @Input() sceneId;
    @Input() light;
    @Input() editHidden;
    @Output() remove = new EventEmitter<Object>();

    lightValue: Number;
    preLightValue: Number;
    switchValue: Number;

    constructor(
      private messageEvent: MessageEventService
    ) { }

    ngOnInit() {
      this.lightValue = this.switchValue = this.light.value;
    }

    emitLightValue(value){
      let light = {
        _id: this.light._id,
        value: value
      }
      this.messageEvent.emit(this.sceneId + '/changeLightValue',light);
    }


    getValue(value){
      this.preLightValue = this.switchValue = value;

      if(!this.light.dimmable){
        value = value&1;
      }

      this.emitLightValue(value);
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

      this.emitLightValue(value);
    }

    removeLight(){
      this.remove.emit(this.light);
      let data = {
        _id: this.light._id,
        value: this.lightValue
      }
      this.messageEvent.emit(this.sceneId + '/removeLight', data);
    }

}
