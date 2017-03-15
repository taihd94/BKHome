import { Component, OnInit, OnChanges } from '@angular/core';
import { HouseService} from '../../../services/httpservice/house.service';
import { DeviceService} from '../../../services/httpservice/device.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnChanges {

  constructor(
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private deviceService: DeviceService,
                private router: Router
             ) { }


  listOfDevices: [Object];
  listOfFloors: [Object];


  ngOnInit() {
    this.deviceService.getListOfDevices().subscribe(devices=>{
      this.listOfDevices = devices;
    })
  }

  ngOnChanges(){

  }
}
