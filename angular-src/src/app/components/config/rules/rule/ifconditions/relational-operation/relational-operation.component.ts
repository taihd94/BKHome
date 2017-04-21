import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService} from '../../../../../../services/rest-api/device.service';
import { HouseService} from '../../../../../../services/rest-api/house.service';
import { RuleService } from '../../../../../../services/rest-api/rule.service';
import { MessageEventService } from '../../../../../../services/broadcast/message-event.service';

@Component({
  selector: 'app-relational-operation',
  templateUrl: './relational-operation.component.html',
  styleUrls: ['./relational-operation.component.css']
})
export class RelationalOperationComponent implements OnInit, OnChanges {
  @Input() operation;
  @Input() addOperationHidden;
  @Input() listOfDevicesInHouse;
  @Input() editHidden;
  @Output() deleteOperationEvent = new EventEmitter<Object>();
  @Output() addOperationEvent = new EventEmitter();

  constructor(
    private deviceService: DeviceService,
    private houseService: HouseService,
    private ruleService: RuleService,
    private messageEventService: MessageEventService
  ) { }
  deviceId: String;
  device: any;
  deviceName: String;
  operator: String;
  value: any;


  ngOnInit() {
    this.addOperationHidden = this.addOperationHidden&&true;
    this.mapOperator(this.operation.operator);
    this.value = this.operation.value;
    this.deviceId = this.operation.deviceId;
    if(!!this.deviceId){
      this.deviceService.getItemDetails(this.deviceId).subscribe(res=>{
        if(!res.success){
          console.log(res.msg);
        } else{
          switch(res._type){
            case 'light':
              this.deviceName = res.light.name;
              break;
            case 'sensor':
              this.deviceName = res.sensor.name;
              break;
          }
        }
      })
    } else {
      this.deviceName = 'device';
    }

  }

  ngOnChanges(){
    if(!this.operation.deviceId){
      this.operation._type = 'RelationalOperation';
      this.operation.value = 'value';
      this.deviceName = 'device';
      this.operator = 'operator';
      this.value = 'value';
    }
  }

  mapOperator(operator){
    switch(operator){
      case '==':
        this.operator = 'Equal to';
        break;
      case '!=':
        this.operator = 'Not equal to';
        break;
      case '<':
        this.operator = 'Less than';
        break;
      case '>':
        this.operator = 'Greater than';
        break;
      case '<=':
        this.operator = 'Less than or Equal to';
        break;
      case '>=':
        this.operator = 'Greater than or Equal to';
        break;
    }
  }

  deleteOperation(){
    // console.log(this.operation);
    let msg={
      operationId: this.operation._id
    }
    this.deleteOperationEvent.emit(msg);
  }

  addOperation(){
    this.addOperationEvent.emit('add RelationalOperation');
  }
}
