const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const LightingControl = require('./lightingControl');
const Floor = require('./floor');
const socket = require('../../socket-io/socketio-client');

const OperationSchema = new Schema({
  _type: String,
  isRoot: Boolean,
  result: Boolean
}, {collection: 'operations',versionKey: false});

const LogicalOperationSchema = new Schema({
  _type: String,
  _1stOperand: {type: Schema.Types.ObjectId, ref: 'operations'},
  _2ndOperand: {type: Schema.Types.ObjectId, ref: 'operations'},
  operator: String,
  result: Boolean,
  isRoot: Boolean
}, {collection: 'operations',versionKey: false});

const RelationalOperationSchema = new Schema({
  _type: String,
  deviceId: Schema.Types.ObjectId,
  operator: String,
  value: Number,
  result: Boolean,
  isRoot: Boolean
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


module.exports.getListOfRules = () => {
  return Rules.find()
  .populate({
    path: 'ifConditions',
    populate: {
      path: '_1stOperand _2ndOperand' ,
      populate: {
        path: '_1stOperand _2ndOperand'
      }
    }
  })
  .then(rules=>{
    if(!rules.length) throw new Error('No rule found');
    return Promise.resolve({success: true, rules: rules});
  })
}


//----------remove operation functions-----------//


function removeRelationalOperation(id) {
  return RelationalOperations.findByIdAndRemove(id)
}

function removeLogicalOperation(id) {
  return LogicalOperations.findById(id).then(operation=>{
    if(!operation){
      throw new Error('Logical operation not found')
    }
    let _1stOperand = operation._1stOperand;
    let _2ndOperand = operation._2ndOperand;
    return removeOperation(_1stOperand)
    .then(()=>{
      return removeOperation(_2ndOperand)
    })
    .then(operation.remove())
  })
}

 function removeOperation(operationId) {
    return Operations.findById(operationId).then(operation=>{
     if(!operation) return Promise.resolve({sucess: false, msg: 'Operation not found'});
     switch(operation._type){
       case 'RelationalOperation':
          console.log('remove relational operation: ' + operationId);
          return removeRelationalOperation(operation._id)
          break;
       case 'LogicalOperation':
          console.log('remove logical operation: ' + operationId);
          return removeLogicalOperation(operation._id)
          break;
       default:
          return operation.remove().then(()=>{
            return Promise.resolve({succes: true, msg: 'Operation has been removed: ' + operation._id})
          });
     }
   })
 }

//----------remove operation functions-----------//

// ----------create operation functions-----------//
function createRelationalOperation(operation) {
  let newOperation = new RelationalOperations(operation);
  newOperation.isRoot = false;
  return newOperation.save()
  .then((doc)=>{
    return Promise.resolve({success: true, operationId: doc._id, msg:'new relational operation has been saved'})
  })
}

function createLogicalOperation(operation){
  let newOperation = new LogicalOperations(operation);
  return createOperation(operation._1stOperand)
  .then((result)=>{
    newOperation._1stOperand = result.operationId;
    return createOperation(operation._2ndOperand)
  })
  .then((result)=>{
    newOperation._2ndOperand = result.operationId;
    newOperation.isRoot = false;
    return newOperation.save()
  })
  .then((doc)=>{
    return Promise.resolve({success:true, operationId: doc._id, msg: 'logicalOperations has been saved'})
  })

}

function createOperation(operation) {
  switch (operation._type) {
    case 'RelationalOperation':
      console.log('create relational operation')
      return createRelationalOperation(operation);
      break;
    case 'LogicalOperation':
      console.log('create logical operation')
      return createLogicalOperation(operation);
      break;
    default:
      console.log('Operation type invalid: ' + operation._type);
      throw new Error('Operation type invalid: ' + operation._type);
  }
}
//----------create operation functions-----------//


module.exports.updateRule = function (ruleId, newRule) {
  console.log();
  console.log('---------------UPDATE RULE-----------------')
  return Rules.findById(ruleId).then(rule=>{
    if(!rule) throw new Error('Rule not found');
    rule.time = newRule.time;
    rule.repeat = newRule.repeat;
    rule.thenActions = newRule.thenActions;
    let operationId = rule.ifConditions;
    return Operations.findById(operationId)
    .then((operation)=>{
      if(!operation) return Promise.resolve(true)
      return removeOperation(operation._id)
    })
    .then((result)=>{
      return createOperation(newRule.ifConditions)
    })
    .then((result)=>{
      rule.ifConditions = result.operationId
      return rule.save()
    })
    .then(rule=>{
      return Operations.findById(rule.ifConditions)
    })
    .then(operation=>{
      operation.isRoot = true;
      return operation.save()
    })
    .then(()=>{
      return Promise.resolve({success: true, msg: 'Rule has been updated'})
    })
  })
}

module.exports.deleteRule = function (ruleId, callback) {
  return Rules.findById(ruleId)
  .then(rule=>{
    if(!rule) throw new Error('Rule not found');
    return removeOperation(rule.ifConditions)
    .then(()=>{
      rule.remove();
      return Promise.resolve({success: true, msg:'Rule has been removed'});
    })
  })
}

module.exports.addNewRule = function (newRule, callback) {
  let ifCondition = new Operations({
    isRoot: true
  });
  return ifCondition.save()
  .then((doc)=>{
    let rule = new Rules({
      name: newRule.name,
      ifConditions: doc._id
    });
    rule.save();
    return Promise.resolve({success: true, msg:'new rule has been created'})
  })
}

const operators = {
  '==': (a, b) => {return a == b},
  '!=': (a, b) => {return a != b},
  '>' : (a, b) => {return a > b},
  '<' : (a, b) => {return a < b},
  '>=': (a, b) => {return a >= b},
  '<=': (a, b) => {return a <= b},
  'OR': (a, b) => {return a || b},
  'AND':(a, b) => {return a && b}
}

function operationSatisfied(operation) {
  let operationId = operation._id;
  if(operation.isRoot){
    return Rules.findOne({'ifConditions': operationId})
    .then(rule=>{
      let actions = rule.thenActions;
      for(let action of actions){
        let msg = {_id: action.deviceId, value: action.value}
        socket.emit('device-event', msg)
      }
    })
  }
  return LogicalOperations
  .findOne({$or: [{'_2ndOperand': operationId}, {'_1stOperand': operationId}]})
  .populate('_1stOperand _2ndOperand')
  .then(operation=>{
    let _1stResult = operation._1stOperand.result;
    let _2ndResult = operation._2ndOperand.result;
    let operator = operation.operator;
    let result = operators[operator](_1stResult, _2ndResult);
    operation.result = result;
    return operation.save()
    .then(operation=>{
      if(operation.result){
        return operationSatisfied(operation);
      }
    })
  })
}

module.exports.checkOperations = function (device) {
  return RelationalOperations.find({'deviceId': device._id})
  .then(operations=>{
    if(!operations.length) return Promise.resolve('Rules have been checked')
    let loop = (i) => {
      let operation = operations[i];
      let operator = operation.operator;
      let result = operators[operator](device.value, operation.value)
      operation.result = result;
      return operation.save()
      .then(operation=>{
        if(operation.result) return operationSatisfied(operation);
      })
      .then(()=>{
        if(++i===operations.length) return Promise.resolve('Rules have been checked')
        return loop(i)
      });
    };
    return loop(0);
  })
}
