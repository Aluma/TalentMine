var mongoose = require('mongoose');

var artistSchema = mongoose.Schema({
    name: String,
    tracks: [ {type:mongoose.Schema.Types.ObjectId, ref: 'Track'} ]
});

module.exports = mongoose.model('Artist', artistSchema);