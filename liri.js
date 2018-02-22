require("dotenv").config();
var keys = require("./keys.js");
var Twitter= require("twitter");
var Spotify = require('node-spotify-api');
const OmdbApi = require('omdb-api-pt')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2]
var input= process.argv[3]

// twitter
if(command === "my-tweets"){
client.get('statuses/user_timeline', function(error, tweets){
    if (error) throw error;

    for (i=0; i < tweets.length; i++){
    console.log (tweets[i].text);}

    });
}


// SPOTIFY
if(command === "spotify-this-song"){
spotify.search({ type: 'track', query: input}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


  
  console.log(data.tracks.items[0].artists[0].name + " noartist");
  console.log(data.tracks.items[0].album.name + " album");
  console.log(data.tracks.items[0].name + " name");
  console.log(data.tracks.items[0].preview_url + " preview URL");  
  });
}

// OMDB
if (command === "movie-this")
var request= require("request");

request("http://www.omdbapi.com/?t=" + input + "&plot=short&apikey=trilogy", function(error, response, body){
  if (error) {
    return console.log('Error occurred: ' + error);
  }

  console.log(JSON.parse(body).Title);
  console.log(JSON.parse(body).Year);
  console.log(JSON.parse(body).imdbRating);
  console.log(JSON.parse(body).Ratings[1]);
  console.log(JSON.parse(body).Country);
  console.log(JSON.parse(body).Language);
  console.log(JSON.parse(body).Plot);
  console.log(JSON.parse(body).Actors);
  
});

