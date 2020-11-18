# Berl-eat #

Beral-eat is a small web page that let you first specifiy some restaurant criterias and then returns a suggestion of a nice place to eat. <br>
Right now it does this by choosing from a PostgreSQL database that I built and is hosted on AWS. Of course it would be more complete if I queried the google api e.g.,but this idea developed from something like a personl "restaurant dictionary". At least you can be sure that the place is really nice since I tested it by mself. <br>
I started this project because I wanted to try out the Django framework and was interessted how hosting a database on AWS works. And writing some application code for this helps me understanding it more than watching another youtube tutorial. <br>
For css I used some bootstrap4 and thats all on frameworks. In a first draft this was implemented with vue.js but I realized that saving a couple of lines probably is not making up for importing another library, so I switched back to vanilla JS. <br>
Another thing that I wanted to get some hands on experience is writing an API and using fetch, two things I managed to plug in this projects. Apart from that you can find as many ES6 features as I could fit in this code.  <br>
It is hosted on Heroku, which was also a little adventure to get it running, under **https://berl-eat.herokuapp.com/**.
