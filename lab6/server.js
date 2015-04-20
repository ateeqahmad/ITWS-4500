//set server public root
var root = './public_html/';
var port = 3000;

//import my conversion library
var j2c = require('./json2csv.js');

//import express for server purposes
var express = require('express');
//import multer for file upload purposes
var multer  = require('multer');

//initialize express instance
var app = express()
app.set("view options", {layout: false});
app.use(express.static(root));

//set up multer uploading
app.use(multer({ dest: './public_html/uploads/', 
  rename: function (fieldname, filename) {
      return filename;
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done=true;
  }
}));

//Establish root request to server index
app.get('/',function(req,res){
  res.sendfile("index.html");
});

//Handle upload attempts 
app.post('/upload/',function(req,res){
  if(done==true){
    console.log(req);
    res.statusCode = 302;
    //send us the index with the name of the uploaded file and uploaded boolean=true
    res.setHeader('Location', 'http://' + req.headers['host'] + '/?u=1&n=' + encodeURIComponent(req.files.userJSON.name) + '&o=' + encodeURIComponent(req.body.outFile));
    res.end();
  }
});

//Handle conversion requests
app.get('/convert/:infile/:outfile', function(req, response) {
  //only start if not already going...
  console.log('convert triggered');
  if (j2c.convertStatus) {
    j2c.json2csv(root + 'uploads/', req.params.infile, req.params.outfile);
    response.send('Buzzing away...');
  } else {
    response.send('Already working, buzz me later');
  }
});

//for preventing operations while tweets.json remains unloaded
app.get('/convert/status/', function(req, response){
  response.send(j2c.convertStatus);
});

//for reporting on conversion events
app.get('/convert/report/', function(req, response) {
  response.send(j2c.report);
  j2c.report = '';
});

//Run express server on port PORT
app.listen(port,function(){
    console.log("Server starting on port " + port);
});