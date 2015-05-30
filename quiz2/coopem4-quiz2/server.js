//import js things
var express = require('express');

//global app var for express actions / director access
var app = express();
var root = './public_html/'

//set html serving directory
app.set("view options", {layout: false});
app.use(express.static(root));

// //respond to that good ole greeting request
// app.get('/greet/:name', function(req, response){
//   var name = req.params.name;
//   //why just one greeting, that's boring...
//   var greetings = ['Ahoy ' + name + '!', 'All right, ' + name + '?', 'Hello there ' + name + '!', 'Hiya ' + name + '!', 'How\'s it hanging, ' + name + '?', 'Salutations ' + name + '!', 'You have been, and always will be, my friend ' + name + '!', 'KHAAAAAAAAAAAAAAN! Oh, wait it\'s just you, ' + name + ''];
//   var greeting = Math.floor(Math.random() * greetings.length)
//   //and off it goes...
//   response.send(greetings[greeting]);
// });
app.listen(3000)