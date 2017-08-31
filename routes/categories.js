var express = require('express');
var router = express.Router();

var AccountCategory = require('../models/account_category');
var TransactionCategory = require('../models/transaction_category');

router.get('/accountCategories', function(req, res, next){
    AccountCategory.find()
        .populate('category')
        .exec(function(err, accountCategories){
            if (err) {
                console.log("Error");
                return res.status(500).json({
                    title: 'An error occured and went bad',
                    error: err
                });
            }

            console.log("Success");
            res.status(200).json({
                message: 'Success',
                obj: accountCategories
            });
        });
});

router.post('/accountCategories', function(req, res, next){
    var accountCategory;
    console.log(req.body.category);
    AccountCategory.findById(req.body.category, function(err, category){
        accountCategory = new AccountCategory({
            name: req.body.name,
            category: category
        });
        accountCategory.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved Account Category',
                obj: result
            });
        });
    });
});

router.delete('/accountCategories', function(req, res, next){
    AccountCategory.findById(req.body.id, function(err, category){
        if(err){
            return res.status(500).json({
                title: 'An error occured and shit went bad',
                error: err
            });
        }
        AccountCategory.find({category: category}, function(err, childCategory){
            if(err){
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }else if(childCategory && childCategory.length > 0){
                console.log(childCategory);
                return res.status(500).json({
                    title: 'Record for delete has children.',
                    error: err
                });
            }
            AccountCategory.findOneAndRemove({_id: req.body.id}, function(err){
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

router.get('/transactionCategories', function(req, res, next){
    TransactionCategory.find()
        .populate('category')
        .exec(function(err, transactionCategories){
            if (err) {
                console.log("Error");
                return res.status(500).json({
                    title: 'An error occured and went bad',
                    error: err
                });
            }

            console.log("Success");
            res.status(200).json({
                message: 'Success',
                obj: transactionCategories
            });
        });
});

router.post('/transactionCategories', function(req, res, next){
    var transactionCategory;
    console.log(req.body.category);
    TransactionCategory.findById(req.body.category, function(err, category){
        transactionCategory = new TransactionCategory({
            name: req.body.name,
            category: category
        });
        transactionCategory.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved Transaction Category',
                obj: result
            });
        });
    });
});

router.delete('/transactionCategories', function(req, res, next){
    TransactionCategory.findById(req.body.id, function(err, category){
        if(err){
            return res.status(500).json({
                title: 'An error occured and shit went bad',
                error: err
            });
        }
        TransactionCategory.find({category: category}, function(err, childCategory){
            if(err){
                return res.status(500).json({
                    title: 'An error occured and shit went bad',
                    error: err
                });
            }else if(childCategory && childCategory.length > 0){
                console.log(childCategory);
                return res.status(500).json({
                    title: 'Record for delete has children.',
                    error: err
                });
            }
            TransactionCategory.findOneAndRemove({_id: req.body.id}, function(err){
                if(err){
                    return res.status(500).json({
                        title: 'An error occured and shit went bad when deleting',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Deleted Category'
                });
            });
        });
    });
});

module.exports = router;