import { TestBed, inject } from '@angular/core/testing';
import { RoomEventService } from './room-event.service';

describe('RoomEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomEventService]
    });
  });

  it('should ...', inject([RoomEventService], (service: RoomEventService) => {
    expect(service).toBeTruthy();
  }));
});
