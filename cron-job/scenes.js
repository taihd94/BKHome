const agenda = require('./agenda');
const socket = require('../socket-io/socketio-client');
const moment = require('moment');
const Scenes = require('../mongodb/home-model/scenes');

function createCronString(scene) {
  let dateOfWeekArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  let cronStr = "";
  let time = moment(scene.time, "HH:mm A");
  let minutes = time.minutes();
  let hours = time.hour();
  let date = '*';
  let month = '*';
  let year = '*';
  let dateOfWeek = "";
  let repeat = scene.repeat;
  if(checkRepeatNone(repeat)){
    cronStr +=  minutes + ' ' + hours + ' * * *';
  } else {
    for(let i=0; i<repeat.length; i++){
      if(repeat[i]){
        dateOfWeek += dateOfWeekArr[i] + ',';
      }
      if(i==repeat.length-1){
        dateOfWeek = dateOfWeek.slice(0, -1);
        cronStr +=  minutes + ' ' + hours + ' ' + date + ' ' + month + ' ' + dateOfWeek;
      }
    }
  }
  return cronStr;
}

function checkRepeatNone(repeat) {
  return (!repeat[0])&&(!repeat[1])&&(!repeat[2])&&(!repeat[3])&&(!repeat[4])&&(!repeat[5])&&(!repeat[6]);
}

function repeatJob(cronStr, id, devices) {
  let job = agenda.every(cronStr, id, devices, (err)=>{
    if(err) console.log(err);
    else {
      console.log('******************CREATE CRON JOB*******************');
      console.log('_id: ' + id);
      console.log('Repeat every: ' + cronStr);
      console.log('Next run at : ' + job.attrs.nextRunAt);
      agenda.start();
      console.log('****************************************************');
      return job;
    }
  });
}

function scheduleJob(scheduleTime, id, devices) {
  let job = agenda.schedule(scheduleTime, id, devices, (err)=>{
    if(err) console.log(err);
    else {
      console.log('******************CREATE CRON JOB*******************');
      console.log('_id: ' + id);
      console.log('Run at: ' + job.attrs.nextRunAt);
      console.log('Repeat: none');
      agenda.start();
      console.log('****************************************************');
      return job;
    }
  });
}

function scheduleRepeatJob(scheduleTime, cronStr, id, devices) {
  let job = agenda.schedule(scheduleTime, id, devices, (err)=>{
    if(err) console.log(err);
    else {
      job.repeatEvery(cronStr,{
        timezone: 'Asia/Ho_Chi_Minh'
      });
      job.save();
      agenda.start();
      console.log('******************CREATE CRON JOB*******************');
      console.log('_id: ' + id);
      console.log('Run at: ' + job.attrs.nextRunAt);
      console.log('Repeat every: ' + cronStr);
      console.log('****************************************************');
      return job;
    }
  });
}

module.exports.create = function(scene){
  let cronStr = createCronString(scene);
  let sceneDate = scene.date;
  let sceneTime = scene.time;
  let devices = scene.devices;
  let sceneRepeat = scene.repeat;
  let id = scene._id.toString();

  agenda.define(id, function(job, done) {
    let devices = job.attrs.data;
    let index = 0;
    console.log("//-----The lights were automatically controlled-----//")
    for(let light of devices){
      socket.emit('device-event', light);
      if(++index===devices.length){
        done();
      }
    }
  });

  //-----delete job-----//
  agenda.cancel({name: id}, function(err, numRemoved) {
    if(err) console.log(err);
    else {
      //-----create job-----//
      if(!!sceneDate){
        // date of Scene is define
        let scheduleMoment = moment(sceneDate, 'DD/MM/YYYY');
        let time = moment(sceneTime, 'HH:mm A');
        scheduleMoment.hour(time.hour());
        scheduleMoment.minutes(time.minutes());
        let scheduleTime = scheduleMoment.toDate();
        let now = new Date();
        if(scheduleTime.getTime() > now.getTime()){
          // scheduleTime is greater then now
          if(checkRepeatNone(sceneRepeat)){
            // job not repeat
            scheduleJob(scheduleTime, id, devices);
          } else {
            // job repeat
            scheduleRepeatJob(scheduleTime, cronStr, id, devices);
          }
        } else
        // scheduleTime is less then now
        if (!checkRepeatNone(sceneRepeat)){
          // job repeat
          repeatJob(cronStr, id, devices);
        } else {
          // job not repeat
          console.log('******************CREATE CRON JOB*******************');
          console.log('_id: ' + id);
          console.log('Run at: none');
          console.log('Repeat: none');
          console.log('****************************************************');
        }
      }
      else
      // date of Scene is not define
      if(!checkRepeatNone(sceneRepeat)){
        // job repeat
        repeatJob(cronStr, id, devices);
      } else {
        // job not repeat
        console.log('******************CREATE CRON JOB*******************');
        console.log('_id: ' + id);
        console.log('Run at: none');
        console.log('Repeat: none');
        console.log('****************************************************');
      }
    }
  });
}

module.exports.stop = function(id){
  console.log('//------Delete cron job-----//')
  console.log('id: ' + id);
  agenda.cancel({name: id}, function(err, numRemoved) {
    if(err) console.log(err);
    else console.log('//------------------------//');
  });
}

module.exports.restartCronJobs = function(){
  Scenes.getListOfScenes(scenes=>{
    for(let scene of scenes){
      this.create(scene);
    }
  });
};
