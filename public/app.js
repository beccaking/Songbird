const app = angular.module('MyApp', []).config(function($sceProvider){
  $sceProvider.enabled(false)
});

app.controller('MainController', ['$http', function($http){
this.loggedInUser = false
console.log(this.loggedInUser + ' on load')
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
            //the user doesn't have any of their own collections if they just signed up, so diplay all collections
            this.getUserCollections();
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
                //load & display that user's collections only
                this.getUserCollections();
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
        this.loginButton = false;
    }

    this.toggleLogin = () => {
        this.loginButton = !this.loginButton;
        this.signupButton = false;
    }

    this.logout = () => {
        $http({
            method:'DELETE',
            url:'/sessions'
        }).then((response) => {
            this.loggedInUser = false;
            this.loginUsername = null;
            this.loginPassword = null;
            this.signupUsername = null;
            this.signupPassword = null;
            this.changeInclude('viewallsongs');
            this.getUserCollections();
        }, (error) => {
            console.log(error);
        })
    }

    $http({
        method:'GET',
        url:'/sessions'
    }).then((response) => {
        if(response.data.username){
            this.loggedInUser = response.data;
            console.log(this.loggedInUser)
            this.getUserCollections()
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
      // console.log(this.songs)
    }, error => {
      console.log(error)
    })
  }
this.getSongs()

// Collections Page ============
// this will pull all collections regardless of user.
this.getCollections = function(){
  $http({
    method:'GET',
    url:'/collections'
  }).then(response => {
    this.collections = response.data
    // console.log('current user: ' +this.loggedInUser._id);
  }, error => {
    console.log(error);
  })
}

// show the songs in a collection - DOESN'T WORK YET!
//when a user clicks the collection name
// we should first view the song IDs in that collection
// then we should look up the song info by song ID
let songsToShow = []
this.collectionSongs = []
let collectionToShow
this.showSongs = function(collection){
  this.collectionSongs = []
  collectionToShow = collection
  $http({
    method:'GET',
    url:'/collections/songs/'+ collection._id
  }).then(response => {
    songsToShow = response.data;
    console.log('response data: ', response.data);
    this.showSongs2(songsToShow);
  }, error => {
    console.log(error)
  })
}

//second part of the show songs in a collection request
this.showSongs2 = function(songsArray){
    console.log('this.showSongs2 is running');
  for(let i = 0; i < songsArray.length; i++){
    $http({
      method:'GET',
      url:'/songs/'+songsArray[i]
  }).then((response) => {
      this.collectionSongs.push(response.data);
  })
}
}

//get only that user's collections
this.getUserCollections = function(){
  console.log('starting to get user collections')
  console.log(this.loggedInUser._id)
  $http({
    method:'GET',
    url:'/collections/'+this.loggedInUser._id
  }).then((response) => {
    this.collections = response.data
    console.log(this.collections)
    console.log(response.data)
  }, (error) => {
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
      songs: []
    }
  }).then(response => {
    // console.log(response.data);
    this.getUserCollections();
    console.log(this.loggedInUser)
    this.name='';
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
    // console.log('deleted ',collection);
    this.collectionSongs = null
    this.getUserCollections();
  }, error => {
    console.log(error);
  })
}

// Songs ================

//Add a song to the database
this.addSong = function(){
  // //if the address does not start with http, add "https://www." to the beginning
  const patternmatch = (url) => {
    const regexp = /^http/
    if(url.match(regexp)){
      return (prefix = true)
    }
    return (prefix = false)
  }

  patternmatch(this.songUrl);

  if(!prefix){
    this.songUrl = 'https://www.' + this.songUrl
  }

  //if the string contains the word watch, replace watch?v= with embed/
  const patternmatch1 = (url) => {
    const regexp = /watch/
    if(url.match(regexp)){
      return (watch = true)
    }
    return (watch = false)
  }

  patternmatch1(this.songUrl);

  if(watch){
    this.songUrl = this.songUrl.replace('watch?v=','embed/')
  }

    $http({
      method:'POST',
      url:'/songs',
      data: {
        title: this.songTitle,
        artist: this.songArtist,
        url: this.songUrl
      }
    }).then(response => {
      // console.log(response)
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

//add to collections buttons not showing by default
this.indexToShow = null

//check to see if a collection already has a song
this.checkForDuplicates = function(song, collection){
  let unique = true
  for(i=0;i<collection.songs.length;i++){
    if(song._id === collection.songs[i]){
      unique = false
    }
  }
  return unique
}

//add a song to an existing collection
this.addToCollection = function(song, collection){
  if(this.checkForDuplicates(song, collection)){
      $http({
        method:'POST',
        url:'/collections/addsong/' + collection._id,
        data: [song._id, collection.songs]
      }).then(response => {
          alert(`${song.title} added to ${collection.name}`)
          collection.songs = response.data
          this.indexToShow = null
          this.getUserCollections();
        }, error => {
        console.log(error)
      })
    } else {
    alert(`${song.title} already in collection`)
  }
}

//remove a song from a collection
this.removeSongFromPlaylist = function(song){
  console.log('remove ' + song._id + ' from '+collectionToShow._id);
  $http({
    method:"POST",
    url:'/collections/removesong/'+collectionToShow._id+'/'+song._id
  }).then(response => {
    console.log('remove song response' + response.data);
    this.showSongs(collectionToShow);
    // this.getUserCollections()
  }, error => {
    console.log(error);
  })
}

//add a song to a new collection
this.addToNewCollection = function(song){
  $http({
    method:'POST',
    url: '/collections',
    data: {
      name: this.collectionName,
      user: this.loggedInUser,
      songs: [song._id]
    }
  }).then(response =>{
    console.log(response.data)
    alert(`${song.title} added to ${this.collectionName}`)
    this.indexToShow = null
    this.collectionName=''
    this.getUserCollections();
  }, error => {
    console.log(error)
  })
}

this.open = false

this.openModal = function(){
  this.open = true
}

this.closeModal = function(){
  this.open = false
}

}]);
