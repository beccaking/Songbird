const app = angular.module('MyApp', []).config(function($sceProvider){
  $sceProvider.enabled(false)
});

app.controller('MainController', ['$http', function($http){
this.loggedInUser = false;

// Partials ===============
  this.includePath = 'html/partials/viewallsongs.html'

  this.changeInclude = (path) => {
    this.includePath = 'html/partials/' + path + '.html'
  }

// Signup / Login ============
    this.signup = () => {
        $http({
            method:'POST',
            url:'/songbirds',
            data:{
                username:this.signupUsername,
                password:this.signupPassword
            }
        }).then((response) => {
            this.loggedInUser = response.data;
            this.getCollections();
        }, (error) => {
            console.log(error);
        })
    }

    this.login = () => {
        $http({
            method:'POST',
            url:'/sessions',
            data:{
                username:this.loginUsername,
                password:this.loginPassword
            }
        }).then((response) => {
            if(response.data.username){
                this.loggedInUser = response.data;
                this.getCollections();
            } else {
                this.loginUsername = null;
                this.loginPassword = null;
            }

        }, (error) => {
            console.log(error);
        })
    }

    this.signupButton = false;
    this.loginButton = false;
    this.toggleSignup = () => {
        this.signupButton = !this.signupButton;
    }
    this.toggleLogin = () => {
        this.loginButton = !this.loginButton;
    }

    $http({
        method:'GET',
        url:'/sessions'
    }).then((response) => {
        if(response.data.username){
            this.loggedInUser = response.data;
        }
    }, (error) => {
        console.log(error);
    })

// Index Page ===============
  this.getSongs = function(){
    $http({
      method:'GET',
      url:'/songs'
    }).then(response => {
      this.songs = response.data
      console.log(this.songs)
    }, error => {
      console.log(error)
    })
  }
this.getSongs()

// Collections Page ============
this.getCollections = function(){
  $http({
    method:'GET',
    url:'/collections'
  }).then(response => {
    this.collections = response.data
    console.log('current user: ' +this.loggedInUser.username);
    console.log(this.collections);
  }, error => {
    console.log(error);
  })
}

//get only that user's collectionsSchemathis.getCollections = function(){
this.getUserCollections = function(){
  $http({
    method:'GET',
    url:'/collections/'+this.loggedInUser._id
  }).then(response => {
    this.collections = response.data
    console.log('current user: '+ this.loggedInUser.username);
    console.log(this.collections);
  }, error => {
    console.log(error);
  })
}

//new collection
this.newCollection = function(){
  $http({
    method:'POST',
    url:'/collections',
    data: {
      name:this.name,
      user:this.loggedInUser,
    }
  }).then(response => {
    console.log(response.data);
    this.getCollections();
  }, error =>{
    console.log(error);
  })
}

//delete collection
this.deleteCollection = function(collection){
  $http({
    method:"DELETE",
    url:'/collections/'+collection._id
  }).then(response => {
    console.log('deleted ',collection);
    this.getCollections();
  }, error => {
    console.log(error);
  })
}

//Add a song to the database
this.addSong = function(){
  $http({
    method:'POST',
    url:'/songs',
    data: {
      title: this.songTitle,
      artist: this.songArtist,
      url: this.songUrl
    }
  }).then(response => {
    console.log(response)
    this.getSongs()
    this.songTitle=''
    this.songArtist=''
    this.songUrl=''
  }, error => {
    console.log(error)
  })
}

//delete a song from the database (admin function)
this.delete = function(song){
  $http({
    method:'DELETE',
    url:'/songs/' + song._id
  }).then(response => {
    this.getSongs()
  }, error => {
    console.log(error)
  })
}

//edit a song in the database (admin function)
this.edit = function(song){
  $http({
    method:'PUT',
    url:'/songs/' + song._id,
    data: {
      title: this.editedTitle,
      artist: this.editedArtist,
      url: this.editedUrl
    }
  }).then(response => {
    this.getSongs()
    this.editedTitle=''
    this.editedArtist=''
    this.editedUrl=''
  }, error => {
    console.log(error)
  })
}

//toggle to show collections
this.show = false

this.toggleshow = function(){
  this.show = !this.show
}

//add song to collection
this.addToCollection = function(song, collection){
  $http({
    method:'PUT',
    url:'/collections/' + collection._id,
    data: [song._id, collection.songs]
  }).then(response => {
    collection.songs = response.data
    this.show = false
  }, error => {
    console.log(error)
  })
}

}]);
