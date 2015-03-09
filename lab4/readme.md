#Lab 4

##Twitter API Integration
So, as you well know the twitter api decided to change in a way that gives twitter control and limits access for developers. This anti-competition change (done primarily to allow twitter to more heavily restrict (or at least have the ability to) third party twitter clients) really made me mad. More so, I didn't want to have to use a server. So I played around with twitter widgets and realized an older version of the widget api allowed for direct control.

Instead of using an iFrame like the easy to link widget, this version allows me direct access to the html they want me to put. I discovered it by tracing the requests the widget made when embedded and parsed the data out of it. Once that was done, things got pretty simple. 

The main limitations of the this approach include a 20 tweet limit. However, it's done entirely with javascript without the need for node or php, so I'm very proud.

Despite this there are issues like having 0-4 hash tags because none of the 20 had any, or having graphic and obscene tweets (I put a filter on I think but it is still weird).

##jQuery Mobile
I would like to state that jQuery mobile is a clunky, poorly organized library that gives us lots of things but doesn't provide half the resources other libraries like bootstrap. It provides nav bars, but it's swiping is inconsistent in implementation as is the documentation, which is scattered across versions and very frustrating.

Still, I used a jQuery mobile panel and sliders to give users the ability to control the speed of the ticker. The panel is an overlay that hovers over the side, and can be activated via the little gear button (I do like little floating buttons). 

##Responsive Design
Meda queries were used to provide two alternative set ups, in addition to the already percentage based elements that I had. Specific changes include element spacing (significantly decreases) and font size (decreases as well) as you go to smaller screens. 

The percentage based sizes make it even more flexible, and generally well fitting.

##Creativity and Summary and Things
The sliders were a fun little addition in the unecessary nav-panel, but the real fun was doing something twitter didn't want. To see this with the 'tweets.json' file, simply uncoment my original 'aquireTweets' function code (and comment out the new stuff).