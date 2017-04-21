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
    this.houseService.getListOfDevicesInHouse().subscribe(res=>{
      if(!res.success){
        console.log(res.msg)
      }else{
        this.listOfDevicesInHouse = [];
        let house = res.house;
        let i = -1;
        for(let floor of house){
          let rooms = floor.rooms;
          for(let room of rooms){
            i++;
            this.listOfDevicesInHouse.push({floorName: floor.name, roomName: room.name, lights: [], sensors: []});
            let devices = room.devices;
            for(let device of devices){
              switch(device.deviceType){
                case 'LightingControl':
                  let lightArr = this.listOfDevicesInHouse[i].lights.concat(device.lights);
                  this.listOfDevicesInHouse[i].lights = lightArr;
                  break;
                case 'SensorModule':
                  let sensorArr = this.listOfDevicesInHouse[i].sensors.concat(device.sensors);
                  this.listOfDevicesInHouse[i].sensors = sensorArr;
                  break;
              }
            }
          }
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
