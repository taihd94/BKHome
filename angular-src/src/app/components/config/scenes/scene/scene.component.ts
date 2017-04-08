import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { DeviceService} from '../../../../services/rest-api/device.service';
import { HouseService} from '../../../../services/rest-api/house.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit, OnChanges {
  @Input() scene;
  date: DateModel;
  options: DatePickerOptions;

  constructor(
    private deviceService: DeviceService,
    private houseService: HouseService
  ) {
    this.options = new DatePickerOptions();
  }

  timePickerHidden = true;
  dayPickerHidden = true;
  savePickerHidden = true;
  timePicker: String;
  time: Date;
  repeatPicker: String;
  repeatDays = [];
  repeatDaysStr: String;
  daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  daysOfWeekFull = ["Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  devices = [];


  ngOnInit() {
    let roomArr = [];
    for(let device of this.scene.devices){
      this.deviceService.getRoomByLightId(device._id).subscribe(res=>{
        let roomId = res.roomId;
        let index = roomArr.indexOf(roomId);
        if(index===-1){
          roomArr.push(roomId);
          let floorName = res.floorName;
          let roomName = res.roomName;
          this.devices.push({floorName: floorName, roomName: roomName, device: [device]})
        } else{
          this.devices[index].device.push(device);
        }
      })
    }
    
    this.time = new Date(this.scene.time);
    this.timePicker = this.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',hour12: true });
    this.date = new DateModel();
    this.date.formatted = moment(this.time).format('L');
    this.date.momentObj = moment(this.time);
    this.repeatDays = this.scene.repeat;
    this.repeatDaysStr = this.convertRepeatToString(this.repeatDays);
  }

  ngOnChanges(){
    // console.log(this.date);
  }

  showTime(time){
    this.timePicker = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',hour12: true });
  }

  showDate(date){
    if(!!date){
      console.log(date);
    }
  }

  convertRepeatToString(repeatDays){
    let string;
    if(repeatDays[0]&&repeatDays[1]&&repeatDays[2]&&repeatDays[3]&&repeatDays[4]&&repeatDays[5]&&repeatDays[6]){
      string = "Daily";
    } else {
      string = "";
      for(let i=0; i<repeatDays.length;i++){
        if(repeatDays[i]){
          string += this.daysOfWeek[i] + ", ";
        }
      }
      string = string.slice(0, -2);
    }
    return string;
  }

  saveDatePicker(){
    this.repeatDaysStr = this.convertRepeatToString(this.repeatDays);
    this.timePicker = this.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',hour12: true });
  }

}
