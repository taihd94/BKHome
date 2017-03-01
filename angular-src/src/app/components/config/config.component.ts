import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { HouseService} from '../../services/httpservice/house.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  floorName: String;
  roomName: String;
  moduleName: String;
  moduleKind: String;
  lightControl: String;
  sensor: String;


  constructor(
                private validateService: ValidateService,
                private flashMessage: FlashMessagesService,
                private authService: HouseService,
                private router: Router
             ) { }

  ngOnInit() {
  }


      // Register user
    //this.authService.registerUser(user).subscribe(data => {
      //if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/login']);
    //  } else {
      //  this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/register']);
      //}
    //})


}
