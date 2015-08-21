var mongoose = require('mongoose');

var labelSchema = mongoose.Schema({
    name: String,
    artists: [],
    favorite_tracks: []
});