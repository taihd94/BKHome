import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BroadcasterService} from './broadcaster.service';

@Injectable()
export class MessageEventService {

  constructor(private broadcaster: BroadcasterService) {}

  emit(event, data): void {
    this.broadcaster.broadcast(event, data);
  }

  on(event): Observable<string> {
    return this.broadcaster.on<string>(event);
  }

}
