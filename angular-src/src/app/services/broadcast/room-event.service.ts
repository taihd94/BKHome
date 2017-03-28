import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from './broadcaster.service';


@Injectable()
export class RoomEvent {
  constructor(private broadcaster: Broadcaster) {}

  emit(roomId, data): void {
    this.broadcaster.broadcast(roomId, data);
  }

  on(roomId): Observable<string> {
    this.broadcaster.broadcast('SocketOn', roomId);
    return this.broadcaster.on<string>(roomId);
  }
}
