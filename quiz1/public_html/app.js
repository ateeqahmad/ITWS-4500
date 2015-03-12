var displayGreeting = function() {
  //this'll take ages, so we should have a loading animation
  document.getElementById('loading').style.display = 'inline';
  var name = document.getElementById('nameIn').value;
  if (name.length == 0) name = 'User'; //don't want you to be nameless!
  setTimeout(function() {
    //now lets get that greeting!
    $.get( "/greet/" + name, function(greeting) {
      //no more loading for us!
      document.getElementById('loading').style.display = 'none';
      //and put it where it always wanted to be...
      document.getElementById('greetingOut').innerHTML = greeting;
    });
  }, 1000); //just in case it goes too quick, it'll at least take a second
}