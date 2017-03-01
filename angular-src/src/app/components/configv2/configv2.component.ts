import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configv2',
  templateUrl: './configv2.component.html',
  styleUrls: ['./configv2.component.css']
})
export class Configv2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public isCollapsed:boolean = false;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

}
