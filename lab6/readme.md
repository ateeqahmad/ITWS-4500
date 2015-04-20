#Lab 6

##Usage
Upon installing node downloading the application (and permitting express through your firewall/opening port 3000 if necessary) you should have all the files you need to run my server and app set up so long as you have a constant internet connection.

Go to the top directory of the application and type 'node server.js' to start the server.

Then visit 'localhost:3000' to see the running conversion set up.

I also added a file upload system for uploading json files to be converted. All files used by the server are stored in the `public_html/uploads/` directory. When trying to access a JSON file it should exist in the uploads directory, else it will error.

To upload and convert a file use the top box, else use the bottom box. Error handling such as checking if the file exists before reading and warning about overwriting will occur in the notifications pane at the top of the page.

##Node Server
I set things up with Express server and Multer. Multer allows me to manage uploads/post requests while I route all other requests directly with express. I chose to add downloads as my creativity/exploration because I wanted to do something new on top of everthing else, and I hadn't handled post requests via express yet (and certainly hadn't handled file uploads).

##json2csv
My JSON conversion is very adaptable. It expects a JSON object that contains an array of similarly structured objects. To output CSVs in the format the professor asked for, I included a boolean onlyTweets at the top of the file. When ticked false my conversion will work on all files, else it will only work on files containing twitters official tweet api output.

My json2csv is also structured in such a way that it could be easily moved to a module were I to desire to do so, using standards for JS module interaction it fits snugly with my express server and allows me to segregate my code effectively.

It works by grabbing the keys, outputting them as a header, and then going through each object and outputting its values.