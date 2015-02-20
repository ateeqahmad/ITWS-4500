#Lab 3
The goal of this lab was to create repositories for my individual and group work, along with setting up bug tracking.

The repositories were shared with both the professor and TA, and are located at:

individual: https://github.com/not-inept/ITWS-4500
group: https://github.com/SciFive/tcktr

We decided to use AWS's free tier (Nobah sacrificed her 12 months) (64bit Ubuntu Server 14.04 LTS) to take care of hosting, with a .tk domain name because they are free (though apparently quite notorious).

The domain is: tcktr.tk

Our remote server is equipped with a script that responds to a webhook attached to our git repository for our project. Whenever we push it'll pull! 

We'll be using github's issue tracker for bug tracking, as it is conveniently attached to our repositories. 