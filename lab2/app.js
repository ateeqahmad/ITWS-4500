//formats the temperature for display
function showTemp(temp) {
  //originally I didn't see I could make requests in various units so I did it myself
  /*
  if (type != 'k') {
    temp = temp-273.15; //kelvin to celcius
    if (type == 'f') { //celcius to f is easier than k to f
      temp = ((9/5)*temp) + 32;
    }
  }
  */
  //this formats it to just the int it needs to be
  //if negative get lower, positive get higher
  if (temp < 0) temp = Math.floor(temp);
  else temp = Math.ceil(temp);
  return temp;
}

//this changes the current unit system and updates the weather
var changeType = function(type) {
  localStorage['type'] = type;
  var letter = 'f';
  var wind = 'fps';
  if (type == 'metric') { letter = 'c'; wind = 'mps'; }
  else if (type == 'internal') { letter = 'k'; wind = 'mps'; }
  localStorage['letter'] = letter;
  localStorage['wind'] = wind;
  getWeather();
}

//this populates the weather 
var getWeather = function() {
  var wData = {};
  //check local storage for temperature format strings
  if (!localStorage['type']) localStorage['type'] = 'metric';
  if (!localStorage['letter']) localStorage['letter'] = 'c';
  if (!localStorage['wind']) localStorage['wind'] = 'mps';
  //ask for location, support is assumed as all browsers tested in this class support this
  navigator.geolocation.getCurrentPosition(function(position) {
    //format location passed through in position
    var loc = 'lat=' + position.coords.latitude;
    loc += '&lon=' + position.coords.longitude;
    //format temperature request
    var temp = '&units=' + localStorage['type'];
    //request data and pass it along in var weather
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?'+loc+temp, function(weather) {
      //begin building new html content for webpage
      var ta = '<div class="jumbotron"><h1><img src="http://openweathermap.org/img/w/';
      ta += weather.weather[0].icon; //weather image
      ta += '.png">&nbsp;'
      ta += showTemp(weather.main.temp) + ' °' + localStorage['letter']; //temp
      ta +='</h1><p class="lead">';
      ta += weather.name + ', ' + weather.sys.country; //weather station name
      ta += '</p><p>';
      //capitalize the string because they don't :(
      var desc = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.substring(1);
      ta += desc + '.</p><p>'; //weather desc
      //temperature switching buttons
      ta += 'Humidity: ' + weather.main.humidity + '%</p><p>';
      ta += 'Wind Speed (vroom): ' + weather.wind.speed + localStorage['wind'] + '</p><p>';
      ta += '<a class="btn btn-lg btn-success" onclick="changeType(\'imperial\');" href="#" role="button">F</a>&nbsp;';
      ta += '<a class="btn btn-lg btn-success" onclick="changeType(\'metric\');" href="#" role="button">C</a>&nbsp;';
      ta += '<a class="btn btn-lg btn-success" onclick="changeType(\'internal\');" href="#" role="button">K</a</p></div>';
      document.getElementById('main').innerHTML = ta; //updates
    });
  });
}


//get weather data and update every 30 seconds
window.onload = function() {
  setInterval(getWeather(),30000);
}


