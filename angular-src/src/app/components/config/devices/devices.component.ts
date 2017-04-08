import { Component, OnInit, OnChanges } from '@angular/core';
import { DeviceService} from '../../../services/rest-api/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnChanges {

  constructor(
                private deviceService: DeviceService
             ) { }


  listOfDevices: [Object];


  ngOnInit() {
    this.deviceService.getListOfDevices().subscribe(devices=>{
      this.listOfDevices = devices;
    })
  }

  ngOnChanges(){

  }
}
