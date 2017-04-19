import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../../services/rest-api/rule.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(
    private ruleService: RuleService
  ) { }

  rules: Object;

  ngOnInit() {
    this.getListOfRules();
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
