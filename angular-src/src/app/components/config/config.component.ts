import { Component, OnInit } from '@angular/core';
import { HouseService} from '../../services/httpservice/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  selectedFloorId: String;
  listOfRoomsHidden = true;
  switch_config_name: String;
  constructor(
                private flashMessage: FlashMessagesService,
                private houseService: HouseService,
                private router: Router,
             ) { }

  ngOnInit() {
  }

  selectedFloor(floorId) {
    this.selectedFloorId = floorId;
  }

  selectedConfig(config){
    switch(config){
      case 'home':
        this.switch_config_name = 'home';
        this.selectedFloorId = localStorage.getItem('currentFloor');
        break;
      case 'devices':
      this.switch_config_name = 'devices';
        break;
      case 'scripts':
      this.switch_config_name = 'scripts';
        break;
      case 'rules':
      this.switch_config_name = 'rules';
        break;
    }
  }

}
