require("dotenv").config();
const keys = require("./keys.js");
const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const OmdbApi = require('omdb-api-pt')
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const request = require("request");
const command = process.argv[2]
const input = process.argv[3]
const fs = require("fs");

//TWITTER
const getTwitter = () => {
  client.get('statuses/user_timeline', function (error, tweets) {
    if (error) throw error;
    tweets.forEach(element => {
      console.log(tweets[i].text);
    });
  });
}

// SPOTIFY
const getSpotify = (input) => {
  if (!input) {
    input = "ace of base";
  }
  spotify.search({
    type: 'track',
    query: input
  }, function (err, data) {
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
const getMovie = (input) => {

  if (input === undefined) {
    input = "Mr. Nobody";
  }
  request("http://www.omdbapi.com/?t=" + input + "&plot=short&apikey=trilogy", function (error, response, body) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    console.log(input)
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Ratings[1]);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);

  });
}

const getDoSomething = () => {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    data = (data.split(","))
    spotify.search({
      type: 'track',
      query: data[1]
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items[0].artists[0].name + " noartist");
      console.log(data.tracks.items[0].album.name + " album");
      console.log(data.tracks.items[0].name + " name");
      console.log(data.tracks.items[0].preview_url + " preview URL");
    });
  });
}
// twitter
switch (command) {
  case "my-tweets":
    getTwitter()
    break;
  case "spotify-this-song":
    getSpotify(input)
    break;
  case "movie-this":
    getmovie(input)
    break;
  case "do-what-it-says":
    getDoSomething()
    break;
  default:
    console.log("improper command line arguements");
}