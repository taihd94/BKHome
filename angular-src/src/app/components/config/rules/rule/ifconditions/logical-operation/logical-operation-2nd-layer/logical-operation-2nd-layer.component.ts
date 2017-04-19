import { Component, OnInit, Input } from '@angular/core';
import { RuleService } from '../../../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-logical-operation-2nd-layer',
  templateUrl: './logical-operation-2nd-layer.component.html',
  styleUrls: ['./logical-operation-2nd-layer.component.css']
})
export class LogicalOperation2ndLayerComponent implements OnInit {
  @Input() operationId;
  constructor(
    private ruleService: RuleService
  ) { }

  isDataAvailable = false;
  operation: any;
  _1stOperand_id: String;
  _2ndOperand_id: String;
  operator: String;

  ngOnInit() {
    console.log(this.operationId);
    this.ruleService.getLogicalOperation(this.operationId).subscribe(res=>{
      if(!res.success){
        console.log(res.msg)
      } else {
        this.operation = res.operation;
        this._1stOperand_id = this.operation._1stOperand.operation;
        this._2ndOperand_id = this.operation._2ndOperand.operation;
        this.operator = this.operation.operator;
        this.isDataAvailable = true;
      }
    })

  }

}
