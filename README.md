# Song bird
A music sharing app where users can upload youtube videos to a shared database, create personal collections, and add videos to their collections.

## Live Version
[Song Bird - A Music Sharing App](https://songbirds.herokuapp.com/)

## Authors
Becca King - [GitHub](https://github.com/beccaking)

Jewls Krueger - [GitHub](https://github.com/jewlsrules)

Ayla Ex - [GitHub](https://github.com/aylaex)

## Technologies Used
* Node.js
* MongoDB
* Mongoose
* Express
* Express Session
* Bcrypt
* AngularJS
* Heroku (for live deployment)


## User Stories
* When logged out
    * visitors can access the Song Bird website and view all of the songs that have been uploaded.
    * songs are video embeds, allowing the visitor to view the video which accompanies the track.
    * viewers can signup for a user account and login with the username and password chosen at signup.
* When logged in
    * viewers become users
    * users have all the same permissions as visitors
    * users can add songs from youtube to the database.
    * users can create collections that are unique to their user account.
    * users can add songs to any of their collections.
    * users can view their collections and the songs within them.
    * users can remove songs from their collections.
    * users can logout.

* Admin accounts have all the same features as user accounts.
    * admins can edit or delete songs from the database.

## Wireframes
['All Songs' Page](https://wireframe.cc/Ka4dIS)
![Wireframe for 'All Songs' page](https://i.imgur.com/7E8ZboD.png)

['My Collections' Page](https://wireframe.cc/DpzAGK)
![Wireframe for 'My Collections' page](https://i.imgur.com/KoutfYE.png)

## Approach Taken
After brainstorming an idea for our app, we worked together to set up a GitHub repository and Heroku cluster for deployment. We then took to Trello to compile a complete list of user stories and the first set of tasks to complete to get the app up and running and the basic file structure in place.

From there we were able to work simultaneously in different files to complete the setup of our app. For example: while one person worked on the songs model and controller, one person worked on the collections model and controller, and one person worked on the users model and controller.

We then continued to add to our Trello list of tasks and divvy up the work based on who was already working with the files and features in question.

We communicated via Slack while working on our separate tasks to make sure we only had one person working in app.js at a time, and when we ran into issues and/or bugs, we added them to a dedicated 'Bug Tracker' on Trello and took turns debugging and troubleshooting until we resolved the issue.

## Unsolved Problems
* Refreshing while on the "View User's Collections" page brings the user back to the "All Songs Page" (the landing page).
