//import js things
var express = require('express');
var Twitter = require('twitter');
var fs = require('fs');

//global app var for express actions / director access
var app = express();
var root = './public_html/'

//global vars for app func
var tweetsStatus = false;
var tweetsNumber = '20';
var tweetsOutputFile = 'tweets.json';
var tweetsQuery = 'code';

//getTweets function for aquiring tweets and building json file
//expunge these for github?
var getTweets = function(number, query, filepath) {
  var client = new Twitter({
    consumer_key: 'xURhSELKR6QHbmYszEbD5CkIl',
    consumer_secret: 'xyu0icIgq55jmjO1JTMo1VMfyXj1IWEQ0671Uk1GSFZUkvFllb',
    access_token_key: '954180925-pCCuAwoOxGogNuNp23MZ4oiVHIha4KtCzwmuO0sv',
    access_token_secret: 'Q1APmXYFGVslhZLhlG4MiC9WMGhQ7WmhOuHXpoC85dtbN'
  });
  //empty the tweets.json if exists, create if doesn't
  fs.closeSync(fs.openSync(filepath, 'w'));

  //begin json array
  fs.appendFile(filepath, '[', function(err) { if(err) { console.log(err); } });

  //preapre stream request
  var params = {track: query};
  var tweets = 0;
  client.stream('statuses/filter', params, function(stream) {
    stream.on('data', function(tweet)  {
      //parse object to json
      tweet = JSON.stringify(tweet);
      //console.log(tweet);
      ++tweets;
      console.log(tweets + ' out of ' + number);
      //end if over, else add comma for json formatting
      //encapsulated in specific else/if to avoid async errors
      if (tweets == number) {
        fs.appendFile(filepath, tweet + ']', function(err) { if(err) { console.log(err); } });
        tweetsStatus = true;
        stream.destroy();
      }
      else if (tweets < number) {
        fs.appendFile(filepath, tweet + ',', function(err) { if(err) { console.log(err); } });
      }
    });

    stream.on('error', function(error) {
      console.log(error);
    });

  });
};

//set html serving directory
app.set("view options", {layout: false});
app.use(express.static(root));

//for handling reloading of tweets.json 
app.get('/ticker/reqtweets/:number/:query/:outfile', function(req, response) {
  //only start if not already going...
  if (tweetsStatus) {
    //var data = "regtweets:\n" + "number: " + request.params.number + "\nquery: " + request.params.query;
    tweetsStatus = false;
    getTweets(req.params.number, req.params.query, root + req.params.outfile);
    response.send('Buzzing away...');
  } else {
    response.send('Already working, buzz me later');
  }
});

//for preventing operations while tweets.json remains unloaded
app.get('/ticker/status/', function(req, response){
  response.send(tweetsStatus);
});

//for providing access to angular folders
app.get('/node_modules/angular/angular.js', function(req, response) {
  response.sendfile('./node_modules/angular/angular.js');
  
});

getTweets(tweetsNumber, tweetsQuery, root+tweetsOutputFile);

app.listen(3000)