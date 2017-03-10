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

  floors: Object;
  checkClick = true;
  floorDeletedName: String;
  floorDeletedId: String;
  navbartest = "blhablahb";


  constructor(
    private houseService: HouseService,
    private authService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  getFloors(){
    this.houseService.getListOfFloors().subscribe(res => {
      this.floors = res;
    },
    err => {
        console.log(err);
        return false;
    });
  }

  ngOnInit() {
    this.getFloors();
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
    this.checkClick = !this.checkClick;
  }

  getFloor(name,floorId){
    this.floorDeletedName = name;
    this.floorDeletedId = floorId;
    this.selectedFloor.emit(floorId);
  }

  deleteFloor(){
    this.houseService.deleteFloor(this.floorDeletedId).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.getFloors();
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
