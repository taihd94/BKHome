import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RuleService } from '../../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-logical-operation',
  templateUrl: './logical-operation.component.html',
  styleUrls: ['./logical-operation.component.css']
})
export class LogicalOperationComponent implements OnInit, OnChanges {
  @Input() operation;
  @Input() listOfDevicesInHouse;
  @Input() editHidden;
  @Output() deleteOperationEvent = new EventEmitter<Object>();
  @Output() addOperationEvent = new EventEmitter<Object>();
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
  _1stOperandType = '';
  _2ndOperandType = '';
  _1stOperand: String;
  _2ndOperand: String;
  operator = '';

  ngOnInit() {
    this._1stOperandType = this.operation._1stOperand._type;
    this._2ndOperandType = this.operation._2ndOperand._type;
    this._1stOperand = this.operation._1stOperand;
    this._2ndOperand = this.operation._2ndOperand;
    this.operator = this.operation.operator;
    this.isDataAvailable = true;
  }

  ngOnChanges(){
    this._1stOperandType = this.operation._1stOperand._type;
    this._2ndOperandType = this.operation._2ndOperand._type;
    this._1stOperand = this.operation._1stOperand;
    this._2ndOperand = this.operation._2ndOperand;
    this.operator = this.operation.operator;
  }

  _1stOperand_deleteOperation(operation){
    let msg = {
      operand: '_1stOperand',
      operation: operation
    }
    this.deleteOperationEvent.emit(msg);
  }

  _2ndOperand_deleteOperation(operation){
    let msg = {
      operand: '_2ndOperand',
      operation: operation
    }
    this.deleteOperationEvent.emit(msg);
  }

  _1stOperand_addOperation(operation){
    let msg = {
      operand: '_1stOperand'
    }
    this.addOperationEvent.emit(msg);
  }

  _2ndOperand_addOperation(operation){
    let msg = {
      operand: '_2ndOperand'
    }
    this.addOperationEvent.emit(msg);
  }

}
