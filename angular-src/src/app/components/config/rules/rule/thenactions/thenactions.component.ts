import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thenactions',
  templateUrl: './thenactions.component.html',
  styleUrls: ['./thenactions.component.css']
})
export class ThenactionsComponent implements OnInit {
  @Input() thenActions;
  constructor() { }

  ngOnInit() {
    // console.log(this.thenActions);
  }

  getSwitchValue(value){
    console.log(value);
  }

}
