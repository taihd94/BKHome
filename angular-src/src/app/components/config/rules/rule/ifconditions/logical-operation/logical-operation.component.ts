import { Component, OnInit, Input } from '@angular/core';
import { RuleService } from '../../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-logical-operation',
  templateUrl: './logical-operation.component.html',
  styleUrls: ['./logical-operation.component.css']
})
export class LogicalOperationComponent implements OnInit {
  @Input() operationId;
  constructor(
    private ruleService: RuleService
  ) { }
  //
  // operation: {
  //   _1stOperand: Object,
  //   _2ndOperand: Object,
  //   operator: String
  // };
  isDataAvailable = false;
  operation: any;
  _1stOperandType = '';
  _2ndOperandType = '';
  _1stOperand_id: String;
  _2ndOperand_id: String;
  operator = '';

  ngOnInit() {
    this.ruleService.getLogicalOperation(this.operationId).subscribe(res=>{
      if(!res.success){
        console.log(res.msg);
      } else {
        this.operation = res.operation;
        this._1stOperandType = this.operation._1stOperand._type;
        this._2ndOperandType = this.operation._2ndOperand._type;
        this._1stOperand_id = this.operation._1stOperand.operation;
        this._2ndOperand_id = this.operation._2ndOperand.operation;
        this.operator = this.operation.operator;
        this.isDataAvailable = true;

      }
    })



  }

}
