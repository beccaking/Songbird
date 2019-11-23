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
    * songs are video embeds, allowing the visitor to view the video which accompanies the track, if a video has been provided on youtube.
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

## Approach Taken

## Unsolved Problems
* Refreshing while on the "View User's Collections" page brings the user back to the "All Songs Page" (the landing page).
