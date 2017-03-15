import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import {HouseService} from '../../../services/httpservice/house.service';
import {UserService} from '../../../services/httpservice/user.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-config-navbar',
  templateUrl: './config-navbar.component.html',
  styleUrls: ['./config-navbar.component.css']
})
export class ConfigNavbarComponent implements OnInit {
  @Output() selectedFloor = new EventEmitter<Object>();
  @Output() selectedConfig = new EventEmitter<String>();

  selectedConfigLocal: String;
  listOfFloorHidden = true;
  floors: Object;
  addFloorFlag = true;
  floorSelectedId: String;
  floorDeletedName: String;
  navbartest = "blhablahb";
  test = false;
  active = {
    'background-color': '#f5f5f5',
    'color': 'black'
  }


  constructor(
    private houseService: HouseService,
    private authService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getFloors();
    this.selectedConfigLocal = localStorage.getItem('currentConfig');
    this.selectConfig(this.selectedConfigLocal);
  }

  selectConfig(config){
    localStorage.setItem('currentConfig', config);
    switch(config){
      case 'home':
        this.listOfFloorHidden = false;
        this.floorSelectedId = localStorage.getItem('currentFloor');
        this.selectedConfig.emit('home');
        break;
      case 'devices':
        this.listOfFloorHidden = true;
        this.selectedConfig.emit('devices');
        break;
      case 'scripts':
        this.listOfFloorHidden = true;
        this.selectedConfig.emit('scripts');
        break;
      case 'rules':
        this.listOfFloorHidden = true;
        this.selectedConfig.emit('rules');
        break;
    }
  }



  getFloors(){
    this.houseService.getListOfFloors().subscribe(res => {
      this.floors = res;
    },
    err => {
        console.log(err);
        return false;
    });
  }


  addFloor(floorname){
    this.houseService.addNewFloor({"name":floorname}).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getFloors();
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    });
    this.addFloorFlag = !this.addFloorFlag;
  }

  getFloor(name,floorId){
    localStorage.setItem('currentFloor', floorId);
    this.selectedConfig.emit('home');
    this.floorSelectedId = floorId;
    this.floorDeletedName = name;
  }

  deleteFloor(){
    this.houseService.deleteFloor(this.floorSelectedId).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getFloors();
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  checkSelectedFloor(floorId){
    if(floorId==this.floorSelectedId){
      return true;
    } else {
      return false;
    }
  }
}
