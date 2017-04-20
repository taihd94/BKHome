import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../../services/rest-api/rule.service';
import { HouseService } from '../../../services/rest-api/house.service';
import { MessageEventService } from '../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(
    private ruleService: RuleService,
    private houseService: HouseService,
    private messageEvent: MessageEventService
  ) { }

  rules: Object;
  listOfDevicesInHouse: any;

  ngOnInit() {
    this.getListOfRules();
    this.getListOfDevices();
  }

  getListOfDevices(){
    this.houseService.getListOfFloors().subscribe(res=>{
      this.listOfDevicesInHouse = res;
      let floors = this.listOfDevicesInHouse;
      for(let i=0; i<floors.length; i++){
        let rooms = floors[i].rooms;
        for(let j=0; j<rooms.length; j++){
          let roomId = rooms[j]._id;
          this.houseService.getListOfDevicesInRoom(roomId).subscribe(res=>{
            if(!res.success){
              console.log(res.msg)
            } else {
              this.listOfDevicesInHouse[i].rooms[j].devices = res.devices;
            }
          })
        }
      }
    })
  }


  getListOfRules(){
    this.ruleService.getListOfRules().subscribe(res=>{
      if(!res.success){
        console.log(res.msg)
      } else {
        this.rules = res.rules;
      }
    })
  }

}
