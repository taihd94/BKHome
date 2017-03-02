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
  navbartest = "blhablahb";


  constructor(
    private houseService: HouseService,
    private authService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.houseService.getHouse().subscribe(profile => {
      this.floors = profile.floors;
    },
    err => {
        console.log(err);
        return false;
    });
  }

    addFloor(floorname){
    this.houseService.addFloor({"name":floorname}).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.houseService.getHouse().subscribe(profile => {
          this.floors = profile.floors;
        },
        err => {
            console.log(err);
            return false;
        });
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
      }
    });
    this.checkClick = !this.checkClick;
  }

  getFloor(name,floorId){
    this.floorDeletedName = name;
    this.selectedFloor.emit(floorId);
  }

  deleteFloor(){
    this.houseService.deleteFloor({"name":this.floorDeletedName}).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.houseService.getHouse().subscribe(profile => {
          this.floors = profile.floors;
        },
        err => {
            console.log(err);
            return false;
        });
      }else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
