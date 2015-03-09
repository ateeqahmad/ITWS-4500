var abuseWidget = function(widget_id) {
  //this function creates a widget using a widget id from twitter
  //said widget is used to extract tweets and tags from a live feed
  var script = document.createElement('script'); //the script tag will call
  script.type = 'text/javascript'; //twitter, and twitter will return the data and feed it to extractTweets
  script.src = '//cdn.syndication.twimg.com/widgets/timelines/' 
    + widget_id + '?&lang=en&callback=extractTweets&' 
    + 'suppress_response_codes=true&rnd=' + Math.random();
  document.getElementsByTagName('head')[0].appendChild(script);
}

var extractTags = function(text) {
  /*
  //get hash tags from tweet text because the widget doesn't give them to me :(
  return text.match(/#\w+/g); //captures array of hash tags
  //match is probably the coolest function I've ever discovered in js
  //I take that back it betrayed me
  */
  var hashes = text.getElementsByClassName('hashtag customisable');
  var tweetTags = [];
  for (var k = 0; k < hashes.length; ++k) {
    tweetTags.push(hashes[k].innerHTML.replace('#<b>','').replace('</b>',''));
  }
  return tweetTags;
}

var extractTweets = function(data) {
  //takes in twitter widget html node
  //create a dummy element for easier navigation (I can use DOM things :D)
  var dataBody = document.createElement('div');
  dataBody.innerHTML = data.body;
  //document.getElementsByTagName('body')[0].innerHTML = data.body;
  var tweetNodes = dataBody.getElementsByTagName('ol')[0].children;
  var tweets = [];
  var tags = [];
  for (var i = 0; i < tweetNodes.length; ++i) {
    //collect data, there isn't as much as the api :/
    var tweet = tweetNodes[i];
    var screen_name = tweet.getElementsByClassName('p-nickname')[0].innerHTML.replace('@<b>','').replace('</b>','');
    var text = tweet.getElementsByClassName('e-entry-title')[0].innerHTML;
    var color = "FFFFFF";
    tweets.push({
      "screen_name" : screen_name,
      "text" : text,
      "color" : color
    });
    //extract hashes from tweet text and index (for possible ranking)
    var tweetTags = extractTags(tweet.getElementsByClassName('e-entry-title')[0]);
    if (!!tweetTags) {
      for (var j = 0; j < tweetTags.length; ++j) {
        if (tags[tweetTags[j]]) {
          ++tags[tweetTags[j]];
        } else {
          tags[tweetTags[j]] = 1;
        }
      }
    }
  }

  //activate the tickers
  tweetTicker(tweets)
  tagTicker(tags);
}
//moved to app.js
/*
var widget_id = "571079149499187200"; //id of twitter widget
abuseWidget(widget_id);
*/