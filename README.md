# liri-node-app
LIRI (Language Interpretation and Recognition Interface): a Node app for displaying data from Twitter, Spotify, and The Open Movie Database.


Installation
------------

0) Ensure that node and npm are installed.

1) Click "clone or download" at this repo's main page, then download and unzip the repo. 

2) Navigate to the folder just installed in the Terminal / Command Line, then type 'npm install' to install the necessary node modules.

3) On line 115 of liri.js, replace 'ChallengerChip' with your Twitter handle, enclosed in quotes.

4) In your 'keys.js' file, replace the six values with your own authentication values from the Twitter and Spotify APIs.

To obtain Spotify API keys:
  a) Visit https://developer.spotify.com/my-applications/#!/
  b) Either login to your existing Spotify account or create a new one (a free account suffices to run this app) and log in.
  c) Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. When finished, click the "complete" button.
  d) On the next screen, scroll down to view your client id and client secret.
  
To obtain Twitter API keys:
  a) Visit https://apps.twitter.com/app/new. To avoid the Access Denied alert, make sure you're signed in to Twitter. 
  b) Fill out the form with dummy data. Type http://google.com in the Website input. Don't fill out the Callback URL input. Then submit the form.
  c) On the next screen, click the Keys and Access Tokens tab to get your consumer key and secret. 
  d) At the bottom of the page, click the 'Create my access token' button to get your access token key and secret. 


How to use LIRI
---------------

LIRI is entirely operated from the command line situated at the root directory of the application. All commands are of the form

node liri.js <command> <possible fourth arg>
  
Replace <command> with one of the following:

  my-tweets (no fourth argument)
    displays the user's twenty most recent posts to Twitter.
     
  spotify-this-song <song-title>
    searches Spotify and returns track info about the first result. Spotify can handle additional information to refine the 
    search, e.g. "Elastic Heart Sia". If no fourth argument is given, LIRI will search "The Sign Ace of Base".
    
  movie-this <movie-title>
    calls the OMDB API and returns movie info about the first result. You will have to omit non-alphanumeric characters. If
    no fourth argument is given, LIRI will search "Mr Nobody".
    
  do-what-it-says (no fourth argument)
    reads random.txt and performs the command written within as if it were input into the command line.
   
Craig Corsi 2018
