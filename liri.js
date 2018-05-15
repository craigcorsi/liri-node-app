// Incorporate keys stored in .env file
var dotenv = require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
// Use request to access OMDB
var request = require('request');

// import keys.js
var keys = require('./keys.js');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);


var liri_command = process.argv[2];
var liri_media = process.argv[3];

var liri_run = {
    'my-tweets': function(media) {
        console.log("Here's your tweet: \n 'O M G so cool'");
    },
    'spotify-this-song': function(media) {
        console.log("This is a good song.");
    },
    'movie-this': function(media) {
        console.log("This is a good movie.");
    },
    'do-what-it-says': function(media) {
        console.log("The contents of the .txt file are cool.");
    }
}

liri_run[liri_command](liri_media);