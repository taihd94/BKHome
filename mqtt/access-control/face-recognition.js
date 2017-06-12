const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
const io = require('../../socket-io/SocketIO');

const AccessControl = require('../../mongodb/home-model/accessControl');
const Rules = require('../../mongodb/home-model/rules');

client.on('connect',  () => {
  client.subscribe('access-control/face-recognition/#');
  client.subscribe('lwt/access-control/face-recognition');
  client.publish('fgss1/authenticate', '');
})

client.on('message', (topic, message) => {
  // console.log("log from face-recognition")
  console.log("[" + topic + "]\n\r" + message);
  let promise = new Promise((resolve,reject)=>{
    switch(topic){
      case 'access-control/face-recognition/enrol/message':
        io.sockets.emit('access-control/face-recognition/enrol/message', message.toString());
        return resolve(true);
      case 'access-control/face-recognition/enrol/complete':
        let json = JSON.parse(message);
        let userId = json.userId;
        let face-recognitionId = json.face-recognitionId;
        console.log(userId);
        console.log(face-recognitionId);
        return resolve(AccessControl.updateFingerprintId(userId, face-recognitionId))
      case 'access-control/face-recognition/authenticate/found-id':
        let id = message.toString();
        return AccessControl.getUserFromFingerprint(id)
        .then(user=>{
          resolve(Rules.checkOperations(user));
        })
    }
  })
  promise.catch(err=>{
    console.log(err)
  })

});

module.exports = client;
