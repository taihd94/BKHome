const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessControlSchema = new Schema({
    name: String,
    imgPath: String,
    fingerprintId: [Number],
    rfid: [Number]
}, {versionKey: false});

const AccessControl = module.exports = mongoose.model('access-control', AccessControlSchema);

module.exports.getUsers = function () {
  return AccessControl.find()
  .then(users=>{
    if(!users.length) throw new Error('No user found');
    return Promise.resolve(users);
  })
}

module.exports.addUser = function(newUser) {
  let user = new AccessControl(newUser);
  return user.save();
}

module.exports.deleteUser = function (userId) {
  return AccessControl.findByIdAndRemove(userId);
}

module.exports.updateImgPath = function(userId, imgPath){
  return AccessControl.findById(userId)
  .then(user=>{
    if(!user) throw new Error('User not found: ' + userId);
    user.imgPath = imgPath;
    return user.save()
  })
}
