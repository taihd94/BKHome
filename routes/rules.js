const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const LightingControl = require('../mongodb/home-model/lightingControl');
const SensorModule = require('../mongodb/home-model/sensorModule');
const Rules = require('../mongodb/home-model/rules');



router.get('/', (req, res, next)=>{
  Rules.getListOfRules((result)=>{
    res.json(result);
  })
})

router.get('/relational-operation/:id', (req, res, next)=>{
  operationId =  req.params.id;
  if(operationId!='undefined'){
    Rules.getRelationalOperation(operationId, (result)=>{
      res.json(result);
    })
  } else {
    res.json({success: false, msg: 'id is undefinded'})
  }
})

router.get('/logical-operation/:id', (req, res, next)=>{
  operationId =  req.params.id;
  if(operationId!='undefined'){
    Rules.getLogicalOperation(operationId, (result)=>{
      res.json(result);
    })
  } else {
    res.json({success: false, msg: 'id is undefinded'})
  }
})

router.get('/operation/:id', (req, res, next)=>{
  operationId =  req.params.id;
  if(operationId!='undefined'){
    Rules.getRelationalOperation(operationId, (result)=>{
      if(result.success){
        res.json(result)
      } else {
        Rules.getLogicalOperation(operationId, (result)=>{
          res.json(result);
        })
      }
    })
  } else {
    res.json({success: false, msg: 'id is undefinded'})
  }
})

router.put('/:id/', (req, res, next)=>{
  let ruleId = req.params.id;
  let newRule = req.body;
  Rules.updateRule(ruleId, newRule, result=>{
    res.json(result);
  })
})

router.put('/:id/if-condition/', (req, res, next)=>{
  let ruleId = req.params.id;
  let newRule = req.body;
  Rules.updateRule(ruleId, newRule, result=>{
    res.json(result);
  })
})

router.delete('/:id', (req, res, next)=>{
  let ruleId = req.params.id;
  Rules.deleteRule(ruleId, result=>{
    res.json(result);
  })
})

router.post('/', (req, res, next)=>{
  let newRule = req.body;
  Rules.addNewRule(newRule, result=>{
    res.json(result);
  })
})

module.exports = router;
