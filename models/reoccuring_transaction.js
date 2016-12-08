var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = require('./transaction');
var schema = new Schema({
    timespan: {type: Number, required: true},
    transaction: {type: Schema.Types.ObjectId, ref: 'Transaction'}
});

module.exports = mongoose.model('ReoccuringTransaction', schema);