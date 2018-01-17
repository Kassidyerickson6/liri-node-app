require("dotenv").config()

var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs'); 

// instructions for user
console.log("Type in one of the following options: my-tweets, spotify-this-song, movie-this, do-what-it-says");

// action
var userInput = process.argv[2];
// for spotify and movie
var userInput2 = process.argv[3];


  //process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
	for(i=4; i<process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}


// function containing a switch for the options
function options(){

   	switch(userInput) {

		case "my-tweets": 
		myTweets(); 
		break;

		case "spotify-this-song": 
		spotifyThisSong(); 
		break;

		case "movie-this":
		 movieThis(); 
		 break;

		case "do-what-it-says": 
		doWhatItSays(); 
		break;
	}
};
// function for tweets
function myTweets() {

// variable taking in the keys for twitter

	var client = new twitter({
		consumer_key: keys.twitter.consumer_key,
		consumer_secret: keys.twitter.consumer_secret,
		access_token_key: keys.twitter.access_token_key,
		access_token_secret: keys.twitter.access_token_secret
	});

	// twitter function parameters
	var parameters = {screen_name: "KassiJoe", count:20};

	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	        }
	    };
	});
};
// I was not able to get the spotify command to work
function spotifyThisSong(){

  var spotify = new spotify({
  	id: keys.spotify.id,
  	secret: keys.spotify.secret
  });

	var searchSong;
	if(userInput2 === undefined){
		searchSong = "What's My Age Again?";
	}else{
		searchSong = userInput2;
	}

	spotify.search({type:'track', query:searchSong}, function(err,data){
	    if(err){
	        console.log('Error: ' + err);
	        return;
	    }else{
	       
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview: " + data.tracks.items[0].preview_url);
	    }
	});
};

function movieThis(){

	var searchMovie;
	if(userInput2 === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = userInput2;
	};

	var queryUrl = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=short&apikey=trilogy&';
   	request(queryUrl, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body).Title);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};

function doWhatItSays(){
	
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	var dataArr = data.split(',');
        userInput = dataArr[0];
        userInput2 = dataArr[1];

        for(i=2; i<dataArr.length; i++){
            userInput2 = userInput2 + "+" + dataArr[i];
        };

		options();
		
    	};

    });

};

options();



