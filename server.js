var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Track = require('./api/models/Track');
var Artist = require('./api/models/Artist');

mongoose.connect('mongodb://localhost/talentmine');

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/api/tracks', function(req, res) {
    Track.find({}).exec().then(function(tracks) {
        return res.json(tracks);
    });
});

app.post('/api/tracks', function(req, res) {
    Track.create({
        name: req.body.name,
        genre: req.body.genre
    }, function(err, new_track) {
        if (err) {
            return res.status(500).end();
        }
        return res.json(new_track)
    });
});

app.get('/api/tracks/:track_id', function(req, res) {
    Track.findOne({_id: req.params.track_id})
        .populate('artists')
        .exec().then(function(track) {
            if (!track) {
                return res.status(404).end();
            }
            return res.json(track);
        });
});

app.put('/api/tracks/:track_id', function(req, res) {
    Track.findByIdAndUpdate(req.params.track_id, req.body, {new:true}, function(err, new_track) {
        return res.json(new_track);
    });
});

app.delete('/api/tracks/:track_id', function(req, res) {
    Track.findByIdAndRemove(req.params.track_id, function(err) {
        return res.status(200).end();
    });
});

app.post('/api/tracks/:track_id/artists/:artist_id', function(req, res) {
    Track.findByIdAndUpdate(req.params.track_id, {$push:{artists: req.params.artist_id}}, {new: true}, function(err, new_track) {
        if (err) {
            return res.status(500).end();
        }
        return res.json(new_track);
    });
});

app.get('/api/artists', function(req, res) {
    Artist.find({}).exec().then(function(artists) {
        return res.json(artists);
    });
});

app.post('/api/artists', function(req, res) {
    Artist.create({
        name: req.body.name,
    }, function(err, new_artist) {
        if (err) {
            return res.status(500).end();
        }
        return res.json(new_artist)
    });
});

app.get('/api/artists/:artist_id', function(req, res) {
    Artist.findOne({_id: req.params.artist_id})
        .populate('tracks')
        .exec().then(function(artist) {
            if (!artist) {
                return res.status(404).end();
            }
            return res.json(artist);
        });
});

app.post('/api/artists/:artist_id/tracks/:track_id', function(req, res) {
    Artist.findByIdAndUpdate(req.params.artist_id, {$push:{tracks: req.params.track_id}}, {new: true}, function(err, new_track) {
        if (err) {
            return res.status(500).end();
        }
        return res.json(new_track);
    });
});

app.get('/api/labels', function(req, res) {
    return res.json([]);
});

app.get('/api/labels/:label_id', function(req, res) {
    return res.json({
        name: "Columbia"
    });
});


app.listen(8888);