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
  @Input() ruleId
  @Input() operation;
  @Input() addOperationHidden;
  @Input() listOfDevicesInHouse;
  @Input() editHidden;
  @Output() updateOperationEvent = new EventEmitter<Object>();
  @Output() deleteOperationEvent = new EventEmitter<Object>();
  @Output() addOperationEvent = new EventEmitter();

  constructor(
    private deviceService: DeviceService,
    private houseService: HouseService,
    private ruleService: RuleService,
    private messageEvent: MessageEventService
  ) { }


  deviceId: String;
  device: any;
  deviceName: String;
  operator: String;
  value: any;
  sliderHidden = true;
  dimmable = true;
  operatorArrFull = ['Equal to', 'Not Equal to', 'Less than', 'Greater than', 'Less than and Equal to', 'Greater than and Equal to'];
  operatorSymbolArrFull = ['==', '!=', '<', '>', '<=', '>='];
  operatorArr = this.operatorArrFull;
  operatorSymbolArr = this.operatorSymbolArrFull;
  sliderMinValue = 0;
  sliderMaxValue = 100;

  ngOnInit() {
    this.addOperationHidden = this.addOperationHidden&&true;
    this.deviceId = this.operation.deviceId;
    this.operator = this.mapOperator(this.operation.operator);
    this.value = this.operation.value;
    if(!!this.deviceId){
      this.deviceService.getItemDetails(this.deviceId).subscribe(res=>{
        if(!res.success) return console.log(res.msg);
        switch(res._type){
          case 'light':
            this.deviceName = res.light.name;
            this.dimmable = res.light.dimmable;
            if(!this.dimmable){
              this.operatorArr = ['Equal to'];
              this.operatorSymbolArr = ['=='];
              this.value = this.value ? 'ON' : 'OFF';
            }
            break;
          case 'sensor':
            this.deviceName = res.sensor.name;
            this.dimmable = (res.sensor._type!=="Door")&&(res.sensor._type!=="Window")&&(res.sensor._type!=="Emergency");
            if(res.sensor._type.toString()==='Light'){
              this.sliderMaxValue = 1000;
            }
            break;
        }
      })
    } else {
      this.deviceName = 'device';
    }

  }

  ngOnChanges(){
    this.deviceId = this.operation.deviceId;
    this.operator = this.mapOperator(this.operation.operator);
    this.value = this.operation.value;
    if(!this.dimmable){
      this.value = this.value ? 'ON' : 'OFF';
    }
  }

  mapOperator(operator){
    switch(operator){
      case '==':
        return 'Equal to';
      case '!=':
        return 'Not equal to';
      case '<':
        return 'Less than';
      case '>':
        return 'Greater than';
      case '<=':
        return 'Less than or Equal to';
      case '>=':
        return 'Greater than or Equal to';
      case 'operator':
        return 'operator';
    }
  }

  deleteOperation(){
    this.deviceName = 'device';
    let msg = {
      operationId: this.operation._id
    }
    this.deleteOperationEvent.emit(msg);
  }

  addOperation(){
    this.addOperationEvent.emit('add RelationalOperation');
  }

  selectLight(light){
    this.deviceName = light.name;
    this.deviceId = light._id;
    this.dimmable = light.dimmable;
    if(!this.dimmable){
      this.operator = 'Equal to';
      this.operatorArr = ['Equal to'];
      this.operatorSymbolArr = ['=='];
      this.value = this.value ? 'ON' : 'OFF';
      this.operation.operator = '==';
      this.operation.value = this.value ? 1 : 0;
    } else {
      this.sliderHidden = false;
      this.value = 0;
      this.operatorArr = this.operatorArrFull;
      this.operatorSymbolArr = this.operatorSymbolArrFull;
    }
    this.sliderMaxValue = 100;
    //update operation
    this.operation.deviceId = light._id;
    this.updateOperationEvent.emit(this.operation);
    this.messageEvent.emit('rule/' + this.ruleId + '/select-device',light);
  }

  selectSensor(sensor){
    this.deviceName = sensor.name;
    this.deviceId = sensor._id;
    this.dimmable = (sensor._type!=="Door")&&(sensor._type!=="Window")&&(sensor._type!=="Emergency");
    this.sliderHidden = false;
    this.value = 0;
    this.operatorArr = this.operatorArrFull;
    this.operatorSymbolArr = this.operatorSymbolArrFull;
    this.sliderMaxValue = (sensor._type==='Light') ? 1000 : 100;
    //update operation
    this.operation.deviceId = sensor._id;
    this.updateOperationEvent.emit(this.operation);
  }

  selectOperator(operator){
    this.operator = this.mapOperator(operator);
    //update operation
    this.operation.operator = operator;
    this.updateOperationEvent.emit(this.operation);
  }

  getValue(value){
    this.value = value;
    //update operation
    this.operation.value = value;
    this.updateOperationEvent.emit(this.operation);
  }

  clickValueBtn(){
    if(!this.dimmable){
      let check = this.value=='ON';
      this.value = check ? 'OFF' : 'ON';
      this.operation.value = check ? 0 : 1;
      this.updateOperationEvent.emit(this.operation);
    }
  }
}
