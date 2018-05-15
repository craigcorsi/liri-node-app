// Incorporate keys stored in .env file
var dotenv = require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
// Use request to access OMDB
var request = require('request');

// import keys.js
var keys = require('./keys.js');

// initialize new Spotify and Twitter clients
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// store command line inputs
var liri_command = process.argv[2];
var liri_media = process.argv[3];






// function for pretty-printing tweets received as an array from the Twitter npm package
function printTweets(tweets) {
    console.log(" --- -- - LAST 20 TWEETS - -- --- ");
    var l = tweets.length;
    for (var i = 0; i < l; i++) {
        if (i == l - 1) {
            console.log('\nAnd the most recent:\n');
        }
        console.log(' /--------------------------------\\');
        console.log(" | " + tweets[l - 1 - i].created_at + " |");
        console.log(' \\--------------------------------/');
        console.log('   |');
        console.log("   |" + tweets[l - 1 - i].text);
        console.log('   |');
    }
}

// function for pretty-printing song into received from the Spotify npm package

function printTrackInfo(track) {

    // format the preview url as two lines
    var s1 = track.preview_url.slice(0, 47);
    var s2 = track.preview_url.slice(47);

    console.log(' /--------------------------------------------------------------\\');
    console.log('|    ' + track.name + ' by ' + track.artists[0].name);
    for (var j = 1; j < track.artists.length; j++) {
        console.log('|                     ( and ' + track.artists[j].name + ' )');
    }
    console.log('|       from the album ' + track.album.name);
    console.log('|    preview: ' + s1);
    console.log(s2 + '    |');
    console.log(' \\--------------------------------------------------------------/');
}


















// runtime functions
var liri_run = {
    'my-tweets': function (media) {
        // specify username, then request tweets from Twitter
        var params = { screen_name: 'ChallengerChip' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                printTweets(tweets);
            }
        });
    },
    'spotify-this-song': function (media) {
        if (media == undefined) {
            media = "The Sign";
        }
        spotify.search({ type: 'track', query: media }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                printTrackInfo(data.tracks.items[0]);
            }
        });
    },
    'movie-this': function (media) {
        console.log("This is a good movie.");
    },
    'do-what-it-says': function (media) {
        console.log("The contents of the .txt file are cool.");
    }
}

liri_run[liri_command](liri_media);