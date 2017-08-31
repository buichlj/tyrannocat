var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountCategory = require('./account_category');
var schema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    account: {type: Schema.Types.ObjectId, ref: 'Account'},
    category: {type: Schema.Types.ObjectId, ref: 'AccountCategory', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Account', schema);