require("dotenv").config();
var keys = require("./keys.js");
var Twitter= require("twitter");
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv[2]

if(action === "my-tweets"){
client.get('statuses/user_timeline', function(error, tweets){
    if (error) throw error;

    for (i=0; i < tweets.length; i++){
    console.log (tweets[i].text);}

    });
}



