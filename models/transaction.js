var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionCategory = require('./transaction_category');
var schema = new Schema({
    date: {type: Schema.Types.Date, required: true},
    amount: {type: Schema.Types.Number, required: true},
    note: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'TransactionCategory', required: true},
    account: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Transaction', schema);