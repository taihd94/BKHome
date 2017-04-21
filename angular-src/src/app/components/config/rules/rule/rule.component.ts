import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { RuleService } from '../../../../services/rest-api/rule.service';
import { HouseService } from '../../../../services/rest-api/house.service';
import { MessageEventService } from '../../../../services/broadcast/message-event.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit, OnChanges {
  @Input() rule;
  @Input() listOfDevicesInHouse;
  @Output() removerule = new EventEmitter();

  constructor(
    private ruleService: RuleService,
    private houseService: HouseService,
    private messageEvent: MessageEventService,
    private toastrService: ToastrService
  ) {
    this.options = new DatePickerOptions();
  }

  ruleId:String;
  date: DateModel;
  options: DatePickerOptions;
  fromTimePickerHidden = true;
  toTimePickerHidden = true;
  fromTimeButtonsHidden = true;
  toTimeButtonsHidden = true;
  repeatDayHidden = true;
  timePicker: String;
  fromTimePicker: String;
  toTimePicker: String;
  time: Date;
  repeatPicker: String;
  repeatDays = [];
  repeatDaysStr: String;
  daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  daysOfWeekFull = ["Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  rooms = [];

  //--add Room--//
  selectRoomHidden = true;
  listOfFloors = [];
  listOfRooms = [];
  selectedFloor: String;
  selectedRoom: String;
  //--add Room--//

  btnSaveHidden = true;
  editHidden = false;

  ruleDeletedName: String;

  ifCondtions: Object;
  thenActions: Object;


  ngOnInit() {
    this.ruleId = this.rule._id;

    this.ifCondtions = this.rule.ifConditions;
    this.thenActions = this.rule.thenActions;

    if(!!this.rule.time){
      this.timePicker = this.rule.time;
      this.fromTimePicker = this.rule.time.from;
      this.toTimePicker = this.rule.time.to;
      // this.time = moment(this.timePicker, "HH:mm A").toDate();
    }

    this.date = new DateModel();
    if(!!this.rule.date){
      this.mapDate(this.rule.date);
    }

    if(!!this.rule.repeat){
      this.repeatDays = this.rule.repeat;
      this.repeatDaysStr = this.convertRepeatToString(this.repeatDays);
    }

    this.houseService.getListOfFloors().subscribe(floors=>{
      this.listOfFloors = floors;
    })

    this.selectedFloor = "select floor";
    this.selectedRoom = "select room";

  }

  ngOnChanges(){
    // console.log(this.date);
  }

  mapDate(date){
    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(now.getDate()+1);
    let nowMoment = moment(now).format('DD/MM/YYYY');
    let tomorrowMoment = moment(tomorrow).format('DD/MM/YYYY');
    if(date===nowMoment){
      this.date.formatted = 'Today';
    } else if(date===tomorrowMoment){
      this.date.formatted = 'Tomorrow';
    } else {
      this.date.formatted = date;
    }
    this.date.momentObj = moment(date, "DD MM YYYY");
  }

  convertRepeatToString(repeatDays){
    let string;
    if(repeatDays[0]&&repeatDays[1]&&repeatDays[2]&&repeatDays[3]&&repeatDays[4]&&repeatDays[5]&&repeatDays[6]){
      string = "Daily";
    } else if((!repeatDays[0])&&(!repeatDays[1])&&(!repeatDays[2])&&(!repeatDays[3])&&(!repeatDays[4])&&(!repeatDays[5])&&(!repeatDays[6])){
      string = "None";
    }
    else{
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

  clickFromTimeOkBtn(){
    this.fromTimePickerHidden=true;
    this.fromTimeButtonsHidden=true;
    this.btnSaveHidden=false;
    if(!this.time){
      this.time = new Date();
    }
    this.timePicker = moment(this.time).format('LT');
  }

  clickToTimeOkBtn(){
    this.toTimePickerHidden=true;
    this.toTimeButtonsHidden=true;
    this.btnSaveHidden=false;
    if(!this.time){
      this.time = new Date();
    }
    this.timePicker = moment(this.time).format('LT');
  }

  // clickClearOkBtn(){
  //   this.timePickerHidden=true;
  //   this.TimeButtonsHidden=true;
  //   this.btnSaveHidden=false;
  //   this.timePicker = '';
  //   this.time = null;
  // }

  clickRepeatOkBtn(){
    this.repeatDayHidden = true;
    this.btnSaveHidden=false;
    this.repeatDaysStr = this.convertRepeatToString(this.repeatDays);
  }


  selectFloor(floor){
    this.listOfRooms = floor.rooms;
    this.selectedFloor = floor.name;
  }

  selectRoom(selectedRoom){
    let check = this.rooms.filter(room=>{
      return room.roomId == selectedRoom._id;
    }).pop();
    if(!check){
      let room = {
        floorName: this.selectedFloor,
        roomName: selectedRoom.name,
        roomId: selectedRoom._id,
        devices: []
      }
      this.rooms.push(room);
    };
    this.selectedFloor = "select floor";
  }

  removeRoom(room){
    let index = this.rooms.indexOf(room);
    this.rooms.splice(index,1);
  }

  clickSaveBtn(){
    // if(!this.rule.devices.length){
    //   this.editHidden = false;
    // }

    // let isDatePicked = !!this.date.formatted;
    // let isTimePicked = !!this.time;
    // let isRepeatDateNone = (this.repeatDaysStr=='None');
    //
    // if((!isTimePicked)&&(isDatePicked||(!isRepeatDateNone))){
    //   this.toastrService.error('Please pick Time.', 'Error!!!');
    //   return;
    // }
    //
    // if((isTimePicked)&&((!isDatePicked)&&(isRepeatDateNone))){
    //   let date = new Date();
    //   if(date.getTime() > this.time.getTime()){
    //     date.setDate(date.getDate()+1);
    //   }
    //   this.mapDate(moment(date).format('DD/MM/YYYY'));
    // }
    //
    // if((isTimePicked)&&(isDatePicked)){
    //
    // }
    //
    // this.rule.time = (this.time)? moment(this.time).format('LT'): null;
    // this.rule.date = (this.date.momentObj)? this.date.momentObj.format('DD/MM/YYYY'): null;
    // this.rule.repeat = this.repeatDays;
    //
    // // this.ruleService.updaterule(this.rule).subscribe(res=>{
    // //   if(!res.success){
    // //     console.log(res.msg);
    // //   }
    // // })

    this.editHidden = true;
    this.btnSaveHidden = true;
  }

  deleterule(){
    // this.ruleService.deleterule(this.ruleId).subscribe(res=>{
    //   if(res.success){
    //     this.removerule.emit();
    //   } else {
    //     console.log(res.msg);
    //   }
    // })
  }

  datePickerEvent(event){
    if(event.type=='dateChanged'){
      let date = event.data.formatted;
      this.mapDate(date);
    }
  }

  runrule(){
    for(let device of this.rule.devices){
      this.messageEvent.emit("device-event", device);
    }
  }
}
