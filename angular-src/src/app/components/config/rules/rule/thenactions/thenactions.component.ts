import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thenactions',
  templateUrl: './thenactions.component.html',
  styleUrls: ['./thenactions.component.css']
})
export class ThenactionsComponent implements OnInit, OnChanges {
  @Input() thenActions;
  @Input() editHidden;
  @Input() listOfDevicesInHouse;
  @Output() updateActions = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if(!this.thenActions.length){
      this.thenActions.push({})
    }
  }

  ngOnChanges(){
    // console.log(this.thenActions);
  }

  deleteAction(msg){
    let index = msg.order;
    this.thenActions.splice(index,1);
  }

  addAction(){
    let newAction = {
      value: 0
    }
    this.thenActions.push(newAction);
  }

  updateAction(action){
    this.updateActions.emit();
  }


}
