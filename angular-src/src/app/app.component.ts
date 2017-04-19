import { Component, OnInit } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {MessageEventService} from './services/broadcast/message-event.service';
import {BroadcasterService} from './services/broadcast/broadcaster.service';

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

   ngOnInit() {
     this.socketioService.connect();

     this.messageEvent.on('socketOn')
      .subscribe(event => {
        this.socketioService.getMessages(event).subscribe((message)=>{
          this.messageEvent.emit(event, message);
        });
      });

     this.messageEvent.on('device-event')
      .subscribe(message=>{
        this.socketioService.sendMessage("device-event", message);
      })

   }
  title = 'app works!';
}
