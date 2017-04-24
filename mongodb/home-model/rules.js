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
//       return callback({success: true, rules: rules});
//     } else {
//       return callback({sucess: false, msg: 'No rule found!'});
//     }
//   })
// }


module.exports.getListOfRules = function(callback) {
  Rules
    .find()
    .populate({
      path: 'ifConditions',
      populate: {
        path: '_1stOperand _2ndOperand' ,
        populate: {
          path: '_1stOperand _2ndOperand'
        }
      }
    })
    .exec((err, rules)=>{
      if(err) throw err;
      if(!!rules.length){
        return callback({success: true, rules: rules});
      } else {
        return callback({sucess: false, msg: 'No rule found!'});
      }
    })
}


module.exports.getRelationalOperation = function (id, callback) {
  RelationalOperations.findById(id, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      return callback({success: true, operation: operation});
    } else {
      return callback({success: false, msg: 'No relational operation found'});
    }
  })
}

module.exports.getLogicalOperation = function (id, callback) {
  LogicalOperations.findById(id, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      return callback({success: true, operation: operation});
    } else {
      return callback({success: false, msg: 'No relational operation found'});
    }
  })
}

//----------remove operation functions-----------//


function removeRelationalOperation(id, callback) {
  RelationalOperations.findByIdAndRemove(id, err=>{
    if(err) throw err;
    return callback({success: true, msg:'relational operation has been removed'})
  })
}

function removeLogicalOperation(id, callback) {
  LogicalOperations.findById(id, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      let _1stOperand = operation._1stOperand;
      let _2ndOperand = operation._2ndOperand;
      removeOperation(_1stOperand, result=>{
        console.log(result);
        if(result.success){
          removeOperation(_2ndOperand, result=>{
            console.log(result);
            if(result.success){
              operation.remove(err=>{
                if(err) throw err;
                return callback({success: true, msg: 'logical operation has been removed'});
              })
            } else {
              return callback(result)
            }
          });
        } else {
          return callback(result)
        }
      });
    } else {
      return callback({success: false, msg: 'Logical operation not found'})
    }
  })
}

 function removeOperation(operationId, callback) {
  Operations.findById(operationId, (err, operation)=>{
    if(err) throw err;
    if(!!operation){
      console.log(operation._type);
      switch(operation._type){
        case 'RelationalOperation':
          console.log('Prepaire to  remove relational operation');
          removeRelationalOperation(operation._id, result=>{
            return callback(result);
          });
          break;
        case 'LogicalOperation':
          console.log('Prepaire to  remove logical operation');
          removeLogicalOperation(operation._id, result=>{
            return callback(result);
          });
          break;
        default:
          console.log('operation type invalid');
          return callback({success: false, msg: 'operation type invalid'})
          break;
      };
    } else {
      return callback({success: false, msg: 'Operation not found: ' + operationId})
    }
  })
}

//----------remove operation functions-----------//

//----------create operation functions-----------//
function createRelationalOperation(operation, callback) {
  let newOperation = new RelationalOperations(operation);
  newOperation.save((err, doc)=>{
    if(err) throw err;
    return callback({success: true, operationId: doc._id, msg:'new relational operation has been saved'});
  })
}

function createLogicalOperation(operation, callback){
  let newOperation = new LogicalOperations(operation);
  createOperation(operation._1stOperand, result=>{
    console.log(result);
    if(result.success){
      newOperation._1stOperand = result.operationId;
      createOperation(operation._2ndOperand, result=>{
        console.log(result);
        if(result.success){
          newOperation._2ndOperand = result.operationId;
          newOperation.save((err, doc)=>{
            if(err) throw err;
            return callback({success:true, operationId: doc._id, msg: 'logicalOperations has been saved'});
          });
        } else {
          return callback(result)
        }
      })
    } else {
      return callback(result)
    }
  });
}

function createOperation(operation, callback) {
  switch (operation._type) {
    case 'RelationalOperation':
      console.log('Prepaire to  create relational operation')
      createRelationalOperation(operation, result=>{
        return callback(result);
      });
      break;
    case 'LogicalOperation':
      console.log('Prepaire to  create logical operation')
      createLogicalOperation(operation, result=>{
        return callback(result);
      })
      break;
    default:
      console.log('Operation type invalid: ' + operation._type);
      return callback('Operation type invalid: ' + operation._type);
  }
}
//----------create operation functions-----------//


module.exports.updateRule = function (ruleId, newRule, callback) {
  console.log();
  console.log('---------------UPDATE RULE-----------------')
  Rules.findById(ruleId, (err, rule)=>{
    if(err) throw err;
    if(!!rule){
      rule.time = newRule.time;
      rule.repeat = newRule.repeat;
      rule.thenActions = newRule.thenActions;
      let operationId = rule.ifConditions;
      Operations.findById(operationId, (err, operation)=>{
        if(err) throw err;
        if(!!operation){
          removeOperation(operation, result=>{
            console.log(result);
            if(result.success){
              createOperation(newRule.ifConditions, result=>{
                console.log(result);
                if(result.success){
                  rule.ifConditions = result.operationId;
                  rule.save(err=>{
                    if(err) throw err;
                    return callback({success: true, msg:'Rule has been saved'});
                  })
                } else {
                  return callback(result)
                }
              })
            } else {
              return callback(result)
            }
          });
        } else {
          return callback({success: false, msg: 'ifCondition operation not found'});
        }
      })
    } else {
      return callback({success: false, msg: 'Rule not found'})
    }
  })
}

module.exports.deleteRule = function (ruleId, callback) {
  Rules.findById(ruleId, (err, rule)=>{
    if(err) throw err;
    if(!!rule){
      removeOperation(rule.ifConditions, result=>{
        if(result.success){
          rule.remove(err=>{
            if(err) throw err;
            return callback({success: true, msg:'rule has been removed'});
          })
        } else {
          return callback(result);
        }
      })
    }
  })
}

module.exports.addNewRule = function (newRule, callback) {
  let ifCondition = new Operations();
  ifCondition.save((err, doc)=>{
    if(err) throw err;
    let rule = new Rules({
      name: newRule.name,
      ifConditions: doc._id
    });
    rule.save(err=>{
      if(err) throw err;
      return callback({success: true, msg:'new rule has been saved'});
    })
  })
}
