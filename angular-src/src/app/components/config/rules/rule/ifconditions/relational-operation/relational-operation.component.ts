import { Component, OnInit, Input } from '@angular/core';
import { DeviceService} from '../../../../../../services/rest-api/device.service';
import { RuleService } from '../../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-relational-operation',
  templateUrl: './relational-operation.component.html',
  styleUrls: ['./relational-operation.component.css']
})
export class RelationalOperationComponent implements OnInit {
  @Input() operationId;
  constructor(
    private deviceService: DeviceService,
    private ruleService: RuleService
  ) { }

  operation: any;
  deviceId: String;
  device: any;
  deviceName: String;
  operator: String;
  value: Number;


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

  ngOnInit() {
    this.ruleService.getRelationalOperation(this.operationId).subscribe(res=>{
      if(!res.success){
        console.log(res.msg);
      } else {
        this.operation = res.operation;
        console.log(this.operation);
        this.mapOperator(this.operation.operator);
        this.value = this.operation.value;
        this.deviceId = this.operation.deviceId;
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

      }
    })
  }
}
