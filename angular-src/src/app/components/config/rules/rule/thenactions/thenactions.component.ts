import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MessageEventService } from '../../../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-thenactions',
  templateUrl: './thenactions.component.html',
  styleUrls: ['./thenactions.component.css']
})
export class ThenactionsComponent implements OnInit, OnChanges {
  @Input() ruleId;
  @Input() thenActions;
  @Input() editHidden;
  @Input() listOfDevicesInHouse;
  @Output() updateActions = new EventEmitter();
  constructor(
    private messageEvent: MessageEventService
  ) { }

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
