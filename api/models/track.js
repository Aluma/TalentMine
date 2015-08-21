var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    name: String,
    genre: String,
    artists: [ {type:mongoose.Schema.Types.ObjectId, ref: 'Artist'} ]
});

module.exports = mongoose.model('Track', trackSchema);