import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/httpservice/user.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.userService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.userService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['/login']);
      };
    });
  }
}
