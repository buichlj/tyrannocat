var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'AccountCategory'}
});

module.exports = mongoose.model('AccountCategory', schema);