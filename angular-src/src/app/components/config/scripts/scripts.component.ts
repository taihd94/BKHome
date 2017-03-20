import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit, OnChanges {
  timePickerHidden = true;

  constructor() { }
  public mytime: Date = new Date();
  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.mytime);
  }

  showTime(time){
    console.log(time);
  }

  onDatepickerDateChange($event){
    console.log(`Date changed from ${$event.previous.format('L')} to ${$event.value.format('L')}`);
  }
}
