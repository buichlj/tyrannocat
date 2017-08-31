var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var User = require('../models/user');
var AccountCategory = require('../models/account_category');

router.post('/', function(req, res, next){
    User.findById("584e2c778884e128504fbf88", function(err, user){
        if(err) {
            return res.status(500).json({
                title: 'An error occured and shit went bad. Here1',
                error: err
            });
        }
        AccountCategory.findById(req.body.category.id, function(err, category){
            if(err) {
               return res.status(500).json({
                    title: 'An error occured and shit went bad. Here2',
                    error: err
                }); 
            }

                Account.findById(req.body.account ? req.body.account.id : "", function(error, parentAccount){
                    if(err) {
                        return res.status(500).json({
                            title: 'An error occured and shit went bad. Here3',
                            error: err
                        }); 
                    }
                    
                    var account = new Account({
                        name: req.body.name,
                        amount: req.body.amount ? req.body.amount : 0,
                        account: parentAccount,
                        category: category,
                        user: user
                    });
                    account.save(function(err, result){
                        if(err){
                            return res.status(500).json({
                                title: 'An error occured and shit went bad. Here4',
                                error: err
                            });
                        }
                    res.status(201).json({
                        message: 'Saved Account',
                        obj: result
                    });
                });
            });
        });
        
    });
});

router.delete('/', function(req, res, next){
    Account.findById(req.body.id, function(err, account){
        if(err){
            return res.status(500).json({
                title: 'An error occured and shit went bad deleting',
                error: err
            });
        }
        Account.find({account: account}, function(err, childAccount){
            if(err){
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }else if(childAccount && childAccount.length > 0){
                return res.status(500).json({
                    title: 'Record for delete has children.',
                    error: err
                });
            }
            Account.findOneAndRemove({_id: req.body.id}, function(err){
                if(err){
                    return res.status(500).json({
                        title: 'An error occured and shit went bad when deleting',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Deleted Account'
                });
            });
        });
    });
});

router.get('/', function(req, res, next){
    Account.find()
        .populate('account')
        .populate('category')
        .populate('user')
        .exec(function(err, accounts){
            if (err) {
                console.log("Error");
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }
            console.log("Success");
            res.status(200).json({
                message: 'Success',
                obj: accounts
            });
        });
});

module.exports = router;