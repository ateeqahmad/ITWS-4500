var tweetdex = 0; //counter to keep track keep track of current tweet
var tweetTicker = function (tweets) {
  //initialize first 6 tweets
  //var interval = 3000; //ms interval for looping
  //var interval = document.getElementById('slider-2').value*1000;
  var ta = ""; //to append
  var tweetBox = document.getElementById('tweetBox'); //element we'll be messing with
  while (tweetdex < 6 && tweetdex < tweets.length) {
    ta += '<div class="tweet" style="top: ';
    ta += tweetdex*20; //distance from top for visibility
    ta += '%;"><div class="tweetPic" style="background-color: #';
    ta += tweets[tweetdex].color;
    ta += ';"><a class="tweetUser" href="https://www.twitter.com/';
    ta += tweets[tweetdex].screen_name;
    ta += '" target="_blank">@';
    ta += tweets[tweetdex].screen_name;
    ta += '</a></div><div class="tweetText">';
    ta += tweets[tweetdex].text;
    ta += '</div></div>';
    ++tweetdex;
  } //last tweet is hidden
  tweetBox.innerHTML = ta; //append to tweetbox
  tickTweets(tweets);
}

var tickTweets = function(tweets) {
  var interval = document.getElementById('slider-2').value*1000;
  var tweetBox = document.getElementById('tweetBox'); //element we'll be messing with
  tweetInt = setTimeout(function() {
    $.each(tweetBox.childNodes, function(i, node) { //go through each node and increment height
      var newTop = node.style.top.replace('%','')-20;
      node.style.top =  newTop + "%";
    });
    setTimeout(function() { //wait before removing to avoid visual freakouts
      if (tweetdex >= tweets.length) { //reset if no more tweets available
        tweetdex = 0; 
      }
      var ta = '<div class="tweet" style="top: 100%;"><div class="tweetPic" style="background-color: #';
      ta += tweets[tweetdex].color;
      ta += ';"><a class="tweetUser" href="https://www.twitter.com/';
      ta += tweets[tweetdex].screen_name;
      ta += '" target="_blank">@';
      ta += tweets[tweetdex].screen_name;
      ta += '</a></div><div class="tweetText">';
      ta += tweets[tweetdex].text;
      ta += '</div></div>';
      ++tweetdex;
      tweetBox.innerHTML += ta;
      tweetBox.removeChild(tweetBox.firstChild);
    }, interval*(2/3));
    tickTweets(tweets);
  }, interval);
}

var tagdex = 0; //counter to keep track keep track of current tag
var tagTicker = function (tags) {
  //initialize first 6 tweets
  //var interval = 3500; //ms interval for looping
  var ta = ""; //to append
  var tagBox = document.getElementById('tagBox'); //element will be messing with
  var tagKeys = Object.keys(tags);
  while (tagdex < 6 && tagdex < tagKeys.length) {
    ta += '<div class="tag" style="left: ';
    ta += tagdex*20; //distance from top for visibility
    ta += '%;"><a href="https://www.twitter.com/hashtag/';
    ta += tagKeys[tagdex];
    ta += '" target="_blank">#';;
    ta += tagKeys[tagdex];
    ta += '</a></div>';
    ++tagdex;
  } //last tweet is hidden
  tagBox.innerHTML = ta; //append to tagbox
  tickTags(tagKeys);
}

var tickTags = function(tagKeys) {
  var interval = document.getElementById('slider-1').value*1000;
  var tagBox = document.getElementById('tagBox'); //element will be messing with
  setTimeout(function() {
    $.each(tagBox.childNodes, function(i, node) { //go through each node and increment height
      var newTop = node.style.left.replace('%','')-20;
      node.style.left =  newTop + "%";
    });
    setTimeout(function() { //wait before removing to avoid visual freakouts
      if (tagdex >= tagKeys.length) { //reset if no more tweets available
        tagdex = 0; 
      }
      ta = '<div class="tag" style="left: 100%"><a href="https://www.twitter.com/hashtag/';
      ta += tagKeys[tagdex];
      ta += '" target="_blank">#';;
      ta += tagKeys[tagdex];
      ta += '</a></div>';
      ++tagdex;
      tagBox.innerHTML += ta;
      tagBox.removeChild(tagBox.firstChild);
    }, interval*(2/3));
      tickTags(tagKeys);
  }, interval);
}

var aquireTweets = function () {
  var widget_id = "571079149499187200"; //id of twitter widget
  abuseWidget(widget_id);
  // old aquire tweets, with tweets.json
  /*
  var tweets = [];
  var tags = [];
  var tweet_loc = 'tweets.json';
  $.getJSON(tweet_loc, function(json) {
    //console.log(data);
    $.each(json, function(i, tweet) {
      tweets.push({
        "screen_name" : tweet.user.screen_name,
        "text" : tweet.text,
        "color" : tweet.user.profile_background_color
      });
      //console.log(tweet.user.profile_image_url_https);
      $.each(tweet.entities.hashtags, function(j, tag) {
        if (tags[tag.text]) {
          ++tags[tag.text];
        } else {
          tags[tag.text] = 1;
        }
      });
    });
    tweetTicker(tweets);
    tagTicker(tags);
  });
  */
}

$( document ).on( "pageinit", "#demo-page", function() {
    $( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

aquireTweets();

