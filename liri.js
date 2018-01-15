require("dotenv").config()

var keys = require("./keys.js");
var twitter = require('twitter');
// var spotify = require('spotify');
var request = require('request');
var fs = require('fs'); 

console.log("Type in one of the following options: my-tweets, spotify-this-song, movie-this, do-what-it-says");

var userCommand = process.argv[2];
var secondCommand = process.argv[3];

  // var spotify = new Spotify(keys.spotify);



function theGreatSwitch(){

   	switch(userCommand) {

		case "my-tweets": 
		myTweets(); 
		break;

		// case "spotify-this-song": 
		// spotifyThisSong(); 
		// break;

		case "movie-this":
		 movieThis(); 
		 break;

		case "do-what-it-says": 
		doWhatItSays(); 
		break;
	}
};

function myTweets() {

	console.log("Your tweets");

	var client = new Twitter(keys.twitter);

	var parameters = { screen_name: "KassiJoe", count:20};

	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	        }
	    };
	});
};

// function spotifyThisSong(){
// 	console.log("Your music");

// 	//variable for search term, test if defined.

// 	var searchTrack;
// 	if(secondCommand === undefined){
// 		searchTrack = "What's My Age Again?";
// 	}else{
// 		searchTrack = secondCommand;
// 	}
// 	//launch spotify search
// 	spotify.search({type:'track', query:searchTrack}, function(err,data){
// 	    if(err){
// 	        console.log('Error occurred: ' + err);
// 	        return;
// 	    }else{
	       
// 	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
// 	        console.log("Song: " + data.tracks.items[0].name);
// 	        console.log("Album: " + data.tracks.items[0].album.name);
// 	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
// 	    }
// 	});
// };//end spotifyMe

function movieThis(){
	console.log("Your movie");

	//same as above, test if search term entered
	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
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
};//end aMovieForMe

function doWhatItSays(){
	
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	//split data, declare variables
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        //if multi-word search term, add.
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        //run action
		theGreatSwitch();
		
    	};//end else

    });//end readfile

};//end followTheTextbook

theGreatSwitch();



