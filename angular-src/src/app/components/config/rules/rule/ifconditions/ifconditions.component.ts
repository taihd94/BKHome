import { Component, OnInit, Input } from '@angular/core';
import { RuleService } from '../../../../../services/rest-api/rule.service';

@Component({
  selector: 'app-ifconditions',
  templateUrl: './ifconditions.component.html',
  styleUrls: ['./ifconditions.component.css']
})
export class IfconditionsComponent implements OnInit {
  @Input() ifCondtions;
  constructor(
    private ruleService: RuleService
  ) { }

  _type: String;
  operationId: Object;
  operation: Object;
  ngOnInit() {
    this._type = this.ifCondtions._type;
    this.operationId = this.ifCondtions.operation;
  }

}
