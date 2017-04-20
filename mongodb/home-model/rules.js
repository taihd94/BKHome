const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const LightingControl = require('./lightingControl');
const Floor = require('./floor');

const RelationalOperationSchema = new Schema({
  deviceId: Schema.Types.ObjectId,
  operator: String,
  value: Number,
  result: Boolean
}, {versionKey: false});

const LogicalOperationSchema = new Schema({
  _1stOperand: {
    _type: String,
    operation: {type: Schema.Types.ObjectId, refPath: '_1stOperand._type'}
  },
  _2ndOperand: {
    _type: String,
    operation: {type: Schema.Types.ObjectId, refPath: '_2ndOperand._type'}
  },
  operator: String,
  result: Boolean
}, {versionKey: false});

const RuleSchema = new Schema({
    name: String,
    time: {
      from: String,
      to: String
    },
    date: String,
    repeat: [Boolean],
    ifConditions: {
      _type: String,
      operation: {type: Schema.Types.ObjectId, refPath: 'ifConditions._type'}
    },
    thenActions: [{
      deviceId: Schema.Types.ObjectId,
      value: Number
    }]
}, {versionKey: false});

const Rules = module.exports = mongoose.model('Rules', RuleSchema);
const RelationalOperations = module.exports.RelationalOperations = mongoose.model('RelationalOperation', RelationalOperationSchema);
const LogicalOperations = module.exports.LogicalOperations = mongoose.model('LogicalOperation', LogicalOperationSchema);

// module.exports.getListOfRules = function(callback){
//   Rules.find((err, rules)=>{
//     if(err) throw err;
//     if(rules.length){
//       callback({success: true, rules: rules});
//     } else {
//       callback({sucess: false, msg: 'No rule found!'});
//     }
//   })
// }


module.exports.getListOfRules = function(callback) {
  Rules
    .find()
    // .populate({
    //   path: 'ifConditions.operation',
    //   populate: {
    //     path: '_1stOperand.operation'
    //   }
    // })
    .exec((err, rules)=>{
      if(err) throw err;
      if(!!rules.length){
        callback({success: true, rules: rules});
      } else {
        callback({sucess: false, msg: 'No rule found!'});
      }
    })
}


module.exports.getRelationalOperation = function (id, callback) {
  RelationalOperations.findById(id, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      callback({success: true, operation: operation});
    } else {
      callback({success: false, msg: 'No relational operation found'});
    }
  })
}

module.exports.getLogicalOperation = function (id, callback) {
  LogicalOperations.findById(id, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      callback({success: true, operation: operation});
    } else {
      callback({success: false, msg: 'No relational operation found'});
    }
  })
}
