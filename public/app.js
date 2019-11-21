const app = angular.module('MyApp', []).config(function($sceProvider){
  $sceProvider.enabled(false)
});

app.controller('MainController', ['$http', function($http){

  this.includePath = 'partials/viewallsongs.html'

  this.changeInclude = (path) => {
    this.includePath = 'html/partials/' + path + '.html'
  }

  this.getSongs = function(){
    $http({
      method:'GET',
      url:'/songs'
    }).then(response => {
      this.songs = response.data
    }, error => {
      console.log(error)
    })
  }

}]);
