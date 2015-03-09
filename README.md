# ITWS-4500
A collection of coursework for my Web Science Systems Development course.

## Notes
Currently, what I did in Lab 4 is definitely my favorite,, as it feels (and for all intents and purposes is) very hackish.

All of my labs include all files necessary to run (which isn't necessarily common practice, but may help others in learning what things do) and are tested on localhost on an XAMP server in Windows 8.1 Embedded.

## Lab 1
Reads the provided 'tweets.json' file and generates a ticker for all read tweets and the tags held within.

##Lab 2
Using the OpenWeatherMapAPI and bootstrap, this simple tool grabs a users location from their browser and displays weather information with options to change the unit system.

##Lab 3
Set up a repository for our classwork and term project. (The repo is autopulled by a webhook I made every time a someone pushes a new update, live at wwww.tcktr.tk/tcktr/)

##Lab 4
Use jQuery Mobile and CSS media queries to make my page responsive (it already kind of was, but now it is more so!). Part of our assignment was also using the Twitter API, which has unfortunately changed since the assignment was written last year. 

Now OAuth is required, which led to most of the class using the 'tweets.json' file from Lab 1, as we technically don't know server side things yet. I went ahead and found that you can call and receive the HTML for a twitter widget in pure JS in browser, no server side processing required. I then populated that html to a dummy node and parsed out the data needed for the assignment. 

##Lab 5
Currently in progress.