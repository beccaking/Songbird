const app = angular.module('MyApp', []);

app.controller('MainController', ['$http', function($http){

  this.includePath = 'partials/viewallsongs.html'

  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html'
  }

}]);
