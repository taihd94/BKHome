const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const LightingControl = require('./lightingControl');
const Floor = require('./floor');

const OperationSchema = new Schema({
  _type: String
}, {collection: 'operations',versionKey: false});

const LogicalOperationSchema = new Schema({
  _type: String,
  _1stOperand: {type: Schema.Types.ObjectId, ref: 'operations'},
  _2ndOperand: {type: Schema.Types.ObjectId, ref: 'operations'},
  operator: String,
  result: Boolean
}, {collection: 'operations',versionKey: false});

const RelationalOperationSchema = new Schema({
  _type: String,
  deviceId: Schema.Types.ObjectId,
  operator: String,
  value: Number,
  result: Boolean
}, {collection: 'operations',versionKey: false});

const RuleSchema = new Schema({
    name: String,
    time: {
      from: String,
      to: String
    },
    date: String,
    repeat: [Boolean],
    ifConditions: {type: Schema.Types.ObjectId, ref: 'operations'},
    thenActions: [{
      deviceId: Schema.Types.ObjectId,
      value: Number
    }]
}, {versionKey: false});

const Rules = module.exports = mongoose.model('Rules', RuleSchema);
const Operations = module.exports.Operations = mongoose.model('operations', OperationSchema);
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
    .populate({
      path: 'ifConditions',
      populate: {
        path: '_1stOperand _2ndOperand',
        populate: {
          path: '_1stOperand _2ndOperand'
        }
      }
    })
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
