var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Transaction = require('../models/transaction');
var TransactionCategory = require('../models/transaction_category');
var ReoccuringTransaction = require('../models/reoccuring_transaction');

var Account = require('../models/account');

var User = require('../models/user');

router.get('/', function(req, res, next){
    Transaction.find(function(err, transactions){
        if (err){
            return res.status(404).json({
                title: 'Shit went bad',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: transactions
        })
    });
});


router.post('/', function(req, res, next){
    var transactions = [];
    var newTransactions = [];
    var data = req.body;
    var categories = [];
    for(var i=0; i < req.body.length; i++){
        transactions.push(req.body[i]);
        categories.push(req.body[i].category);
    }

    TransactionCategory.find({'_id': {$in: categories}}, function(transactionError, returnedCategories){
        if (transactionError){
            return res.status(404).json({
                title: 'An error occured, TransactionCategory',
                error: transactionError
            });
        }
        categories = {};
        for(var i=0; i < returnedCategories.length; i++){
            categories[returnedCategories[i]._id] = returnedCategories[i];
        }
        console.log(categories);
        Account.findById(transactions[0].account.id, function(accountError, account){
            if (accountError){
                return res.status(404).json({
                    title: 'An error occured, Account',
                    error: accountError
                });
            }

            User.findById("584e2c778884e128504fbf88", function(userError, user){
                if (userError){
                    return res.status(404).json({
                        title: 'An error occured, User',
                        error: userError
                    });
                }
                for(var i=0; i < transactions.length; i++){
                    newTransactions.push(new Transaction({
                        date: transactions[i].date,
                        amount: transactions[i].amount,
                        note: transactions[i].note,
                        category: categories[transactions[i].category],
                        account: account,
                        user: user
                    }));
                }
                Transaction.create(newTransactions, function(saveError, savedTransactions){
                    if(saveError){
                        return res.status(500).json({
                            title: 'An error occured, Saving',
                            error: saveError
                        });
                    }
                    for(var i = 0; i < savedTransactions.length; i++){
                        account.amount += savedTransactions[i].amount;
                    }
                    account.amount = Number(account.amount.toFixed(2));
                    account.save(function(accSave, result){
                        if(accSave){
                            return res.status(500).json({
                                title: 'An error occured saving Account',
                                error: accSave
                            });
                        }
                        res.status(201).json({
                            message: 'Saved '+savedTransactions.length+' of '+transactions.length+' Transaction(s)',
                            obj: savedTransactions
                        });
                    });
                })
            });
        });
    });      
});

module.exports = router;