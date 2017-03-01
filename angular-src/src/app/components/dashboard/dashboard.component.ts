import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../services/httpservice/house.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  home: Object;
  constructor(
    private authService: HouseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getHouse().subscribe(profile => {
      this.home = profile.home;
      console.log(this.home);
    },
    err => {
        console.log(err);
        return false;
    });
  }
}
