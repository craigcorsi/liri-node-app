// Incorporate keys stored in .env file
var dotenv = require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
// Use request to access OMDB
var request = require('request');
var fs = require('fs');

// import keys.js
var keys = require('./keys.js');

// initialize new Spotify and Twitter clients
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// store command line inputs
var liri_command = process.argv[2];
var liri_media = process.argv[3];






// pretty-print tweets received as an array from the Twitter npm package
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

// pretty-print song info received from the Spotify npm package

function printTrackInfo(track) {

    // format the preview url as two lines
    if (track.preview_url) {
        var s1 = track.preview_url.slice(0, 47);
        var s2 = track.preview_url.slice(47);
    }

    console.log('\n /--------------------------------------------------------------\\');
    console.log('|    ' + track.name + ' by ' + track.artists[0].name);
    for (var j = 1; j < track.artists.length; j++) {
        console.log('|                     ( and ' + track.artists[j].name + ' )');
    }
    if (track.album.name) {
        console.log('|       from the album ' + track.album.name);
    }
    if (track.preview_url) {
        console.log('|    preview: ' + s1);
        console.log(s2 + '    |');
    }
    console.log(' \\--------------------------------------------------------------/\n');
}


// format movie title for OMDB API query
function formatMovieTitle(media) {
    media = media.toLowerCase().split(' ');
    var query = '';
    for (var i = 0; i < media.length; i++) {
        if (i > 0) {
            query += '+';
        }
        query += media[i];
    }
    return query;
}

// pretty-print movie info received from the OMDB API

function printMovieInfo(movie) {
    console.log('\n /------------------------------------------------------------------------\\');
    console.log('|    ' + movie['Title'] + ' (' + movie['Year'] + ')');
    console.log('|  starring ' + movie['Actors']);
    console.log('|    Language(s): ' + movie['Language']);
    console.log('|    Produced in ' + movie['Country']);
    console.log('|      Ratings:');
    for (var i = 0; i < movie['Ratings'].length; i++) {
        var rating = movie['Ratings'][i];
        console.log('|        ' + rating['Source'] + ": " + rating['Value']);
    }
    console.log('|  Plot: ' + movie['Plot']);
    console.log(' \\------------------------------------------------------------------------/\n');
}













// runtime functions
var liri_run = {
    'my-tweets': function (media) {
        // specify username, then request tweets from Twitter
        var params = { screen_name: 'ChallengerChip' };
        twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                // on success, pretty-print tweets
                printTweets(tweets);
            }
        });
    },
    'spotify-this-song': function (media) {
        // if no song is passsed, search for Ace of Base's "The Sign"
        if (media == undefined) {
            media = "The Sign Ace of Base";
        }
        // request track info from Spotify
        spotify.search({ type: 'track', query: media }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                // on success, pretty-print track info
                printTrackInfo(data.tracks.items[0]);
            }
        });
    },
    'movie-this': function (media) {
        var query = formatMovieTitle(media);
        request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var movie = JSON.parse(body);
                // on success, pretty-print movie info
                printMovieInfo(movie);
            }
        });
    },
    'do-what-it-says': function (media) {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
            } else {
                // parse the string as a pair of input variables
                var dataArr = data.split(",");
                // here it is understood that there must be 1-2 input variables (command and media title)
                // self-reference to run the corresponding function
                liri_run[dataArr[0]](dataArr[1]);
            }
        });

    }
}

liri_run[liri_command](liri_media);