var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Transaction = require('../models/transaction');
var TransactionCategory = require('../models/transaction_category');
var Account = require('../models/account');
var AccountCategory = require('../models/account_category');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = new User({
    userName: 'TestUser',
    password: 'test'
  });
  
  user.save(function(err, result){
    if (err){
      return res.status(500).json({
        title: 'User not made',
        error: err
      });
    }

    res.status(201).json({
      message: 'tacc created',
      obj: result
    });
  });
});

module.exports = router;
