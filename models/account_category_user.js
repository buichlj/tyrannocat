var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    category: {type: Schema.Types.ObjectId, ref: 'AccountCategory', required: true}
});

module.exports = mongoose.model('AccountCategoryUser', schema);