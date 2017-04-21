import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RuleService } from '../../../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-logical-operation-2nd-layer',
  templateUrl: './logical-operation-2nd-layer.component.html',
  styleUrls: ['./logical-operation-2nd-layer.component.css']
})
export class LogicalOperation2ndLayerComponent implements OnInit {
  @Input() operation;
  @Input() listOfDevicesInHouse;
  @Input() editHidden;
  @Output() deleteOperation = new EventEmitter<Object>();
  @Output() addOperation = new EventEmitter<Object>();

  constructor(
    private ruleService: RuleService
  ) { }

  isDataAvailable = false;
  _1stOperand: String;
  _2ndOperand: String;
  operator: String;

  ngOnInit() {
    this._1stOperand = this.operation._1stOperand;
    this._2ndOperand = this.operation._2ndOperand;
    this.operator = this.operation.operator;
    this.isDataAvailable = true;

  }

  _1stOperand_deleteOperation(operation){
    let msg = {
      operand: '_1stOperand',
      operation: operation
    }
    this.deleteOperation.emit(msg);
  }

  _2ndOperand_deleteOperation(operation){
    let msg = {
      operand: '_2ndOperand',
      operation: operation
    }
    this.deleteOperation.emit(msg);
  }

  _1stOperand_addOperation(){
    let msg = {
      operand: '_1stOperand'
    }
    this.addOperation.emit(msg);
  }

  _2ndOperand_addOperation(operation){
    let msg = {
      operand: '_2ndOperand'
    }
    this.addOperation.emit(msg);
  }

}
