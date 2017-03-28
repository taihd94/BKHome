import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class SocketioService {
  private url = window.location.hostname + ':4000';
  private socket;

  constructor() {
    console.log(this.url);
  }

  connect(){
    this.socket = io(this.url);
  }


  sendMessage(event, message){
    this.socket.emit(event, message);
  }

  getMessages(roomId) {
    let observable = new Observable(observer => {
      //this.socket = io(this.url);
      this.socket.on(roomId, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}
