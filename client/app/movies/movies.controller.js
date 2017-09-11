'use strict';

(function() {

  class MoviesComponent {
    constructor($http, $scope, socket,$rootScope) {
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.$rootScope = $rootScope;

      this.MovieData = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }


    $onInit() {
      this.$http.get('/api/moviesendpoints').then(response => {
        this.MovieData = response.data;
        console.log(response.data);
        console.log('----------------------------------------------MY</br>');
        this.OneRecord=false;
          this.MovieYear="";
          this.LocalDB=true;

         this.$rootScope.IndexBar=true;
        this.socket.syncUpdates('moviesendpoint', this.MovieData);
      });
    }
    SearchMovie(){
      this.OneRecord=false;

      //  $scope.class="loader";
      this.class="fa fa-spinner loader";

        this.$http.get('https://moviesapi.com/m.php?t='+this.MovieName+'&y='+this.MovieYear+'&type=movie&r=json').
        then( (response,err) =>{




          var MovieID=response.data[0].id;
          this.$http.get('https://moviesapi.com/m.php?i='+MovieID+'&type=movie&r=json').then((response)=>{
            this.MovieDetails=response.data;

            this.class="";
            console.log(response.data);
            this.OneRecord=true;
          });

        });

      }


    addMovie() {
      this.$http.post('/api/moviesendpoints', {
        Poster: this.MovieDetails.cov,
        Title: this.MovieDetails.title,
        Genre: this.MovieDetails.gen,
        Actors: this.MovieDetails.cast,
        Duration: this.MovieDetails.dur,
        Directors: this.MovieDetails.director,
        Id:this.MovieDetails.id
      }).then(response=>{
        this.MovieData.push(response.data);
      });
      console.log('Movie Added');

      this.OneRecord=false;
      alert("Movie Added Successfully");


    }


    removeMovie(Movie) {
      var x = confirm('Are you sure you want to delete this record ?');
      if (x) {
        this.$http.delete('/api/moviesendpoints/' + Movie._id);
      }
      this.MovieData.splice(this.MovieData.indexOf(Movie),1);
      console.log('Movie removed');

    }


  }

  angular.module('yoManprojectfolderApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
