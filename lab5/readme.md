#Lab 5

##Usage
Upon installing node downloading the application (and permitting express through your firewall/opening port 3000 if necessary) you should have all the files you need to run my server and app set up so long as you have a constant internet connection.

Go to the top directory of the application and type 'node server.js' to start the server.

Then visit 'localhost:3000' to see the running page. 

On start up the server will pull 20 tweets about code, however new data can be requested at any time by clicking the settings button in the top left corner and choosing the new query word, number of tweets, and even the output file!

When 'Pull Data' is clicked (or when the server is loading data in general) the loading page will displayed and progress output can be seen in the terminal the server is running in. 


##Node Server and API
I set up things with express and the twitter package. The twitter pacakge allows me to pull a stream and pop tweets off into a json file. 

Express allows me to server that file and receive requests for updating it. Using the get method, I've allowed for variable stream pulling and file creation. 

Sending the get request '/ticker/status' will return a boolean which is true when the output file is created and false when an output file is being produced.

Sending the get request '/ticker/reqtweets/[NUMBER OF TWEETS]/[TWEET QUERY]/[OUTPUT FILE]' will send a request to twitter for tweets with the filter [TWEET QUERY] and write [NUMBER OF TWEETS] to [OUTPUT FILE] in the directory set by 'root' (default './public_html/').

##Angular Implementation
I feel like angular was kind of thrown at us, and I was confused as to how it should be implemented for this. Angular is a very large beast and we were given little besides the documentation and a kick in the butt. Further, implementing it it was no easy thing as I was unsure where exactly angular should go and the lab assignment was vauge in what we should do with the framework besides use it.

So, I ended up using it for some snazy form validation in my side panel as that was the easiests way for me to integrate while still getting a feel for it but not upsetting the jquery mobile.