import { Component, OnInit } from '@angular/core';
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
  house: [{
    floors
  }];
  floors: [{
    name: String,
    id: String,
    rooms: String
  }]
  floorname: String;
  checkClick = true;
  deleteFloorName: String;

  constructor(
    private HouseService: HouseService,
    private authService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.HouseService.getHouse().subscribe(profile => {
      this.floors = profile.floors;
    },
    err => {
        console.log(err);
        return false;
    });
  }

  addFloor(){
    const floorname = this.floorname;
    this.HouseService.addFloor({"name":floorname}).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Success!!!', {cssClass: 'alert-success', timeout: 3000});
        this.HouseService.getHouse().subscribe(profile => {
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

  deleteFloor(deleteFloorName){
    console.log(this.deleteFloorName = deleteFloorName);
  }
}
