import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Broadcaster} from './broadcaster.service';


@Injectable()
export class MessageEvent {
  constructor(private broadcaster: Broadcaster) {}

  emit(event, data): void {
    this.broadcaster.broadcast(event, data);
  }

  on(event): Observable<string> {
    return this.broadcaster.on<string>(event);
  }
}
