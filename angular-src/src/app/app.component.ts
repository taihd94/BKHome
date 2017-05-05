import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {MessageEventService} from './services/broadcast/message-event.service';
import {BroadcasterService} from './services/broadcast/broadcaster.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
                private socketioService:SocketioService,
                private broadcaster: BroadcasterService,
                private messageEvent: MessageEventService,
             ) {
             }

   private url = window.location.hostname + ':4000';
   private socket

   ngOnInit() {
      this.socket = io(this.url);

      this.socket.on('device-event', (data) => {
        this.messageEvent.emit(data._id, data);
      });

      this.messageEvent.on('device-event')
      .subscribe(message=>{
        this.socket.emit("device-event", message);
      })

      this.socket.on('access-control', data=>{
        this.messageEvent.emit('access-control/receive', data);
      })

      this.messageEvent.on('access-control')
      .subscribe(message=>{
        this.socket.emit("access-control", message);
      })
   }
}
