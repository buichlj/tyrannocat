var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'TransactionCategory'}
});

module.exports = mongoose.model('TransactionCategory', schema);